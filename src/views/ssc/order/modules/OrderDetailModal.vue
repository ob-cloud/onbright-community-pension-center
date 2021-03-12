<template>
  <a-form :form="form" class="content">
    <a-card class="card">
      <a-row :gutter="24">
        <a-col :md="12" :sm="12">
          <div class="status">
            <span>工单号：{{ entityId }}</span>
            <a-badge :status="badgeStyle.status" :text="badgeStyle.text" />
          </div>
        </a-col>
      </a-row>
    </a-card>

    <a-card title="工单信息" class="card">
      <a slot="extra" href="#"></a>
      <div class="grid-cell double">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="工单标题" class="ant-col-sm-12">
          <a-input v-decorator="[ 'serviceName']" :readOnly="disableSubmit" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="工单类型" class="ant-col-sm-12">
          <a-input v-decorator="['type']" :readOnly="disableSubmit" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="发起时间" class="ant-col-sm-12">
          <a-input v-decorator="['applyTime']" :readOnly="disableSubmit" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="发起人" class="ant-col-sm-12">
          <a-input v-decorator="['user']" :readOnly="disableSubmit" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="预约时间" class="ant-col-sm-12">
          <a-input v-decorator="['appointment']" :readOnly="disableSubmit" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="联系电话" class="ant-col-sm-12">
          <a-input v-decorator="[ 'contact', {}]" :readOnly="disableSubmit" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="紧急程度" class="ant-col-sm-12">
          <a-input v-decorator="[ 'urgent', {}]" :readOnly="disableSubmit" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="联系地址" class="ant-col-sm-12">
          <a-input v-decorator="[ 'nation', {}]" :readOnly="disableSubmit" />
        </a-form-item>
      </div>
    </a-card>
    <a-card title="工单详情" class="card">
      <a slot="extra" href="#"></a>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" class="ant-col-sm-12">
        <a-textarea :rows="6" v-decorator="[ 'veto', {}]" :readOnly="disableSubmit" />
      </a-form-item>
    </a-card>

    <a-card title="工单附件" class="card">

    </a-card>

    <a-card title="工单动态" class="card">
      <a slot="extra" href="#"></a>
      <a-steps progress-dot direction="vertical">
        <a-step>
          <div slot="title">
            <a-icon type="user" />
            <span>李多海</span>
          </div>
          <div slot="description">This is a description</div>
        </a-step>
        <a-step>
          <div slot="title">
            <a-icon type="user" />
            <span>李多海</span>
          </div>
          <div slot="description">This is a description</div>
        </a-step>
        <a-step>
          <div slot="title">
            <a-icon type="user" />
            <span>李多海</span>
          </div>
          <div slot="description">This is a description</div>
        </a-step>
      </a-steps>
    </a-card>
  </a-form>
</template>

<script>
export default {
  data() {
    return {
      model: {
      },
      status: '',
      uploadLoading: false,
      avatarImage: '',
      disableSubmit: false,
      entityId: '',
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 19 },
      },
     form: this.$form.createForm(this),
    }
  },
  computed: {
    badgeStyle() {
      const Text = {0: '待受理', 1: '已完成', 2: '进行中', 3: '已撤销'}
      const Status = {0: 'default', 1: 'success', 2: 'processing', 3: 'warning'}
      return {
        status: Status[this.status],
        text: Text[this.status]
      }
    }
  },
  created() {
    this.$events.$on('ok', () => {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      })
    })
  },
  mounted () {
    const { id, status } = this.$route.query
    this.status = status
    this.disableSubmit = true
    this.entityId = id
    this.getCustomerDetail().then(record => {
      this.edit(record)
    })
  },
  methods: {
    getCustomerDetail () {
      return Promise.resolve({})
    },
    refresh () {
      this.entityId = ''
    },
    add () {
      this.refresh()
      this.edit({})
    },
    edit (record) {
      // this.initialRoleList()
      this.form.resetFields()
      if (record.hasOwnProperty('customerId')) {
        // this.loadUserRoles(record.id)
      }
      this.model = Object.assign({}, record)
      this.$nextTick(() => {
        this.form.setFieldsValue(this.model)
      })
    },
    handleConfirmBlur () {

    },
    validateToNextPassword (rule, value, callback) {
      if (value && this.confirmDirty) {
        this.form.validateFields(['confirm'], {
          force: true
        })
      }
      callback()
    },
    compareToFirstPassword (rule, value, callback) {
      if (value && value !== this.form.getFieldValue('password')) {
        callback('两次输入的密码不一样！')
      } else {
        callback()
      }
    },
    getBase64(img, callback) {
      const reader = new FileReader()
      reader.addEventListener('load', () => callback(reader.result))
      reader.readAsDataURL(img)
    },
    beforeUpload(file) {
      var fileType = file.type
      if (fileType.indexOf('image') < 0) {
        this.$message.warning('请上传图片')
        return false
      }
      return false
    },
    handleChange ({file}) {
      this.uploadLoading = true
      console.log(file)
      this.getBase64(file, imageUrl => {
        this.uploadLoading = false
        this.avatarImage = imageUrl
        this.loading = false
      })
    },
    handleApproveReject () {
      this.$refs.approveRejectModal.show()
    },
    handleApproveVeto () {
      this.$refs.approveVetoModal.show()
    },
    handleApproveAdopt () {

    }
  },
}
</script>

<style lang="less" scoped>
.content {
  .card {
    margin-top: 10px;

    .cell{
      border: 1px solid #ccc;
      background-color: #eee;
      color: #000;
      padding: 10px;
      text-align: right;
    }
    .cell.value{
      background-color: #fff;
      color: #666;
      text-align: left;
      margin-left: -1px;
    }
  }
}

</style>

<style lang="less">
  .grid-cell {
    .ant-form-item-label{
      background-color: #eee;
      border: 1px solid #eee;
      padding: 6px 5px 5px 5px;
    }
    .ant-form-item-control-wrapper{
      padding: 5px 10px 5px 5px;
      border: 1px solid #eee;
    }
  }
</style>
