<template>
  <a-form :form="form" class="content">
    <a-card class="card">
      <a-row :gutter="24">
        <a-col :md="12" :sm="12">
          <div class="status">
            <span>入驻编号：{{ entityId }}</span>
            <a-badge :status="badgeStyle.status" :text="badgeStyle.text" />
          </div>
        </a-col>
        <a-col :md="12" :sm="12">
          <div class="action">
            <a-button v-if="status === 0" type="primary" icon="check" @click="handleApproveAdopt">审批通过</a-button>
            <a-button v-if="status === 0" type="default" icon="close" @click="handleApproveVeto">审批否决</a-button>
            <a-button v-if="status === 1" type="default" icon="back" @click="handleApproveReject">驳回审批</a-button>
          </div>
        </a-col>
      </a-row>
    </a-card>

    <a-card title="基本信息" class="card">
      <a slot="extra" href="#"></a>
      <div class="grid-cell double">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="服务标题" class="ant-col-sm-12">
          <a-input v-decorator="[ 'serviceName' ]" :readOnly="disableSubmit" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="服务费用" class="ant-col-sm-12">
          <a-input v-decorator="['age']" :readOnly="disableSubmit" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="申请时间" class="ant-col-sm-12">
          <a-input v-decorator="['age']" :readOnly="disableSubmit" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="申请机构" class="ant-col-sm-12">
          <a-input v-decorator="['age']" :readOnly="disableSubmit" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="服务详情" class="ant-col-sm-12">
          <a-input v-decorator="['age']" :readOnly="disableSubmit" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="服务备注" class="ant-col-sm-12">
          <a-input v-decorator="['age']" :readOnly="disableSubmit" />
        </a-form-item>
      </div>
    </a-card>

    <a-card title="审批信息" class="card">
      <a slot="extra" href="#"></a>
      <div class="grid-cell">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="审批人" class="ant-col-sm-12">
          <a-input v-decorator="['age']" :readOnly="disableSubmit" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="审批状态" class="ant-col-sm-12">
          <a-input v-decorator="['age']" :readOnly="disableSubmit" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="审批时间" class="ant-col-sm-12">
          <a-input v-decorator="['age']" :readOnly="disableSubmit" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="审批备注" class="ant-col-sm-12">
          <a-input v-decorator="['age']" :readOnly="disableSubmit" />
        </a-form-item>
      </div>
    </a-card>

    <approve-adopt-modal ref="approveAdoptModal"></approve-adopt-modal>
    <approve-reject-modal ref="approveRejectModal"></approve-reject-modal>
    <approve-veto-modal ref="approveVetoModal"></approve-veto-modal>

  </a-form>
</template>

<script>
import ApproveAdoptModal from './ApproveAdoptModal'
import ApproveRejectModal from './ApproveRejectModal'
import ApproveVetoModal from './ApproveVetoModal'
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
     validatorRules: {
        username: {
          rules: [{ required: true, message: '请输入账号名称!' }],
        },
        password: {
          rules: [
            { required: true, message: '请输入账号密码!' },
            { validator: this.validateToNextPassword }
          ],
        },
        confirmpassword: {
          rules: [
            { required: true, message: '请确认账号密码!' },
            { validator: this.compareToFirstPassword }
          ],
        }
      },
    }
  },
  components: { ApproveAdoptModal, ApproveRejectModal, ApproveVetoModal },
  computed: {
    badgeStyle() {
      const Text = {1: '审批通过', 2: '审批否决', 3: '驳回审批', 0: '等待审批'}
      const Status = {1: 'success', 2: 'error', 3: 'warning', 0: 'processing'}
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
      this.$refs.approveAdoptModal.show()
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
