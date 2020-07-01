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
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="老人信息">
        <a-card class="card">
          <a-row :gutter="24">
            <a-col :md="4" :sm="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-upload
                  listType="picture-card"
                  class="avatar-uploader"
                  :showUploadList="false"
                  :beforeUpload="beforeUpload"
                  @change="handleChange"
                >
                  <img v-if="avatarImage" :src="avatarImage" alt="头像" style="height:104px;max-width:300px" />
                  <div v-else>
                    <a-icon :type="uploadLoading ? 'loading' : 'plus'" />
                    <div class="ant-upload-text">上传</div>
                  </div>
                </a-upload>
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input placeholder="请输入账号名称" v-decorator="[ 'username', validatorRules.username]" :readOnly="disableSubmit" />
              </a-form-item>

              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input placeholder="请输入入驻渠道" v-decorator="[ 'username', {}]" :readOnly="disableSubmit" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
        <a-card title="基本信息" class="card">
          <a slot="extra" href="#"></a>
          <div class="grid-cell double">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="姓名" class="ant-col-sm-12">
              <a-input placeholder="请输入姓名" v-decorator="[ 'name', validatorRules.name]" :readOnly="disableSubmit" />
            </a-form-item>
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="年龄" class="ant-col-sm-12">
              <a-input placeholder="请输入年龄" v-decorator="['age']" :readOnly="disableSubmit" />
            </a-form-item>
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="性别" class="ant-col-sm-12">
              <a-select v-decorator="[ 'gender', {}]" placeholder="请选择性别">
                <a-select-option value="">请选择</a-select-option>
                <a-select-option value="1">男</a-select-option>
                <a-select-option value="2">女</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="婚姻状况" class="ant-col-sm-12">
              <a-select v-decorator="[ 'married', {}]" placeholder="请选择婚姻状况">
                <a-select-option value="">请选择</a-select-option>
                <a-select-option value="1">已婚</a-select-option>
                <a-select-option value="2">未婚</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="民族" class="ant-col-sm-12">
              <a-input placeholder="请输入民族" v-decorator="[ 'nation', {}]" :readOnly="disableSubmit" />
            </a-form-item>
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="老人类型" class="ant-col-sm-12">
              <a-select v-decorator="[ 'styles', {}]" placeholder="请选择老人类型">
                <a-select-option value="">请选择</a-select-option>
                <a-select-option value="1">健康</a-select-option>
                <a-select-option value="2">残疾</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="血型" class="ant-col-sm-12">
              <a-select v-decorator="[ 'blood', {}]" placeholder="请选择血型">
                <a-select-option value="">请选择</a-select-option>
                <a-select-option value="1">A型</a-select-option>
                <a-select-option value="2">B型</a-select-option>
                <a-select-option value="3">AB型</a-select-option>
                <a-select-option value="4">O型</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="身高" class="ant-col-sm-12">
              <a-input placeholder="请输入身高" v-decorator="[ 'height', {}]" :readOnly="disableSubmit" />
            </a-form-item>

            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="体重" class="ant-col-sm-12">
              <a-input placeholder="请输入体重" v-decorator="[ 'weight', {}]" :readOnly="disableSubmit" />
            </a-form-item>

            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="籍贯" class="ant-col-sm-12">
              <a-input placeholder="请输入籍贯" v-decorator="[ 'native', {}]" :readOnly="disableSubmit" />
            </a-form-item>

            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="文化程度" class="ant-col-sm-12">
              <a-select v-decorator="[ 'blood', {}]" placeholder="请选择文化程度">
                <a-select-option value="">请选择</a-select-option>
                <a-select-option value="1">高中</a-select-option>
                <a-select-option value="2">大专</a-select-option>
                <a-select-option value="3">本科</a-select-option>
                <a-select-option value="4">硕士</a-select-option>
                <a-select-option value="5">其他</a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="政治面貌" class="ant-col-sm-12">
              <a-select v-decorator="[ 'blood', {}]" placeholder="请选择政治面貌">
                <a-select-option value="">请选择</a-select-option>
                <a-select-option value="1">群众</a-select-option>
                <a-select-option value="2">党员</a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="身份证" class="ant-col-sm-12">
              <a-input placeholder="请输入身份证" v-decorator="[ 'idcard', {}]" :readOnly="disableSubmit" />
            </a-form-item>

            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="家庭住址" class="ant-col-sm-12">
              <a-input placeholder="请输入家庭住址" v-decorator="[ 'address', {}]" :readOnly="disableSubmit" />
            </a-form-item>

            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="原职业" class="ant-col-sm-12">
              <a-input placeholder="请输入原职业" v-decorator="[ 'occupation', {}]" :readOnly="disableSubmit" />
            </a-form-item>

            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="收入来源" class="ant-col-sm-12">
              <a-input placeholder="请输入收入来源" v-decorator="[ 'income', {}]" :readOnly="disableSubmit" />
            </a-form-item>

            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="联系电话" class="ant-col-sm-12">
              <a-input placeholder="请输入联系电话" v-decorator="[ 'phone', {}]" :readOnly="disableSubmit" />
            </a-form-item>

            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="子女状态" class="ant-col-sm-12">
              <a-select v-decorator="[ 'children', {}]" placeholder="请选择子女状态">
                <a-select-option value="">请选择</a-select-option>
                <a-select-option value="1">有</a-select-option>
                <a-select-option value="2">无</a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="身份证扫描件" class="ant-col-sm-24">
              <a-upload listType="picture-card" class="avatar-uploader" :showUploadList="false" :beforeUpload="beforeUpload" @change="handleChange">
                <img v-if="avatarImage" :src="avatarImage" alt="头像" style="height:104px;max-width:300px" />
                <div v-else>
                  <a-icon :type="uploadLoading ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">上传身份证正面照</div>
                </div>
              </a-upload>
              <a-upload listType="picture-card" class="avatar-uploader" :showUploadList="false" :beforeUpload="beforeUpload" @change="handleChange">
                <img v-if="avatarImage" :src="avatarImage" alt="头像" style="height:104px;max-width:300px" />
                <div v-else>
                  <a-icon :type="uploadLoading ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">上传身份证反面照</div>
                </div>
              </a-upload>
            </a-form-item>
          </div>
        </a-card>
        <a-card title="入驻信息" class="card">
          <a slot="extra" href="#"></a>
          <div class="grid-cell">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="医疗类型" class="ant-col-sm-12">
              <a-input placeholder="请输入医疗类型" v-decorator="['medical ', {}]" :readOnly="disableSubmit" />
            </a-form-item>
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="住房状况" class="ant-col-sm-12">
              <a-input placeholder="请输入住房状况" v-decorator="['home', {}]" :readOnly="disableSubmit" />
            </a-form-item>
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="养老状态" class="ant-col-sm-12">
              <a-input placeholder="请输入养老状态" v-decorator="['nursing', {}]" :readOnly="disableSubmit" />
            </a-form-item>
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="入驻日期" class="ant-col-sm-12">
              <a-date-picker
                style="width: 100%"
                placeholder="请选择入驻日期"
                v-decorator="['settleTime', {initialValue:!model.birthday ? null : moment(model.birthday, dateFormat)}]"
              />
            </a-form-item>
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="居住类别" class="ant-col-sm-12">
              <a-input placeholder="请填写居住类型" v-decorator="['live', {}]" :readOnly="disableSubmit" />
            </a-form-item>
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="入驻状态" class="ant-col-sm-12">
              <a-select v-decorator="[ 'settleStatus', {}]" placeholder="请选择入驻状态">
                <a-select-option value="">请选择</a-select-option>
                <a-select-option value="1">有</a-select-option>
                <a-select-option value="2">无</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="医保卡编号" class="ant-col-sm-24">
              <a-input placeholder="请输入医保卡编号" v-decorator="['medicalCard', {}]" :readOnly="disableSubmit" />
            </a-form-item>
          </div>
        </a-card>
        <a-card title="联系人信息" class="card">
          <a slot="extra" href="#"></a>
          <div class="grid-cell">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="姓名" class="ant-col-sm-12">
              <a-input placeholder="请输入联系人姓名" v-decorator="['contact', {}]" :readOnly="disableSubmit" />
            </a-form-item>
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="身份证" class="ant-col-sm-12">
              <a-input placeholder="请输入联系人身份证" v-decorator="['concatIDCard', {}]" :readOnly="disableSubmit" />
            </a-form-item>
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="性别" class="ant-col-sm-12">
              <a-select v-decorator="[ 'contactGender', {}]" placeholder="请选择联系人性别">
                <a-select-option value="">请选择</a-select-option>
                <a-select-option value="1">男</a-select-option>
                <a-select-option value="2">女</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="与老人关系" class="ant-col-sm-12">
              <a-input placeholder="请输入与老人关系（如父子）" v-decorator="['relation', {}]" :readOnly="disableSubmit" />
            </a-form-item>
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="民族" class="ant-col-sm-12">
              <a-input placeholder="请输入民族" v-decorator="['contactNation', {}]" :readOnly="disableSubmit" />
            </a-form-item>
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="手机号码" class="ant-col-sm-12">
              <a-input placeholder="请输入联系人手机号码" v-decorator="['contactPhone', {}]" :readOnly="disableSubmit" />
            </a-form-item>
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="居住地址" class="ant-col-sm-24">
              <a-input placeholder="请输入联系人居住地址" v-decorator="['contactAddress', {}]" :readOnly="disableSubmit" />
            </a-form-item>
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="身份证扫描件" class="ant-col-sm-24">
              <a-upload listType="picture-card" class="avatar-uploader" :showUploadList="false" :beforeUpload="beforeUpload" @change="handleChange">
                <img v-if="avatarImage" :src="avatarImage" alt="头像" style="height:104px;max-width:300px" />
                <div v-else>
                  <a-icon :type="uploadLoading ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">上传身份证正面照</div>
                </div>
              </a-upload>
              <a-upload listType="picture-card" class="avatar-uploader" :showUploadList="false" :beforeUpload="beforeUpload" @change="handleChange">
                <img v-if="avatarImage" :src="avatarImage" alt="头像" style="height:104px;max-width:300px" />
                <div v-else>
                  <a-icon :type="uploadLoading ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">上传身份证反面照</div>
                </div>
              </a-upload>
            </a-form-item>
          </div>
        </a-card>
      </a-tab-pane>
      <a-tab-pane key="2" tab="联系人信息">
        Content of Tab Pane 2
      </a-tab-pane>
      <a-tab-pane key="3" tab="审批信息">
        Content of Tab Pane 3
      </a-tab-pane>
    </a-tabs>

    <approve-reject-modal ref="approveRejectModal"></approve-reject-modal>
    <approve-veto-modal ref="approveVetoModal"></approve-veto-modal>

  </a-form>
</template>

<script>
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
  components: { ApproveRejectModal, ApproveVetoModal },
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
