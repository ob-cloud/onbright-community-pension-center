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

        <a-form-item label="机构账号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入机构账号" v-decorator="[ 'departAccount', validatorRules.departAccount]" :readOnly="disableSubmit" />
        </a-form-item>

        <template v-if="!model.id">
          <a-form-item label="登陆密码" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input type="password" placeholder="请输入登陆密码" v-decorator="[ 'passwd', validatorRules.password]" />
          </a-form-item>

          <a-form-item label="确认密码" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input type="password" @blur="handleConfirmBlur" placeholder="请重新输入登陆密码" v-decorator="[ 'confirmpassword', validatorRules.confirmpassword]" />
          </a-form-item>
        </template>

        <a-form-item label="机构名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入机构名称" v-decorator="[ 'departName', validatorRules.departName]" :readOnly="disableSubmit" />
        </a-form-item>

        <a-form-item label="联系人" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入联系人" v-decorator="[ 'contact', validatorRules.contact]" :readOnly="disableSubmit" />
        </a-form-item>

        <a-form-item label="联系电话" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入联系电话" v-decorator="[ 'mobile', validatorRules.mobile]" :readOnly="disableSubmit" />
        </a-form-item>

        <a-form-item label="电子邮箱" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入电子邮箱" v-decorator="[ 'email', {}]" :readOnly="disableSubmit" />
        </a-form-item>

        <a-form-item label="公司地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入公司地址" v-decorator="[ 'address', {}]" :readOnly="disableSubmit" />
        </a-form-item>

        <a-form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea placeholder="请输入备注" auto-size v-decorator="[ 'memo']" :readOnly="disableSubmit" />
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
  import { ACCESS_TOKEN } from '@/store/mutation-types'
  import { addEnterprise, editEnterprise } from '@/api/service'
  // import { disabledAuthFilter } from "@/utils/authFilter"
  import md5 from 'md5'

  export default {
    name: 'UserModal',
    components: {
    },
    data () {
      return {
        modalWidth: 800,
        drawerWidth: 700,
        modaltoggleFlag: true,
        confirmDirty: false,
        entityId: '', //保存用户id
        disableSubmit: false,
        dateFormat: 'YYYY-MM-DD',
        validatorRules: {
          departAccount: { rules: [{ required: true, message: '请输入机构账号!' }] },
          departName: { rules: [{ required: true, message: '请输入机构名称!' }] },
          contact: { rules: [{ required: true, message: '请输入联系人名称!' }] },
          mobile: { rules: [{ required: true, message: '请输入联系电话!' }] },
          password: {
            rules: [{
              required: true,
              pattern:/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,./]).{8,}$/,
              message: '密码由8位数字、大小写字母和特殊符号组成!'
            }, {
              validator: this.validateToNextPassword,
            }],
          },
          confirmpassword: {
            rules: [{
              required: true, message: '请重新输入登陆密码!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          },
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
        this.edit({})
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
        const that = this
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true
            let formData = Object.assign(this.model, values)
            delete formData.confirmpassword
            if (!that.model.id) {
              formData.id = this.entityId
              formData.passwd = md5(formData.passwd)
              // formData.confirmpassword = md5(formData.confirmpassword)
            }
            let obj = !that.model.id ? addEnterprise(formData) : editEnterprise(formData)
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
      validateToNextPassword  (rule, value, callback) {
        const form = this.form
        const confirmpassword = form.getFieldValue('confirmpassword')

        if (value && confirmpassword && value !== confirmpassword) {
          callback('两次输入的密码不一样！')
        }
        if (value && this.confirmDirty) {
          form.validateFields(['confirm'], {
            force: true
          })
        }
        callback()
      },
      compareToFirstPassword (rule, value, callback) {
        const form = this.form
        if (value && value !== form.getFieldValue('passwd')) {
          callback('两次输入的密码不一样！')
        } else {
          callback()
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
