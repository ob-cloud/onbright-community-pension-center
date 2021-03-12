<template>
  <a-modal
    title="欠费详情"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    cancelText="关闭"
    :footer="null"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="记录单号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'id', {}]" :readOnly="true" />
        </a-form-item>
        <a-form-item label="老人姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'name', {}]" :readOnly="true" />
        </a-form-item>
        <a-form-item label="消费内容" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'serviceName', {}]" :readOnly="true" />
        </a-form-item>
        <a-form-item label="消费金额" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'servicePrice', {}]" :readOnly="true" />
        </a-form-item>
        <a-form-item label="余额" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'remainder', {}]" :readOnly="true" />
        </a-form-item>
        <a-form-item label="消费时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'createTime', {}]" :readOnly="true" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  export default {
    name: 'FinanceArrearsModal',
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
        this.close()
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
