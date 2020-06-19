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

        <a-form-item label="套餐名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入套餐名称" v-decorator="[ 'packageName', validatorRules.packageName]" :readOnly="!!model.id" />
        </a-form-item>

        <a-form-item label="套餐价格" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入登陆密码" v-decorator="[ 'packagePrice', validatorRules.packagePrice]" />
        </a-form-item>

        <a-form-item label="套餐状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select v-decorator="[ 'status', {}]" placeholder="请选择套餐状态">
            <a-select-option :value="1">启用</a-select-option>
            <a-select-option :value="2">禁用</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入备注" v-decorator="[ 'description', validatorRules.description]" />
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
  import pick from 'lodash.pick'
  import Vue from 'vue'
  import { ACCESS_TOKEN } from '@/store/mutation-types'
  import { addPackage, editPackage } from '@/api/service'
  // import { disabledAuthFilter } from "@/utils/authFilter"

  export default {
    name: 'UserModal',
    components: {
    },
    data () {
      return {
        roleDisabled: false, //是否是角色维护调用该页面
        modalWidth: 800,
        drawerWidth: 700,
        modaltoggleFlag: true,
        confirmDirty: false,
        packageId: '', //保存用户id
        disableSubmit: false,
        dateFormat: 'YYYY-MM-DD',
        validatorRules: {
          packageName: { rules: [{ required: true, message: '请输入套餐名称!' }] },
          status: {rules: [{ required: true, message: '请选择套餐状态!' }]},
          packagePrice: {rules: [{required: true, message: '请填写价格!' }]},
        },
        title: '操作',
        visible: false,
        model: {},
        roleList: [],
        selectedRole: [],
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
        url: {
          userId: '/sys/user/generateUserId', // 引入生成添加用户情况下的url
        },
      }
    },
    created () {
      const token = Vue.ls.get(ACCESS_TOKEN)
      this.headers = {
        'X-Access-Token': token
      }
    },
    methods: {
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
          this.packageId = ''
      },
      add () {
        this.refresh()
        this.edit({activitiSync: false})
      },
      edit (record) {
        this.resetScreenSize() // 调用此方法,根据屏幕宽度自适应调整抽屉的宽度
        this.form.resetFields()
        this.packageId = record.id
        this.visible = true
        this.model = Object.assign({}, record)
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'packageName', 'status', 'packagePrice', 'description'))
        })
      },
      close () {
        this.$emit('close')
        this.visible = false
        this.disableSubmit = false
        this.selectedRole = []
      },
      handleSubmit () {
        const that = this
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true
            let formData = Object.assign(this.model, values)
            if (!this.model.id) {
              formData.id = this.packageId
            }
            let obj = !this.model.id ? addPackage(formData) : editPackage(formData)
            obj.then((res) => {
              if (this.$isAjaxSuccess(res.code)) {
                that.$message.success(res.message)
                that.$emit('ok')
              } else {
                that.$message.warning(res.message)
              }
            }).finally(() => {
              that.confirmLoading = false
              that.close()
            })
          }
        })
      },
      handleCancel () {
        this.close()
      },

      handleConfirmBlur (e) {
        const value = e.target.value
        this.confirmDirty = this.confirmDirty || !!value
      },

      normFile (e) {
        if (Array.isArray(e)) {
          return e
        }
        return e && e.fileList
      },
      beforeUpload(file) {
        var fileType = file.type
        if (fileType.indexOf('image') < 0) {
          this.$message.warning('请上传图片')
          return false
        }
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

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }

  .ant-table-tbody .ant-table-row td{
    padding-top:10px;
    padding-bottom:10px;
  }

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
