<template>
  <a-drawer
    :title="title"
    :maskClosable="true"
    :width="drawerWidth"
    placement="right"
    :closable="true"
    @close="handleCancel"
    :visible="visible"
    style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;"
  >

    <template slot="title">
      <div style="width: 100%;">
        <span>{{ title }}</span>
        <span style="display:inline-block;width:calc(100% - 51px);padding-right:10px;text-align: right">
          <a-button @click="toggleScreen" icon="appstore" style="height:20px;width:20px;border:0px"></a-button>
        </span>
      </div>

    </template>

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item label="设备名" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入设备名" v-decorator="[ 'deviceName', {}]" :readOnly="disableSubmit" />
        </a-form-item>

        <a-form-item label="设备类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select v-decorator="[ 'deviceType', {}]" placeholder="请选择设备类型">
            <a-select-option value="">请选择</a-select-option>
            <a-select-option value="1">传感器</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="单价" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入单价" v-decorator="[ 'devicePrice', {}]" :readOnly="disableSubmit" />
        </a-form-item>

        <a-form-item label="供应商" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入供应商" v-decorator="[ 'deviceSupplier', {}]" :readOnly="disableSubmit" />
        </a-form-item>

        <a-form-item label="录入时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-date-picker
            style="width: 100%"
            placeholder="请选择录入时间"
            v-decorator="['createTime', { initialValue: !model.createTime ? null : moment(model.createTime, dateFormat) }]"
            :readOnly="disableSubmit"
          />
        </a-form-item>

        <a-form-item label="设备图片" :labelCol="labelCol" :wrapperCol="wrapperCol">

        </a-form-item>

        <a-form-item label="内容摘要" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea placeholder="请输入内容摘要" :rows="6" v-decorator="[ 'abstract', {}]" :readOnly="disableSubmit" />
        </a-form-item>

        <a-form-item label="内容详情" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <editor v-decorator="[ 'content', {} ]" triggerChange :readOnly="disableSubmit"></editor>
        </a-form-item>

      </a-form>
    </a-spin>

    <div class="drawer-bootom-button" v-show="!disableSubmit">
      <a-popconfirm title="确定放弃编辑？" @confirm="handleCancel" okText="确定" cancelText="取消">
        <a-button style="margin-right: .8rem">取消</a-button>
      </a-popconfirm>
      <a-button @click="handleSubmit" type="primary" :loading="confirmLoading">提交</a-button>
    </div>
  </a-drawer>
</template>

<script>
  // import pick from 'lodash.pick'
  import Vue from 'vue'
  import moment from 'moment'
  import { ACCESS_TOKEN } from '@/store/mutation-types'
  import Editor from '@/components/Pro/Editor'
  // import { addEnterprise, editEnterprise } from '@/api/service'

  export default {
    name: 'ServiceContentModal',
    components: {
      Editor
    },
    data () {
      return {
        modalWidth: 800,
        drawerWidth: 800,
        modaltoggleFlag: true,
        confirmDirty: false,
        entityId: '', //保存用户id
        disableSubmit: false,
        dateFormat: 'YYYY-MM-DD',
        validatorRules: {
          serviceName: { rules: [{ required: true, message: '请输入机构账号!' }] },
          servicePrice: { rules: [{ required: true, message: '请输入机构名称!' }] },
          serviceType: { rules: [{ required: true, message: '请输入联系人名称!' }] },
          serviceUnit: { rules: [{ required: true, message: '请输入联系电话!' }] },
        },
        title: '操作',
        visible: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        confirmLoading: false,
        headers: {},
        form: this.$form.createForm(this),
      }
    },
    created () {
      const token = Vue.ls.get(ACCESS_TOKEN)
      this.headers = {
        'X-Access-Token': token
      }
    },
    methods: {
      moment,
      isDisabledAuth (code) {
        console.log(code)
        // return disabledAuthFilter(code)
      },
      //窗口最大化切换
      toggleScreen () {
        this.modalWidth = this.modaltoggleFlag ? window.innerWidth : 800
        this.modaltoggleFlag = !this.modaltoggleFlag;
      },
      refresh () {
          this.entityId = ''
      },
      add () {
        this.refresh()
        this.edit({activitiSync: false})
      },
      edit (record) {
        this.resetScreenSize() // 调用此方法,根据屏幕宽度自适应调整抽屉的宽度
        this.form.resetFields()
        this.entityId = record.id
        this.visible = true
        this.model = Object.assign({}, record)
        this.$nextTick(() => {
          this.form.setFieldsValue(this.model)
        })
      },
      close () {
        this.$emit('close')
        this.visible = false
        this.disableSubmit = false
      },
      handleSubmit () {
        // const that = this
        // // 触发表单验证
        // this.form.validateFields((err, values) => {
        //   if (!err) {
        //     that.confirmLoading = true
        //     let formData = Object.assign(this.model, values)
        //     if (!this.model.id) {
        //       formData.id = this.entityId
        //     }
        //     let obj = !this.model.id ? addEnterprise(formData) : editEnterprise(formData)
        //     obj.then((res) => {
        //       if (this.$isAjaxSuccess(res.code)) {
        //         that.$message.success(res.message)
        //         that.$emit('ok')
        //       } else {
        //         that.$message.warning(res.message)
        //       }
        //     }).finally(() => {
        //       that.confirmLoading = false
        //       that.close()
        //     })
        //   }
        // })
      },
      handleCancel () {
        this.close()
      },

      handleConfirmBlur (e) {
        const value = e.target.value
        this.confirmDirty = this.confirmDirty || !!value
      },
      // 根据屏幕变化,设置抽屉尺寸
      resetScreenSize() {
        let screenWidth = document.body.clientWidth
        this.drawerWidth = screenWidth < 500 ? screenWidth : 700
      },
    }
  }
</script>

<style scoped>

  .drawer-bootom-button {
    position: absolute;
    bottom: -8px;
    width: 100%;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    left: 0;
    background: #fff;
    border-radius: 0 0 2px 2px;
  }
</style>
