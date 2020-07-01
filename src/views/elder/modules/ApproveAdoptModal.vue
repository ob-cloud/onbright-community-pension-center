<template>
  <a-modal
    title="审批通过"
    :width="600"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    cancelText="关闭"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="备注信息" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea placeholder="请输入备注信息" :rows="6" v-decorator="[ 'adopt', {}]" />
        </a-form-item>
        <a-form-item label="通知人员" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select mode="multiple" v-decorator="[ 'gender', {}]" placeholder="请选择通知人员">
            <a-select-option value="1">李多海</a-select-option>
            <a-select-option value="2">姜雨杉</a-select-option>
          </a-select>
          <span>注：审批完成后，将自动通知到所选人员</span>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  export default {
    name: 'ApproveRejectModal',
    data () {
      return {
        visible: false,
        confirmLoading: false,
        confirmDirty: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        form: this.$form.createForm(this)
      }
    },
    created () {
      console.log("created")
    },

    methods: {
      show () {
        this.form.resetFields()
        this.visible = true
      },
      close () {
        this.$emit('close')
        this.visible = false
        this.disableSubmit = false
        this.selectedRole = []
      },
      handleSubmit () {
        // 触发表单验证
        // this.form.validateFields((err, values) => {
        //   if (!err) {
        //     this.confirmLoading = true
        //     // let formData = Object.assign(this.model, values)
        //     // changePassword(formData).then((res)=>{
        //     //   if(this.$isAjaxSuccess(res.code)){
        //     //     this.$message.success(res.message)
        //     //     this.$emit('ok')
        //     //   }else{
        //     //     this.$message.warning(res.message)
        //     //   }
        //     // }).finally(() => {
        //     //   this.confirmLoading = false
        //     //   this.close()
        //     // });
        //   }
        // })
      },
      handleCancel () {
        this.close()
      },
      handleConfirmBlur (e) {
        const value = e.target.value
        this.confirmDirty = this.confirmDirty || !!value
      }
    }
  }
</script>
