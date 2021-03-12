<template>
  <a-modal
    title="上门申请"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    cancelText="关闭"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="服务单号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'id', {}]" :readOnly="true" />
        </a-form-item>
        <a-form-item label="临时密码时效" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'hour', {}]" :min="1" :max="6" /> 单位(h)
        </a-form-item>
        <a-form-item label="通知对象" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select v-decorator="[ 'notify', {}]" placeholder="请选择提醒对象">
            <a-select-option value="1">李多海</a-select-option>
            <a-select-option value="2">姜雨杉</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="提醒方式" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-checkbox-group :options="['系统消息', '邮件通知', '短信通知']" :default-value="['系统消息']" />
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  export default {
    name: 'ServiceOrderVisitModal',
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
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(this.model)
        });
      },
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
