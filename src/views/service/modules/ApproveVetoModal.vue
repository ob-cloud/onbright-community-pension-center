<template>
  <a-modal
    title="审批否决"
    :width="600"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    cancelText="关闭"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <span>否决入驻申请，需要填写否决原因</span>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea placeholder="请输入否决原因" :rows="6" v-decorator="[ 'veto', {}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  export default {
    name: 'ApproveVetoModal',
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
