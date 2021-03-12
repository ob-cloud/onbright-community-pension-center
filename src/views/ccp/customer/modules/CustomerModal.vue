<template>
  <a-spin :spinning="loading">
    <a-form :form="form" class="content">
      <a-card title="账号信息" class="card">
        <a slot="extra" href="#"></a>
        <div class="grid-cell">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="账号名称">
            <a-input placeholder="请输入账号名称" v-decorator="[ 'username', validatorRules.username]" :readOnly="disableSubmit" />
          </a-form-item>
          <template v-if="!entityId">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="账号密码">
              <a-input type="password" placeholder="请输入新密码" v-decorator="[ 'password', validatorRules.password]" />
            </a-form-item>
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="确认密码">
              <a-input type="password" @blur="handleConfirmBlur" placeholder="请确认新密码" v-decorator="[ 'confirmpassword', validatorRules.confirmpassword]" />
            </a-form-item>
          </template>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="用户角色">
            <a-select
              style="width: 100%"
              placeholder="请选择用户角色"
              optionFilterProp="children"
              v-decorator="[ 'role', {}]"
            >
              <a-select-option v-for="(role,roleindex) in roleList" :key="roleindex.toString()" :value="role.id">
                {{ role.roleName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </div>
      </a-card>
      <a-card title="基本信息" class="card">
        <a slot="extra" href="#"></a>
        <div class="grid-cell double">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户名称" class="ant-col-sm-12">
            <a-input placeholder="请输入客户名称" v-decorator="[ 'customerInformationParam.customerName', validatorRules.username]" :readOnly="disableSubmit" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所在地区" class="ant-col-sm-12">
            <a-input placeholder="请输入所在地区" v-decorator="['customerInformationParam.addr']" :readOnly="disableSubmit" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户状态" class="ant-col-sm-12">
            <a-select v-decorator="[ 'customerInformationParam.status', {}]" placeholder="请选择客户状态">
              <a-select-option value="1">入驻中</a-select-option>
              <a-select-option value="2">退驻</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="详细地址" class="ant-col-sm-12">
            <a-input placeholder="请输入详细地址" v-decorator="[ 'customerInformationParam.detailAddr', {}]" :readOnly="disableSubmit" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户来源" class="ant-col-sm-12">
            <a-input placeholder="请输入客户来源" v-decorator="[ 'customerInformationParam.from', {}]" :readOnly="disableSubmit" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="企业规模" class="ant-col-sm-12">
            <a-select v-decorator="[ 'customerInformationParam.scale', {}]" placeholder="请选择企业规模">
              <a-select-option value="">请选择</a-select-option>
              <a-select-option value="1">10人以内</a-select-option>
              <a-select-option value="2">10-20人</a-select-option>
              <a-select-option value="3">21-50人</a-select-option>
              <a-select-option value="4">51-200人</a-select-option>
              <a-select-option value="5">201-500人</a-select-option>
              <a-select-option value="6">500人以上</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="归属人员" class="ant-col-sm-12">
            <a-input placeholder="请输入销售人员" v-decorator="[ 'customerInformationParam.owner', {}]" :readOnly="disableSubmit" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="备注信息" class="ant-col-sm-12">
            <a-input placeholder="请输入备注信息" v-decorator="[ 'customerInformationParam.note', {}]" :readOnly="disableSubmit" />
          </a-form-item>
        </div>
      </a-card>
      <a-card title="联系信息" class="card">
        <a slot="extra" href="#"></a>
        <div class="grid-cell">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="联系人姓名" class="ant-col-sm-12">
            <a-input placeholder="请输入联系人姓名" v-decorator="['customerContactParam.contact', validatorRules.username]" :readOnly="disableSubmit" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="固定电话" class="ant-col-sm-12">
            <a-input placeholder="请输入固定电话" v-decorator="['customerContactParam.telephone', {}]" :readOnly="disableSubmit" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="尊称" class="ant-col-sm-12">
            <a-radio-group v-decorator="['customerContactParam.respect', {}]">
              <a-radio value="未知">未知</a-radio>
              <a-radio value="先生">先生</a-radio>
              <a-radio value="女士">女士</a-radio>
            </a-radio-group>

          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="传真号码" class="ant-col-sm-12">
            <a-input placeholder="请输入传真号码" v-decorator="['customerContactParam.fax', {}]" :readOnly="disableSubmit" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="角色" class="ant-col-sm-12">
            <a-input placeholder="请选择联系人身份" v-decorator="['customerContactParam.role', {}]" :readOnly="disableSubmit" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="电子邮件" class="ant-col-sm-12">
            <a-input placeholder="请输入电子邮件" v-decorator="['customerContactParam.email', {}]" :readOnly="disableSubmit" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="手机号码" class="ant-col-sm-12">
            <a-input placeholder="请输入手机号码" v-decorator="['customerContactParam.mobile', {}]" :readOnly="disableSubmit" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="微信号" class="ant-col-sm-12">
            <a-input placeholder="请输入微信号" v-decorator="['customerContactParam.wechat', {}]" :readOnly="disableSubmit" />
          </a-form-item>
        </div>
      </a-card>
      <a-card title="微信配置" class="card">
        <a slot="extra" href="#"></a>
        <div class="grid-cell">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="公众号名称" class="ant-col-sm-12">
            <a-input placeholder="请输入公众号名称" v-decorator="['customerPaymentParam.name', {}]" :readOnly="disableSubmit" />
            <!-- <a-input placeholder="请输入公众号名称" v-decorator="['name', {}]" /> -->
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="公众号ID" class="ant-col-sm-12">
            <a-input placeholder="请输入公众号ID" v-decorator="['customerPaymentParam.uniacid', {}]" :readOnly="disableSubmit" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="AppID" class="ant-col-sm-12">
            <a-input placeholder="请输入AppID" v-decorator="['customerPaymentParam.appid', {}]" :readOnly="disableSubmit" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="AppSecret" class="ant-col-sm-12">
            <a-input placeholder="请输入AppSecret" v-decorator="['customerPaymentParam.appsecret', {}]" :readOnly="disableSubmit" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="URL" class="ant-col-sm-12">
            <a-input placeholder="请输入服务验证URL" v-decorator="['customerPaymentParam.url', {}]" :readOnly="disableSubmit" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="Token" class="ant-col-sm-12">
            <a-input placeholder="请输入Token" v-decorator="['customerPaymentParam.token', {}]" :readOnly="disableSubmit" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="支付商户号" class="ant-col-sm-12">
            <a-input placeholder="请输入支付商户号" v-decorator="['customerPaymentParam.merchantId', {}]" :readOnly="disableSubmit" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="支付秘钥" class="ant-col-sm-12">
            <a-input placeholder="请输入支付秘钥" v-decorator="['customerPaymentParam.wechatRefundCert', {}]" :readOnly="disableSubmit" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="消息模板ID" class="ant-col-sm-24">
            <a-input placeholder="请输入消息模板ID" :readOnly="disableSubmit" />
          </a-form-item>
        </div>
      </a-card>
      <a-card title="支付宝配置" class="card">
        <a slot="extra" href="#"></a>
        <div class="grid-cell">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="收款支付宝账号" class="ant-col-sm-12">
            <a-input placeholder="请输入收款支付宝账号" v-decorator="['customerPaymentParam.alipayAccount', {}]" :readOnly="disableSubmit" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="合作者身份" class="ant-col-sm-12">
            <a-input placeholder="请输入合作者身份" v-decorator="['customerPaymentParam.alipayPartnerId', {}]" :readOnly="disableSubmit" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="校验秘钥" class="ant-col-sm-24">
            <a-input placeholder="请输入校验秘钥" v-decorator="['customerPaymentParam.alipaySecret', {}]" :readOnly="disableSubmit" />
          </a-form-item>
        </div>
      </a-card>
    </a-form>
  </a-spin>
</template>

<script>
import md5 from 'md5'
import { addConsumer, editConsumer, getConsumerDetail } from '@/api/service'
import { queryAllRole } from '@/api/system'
export default {
  data() {
    return {
      loading: false,
      model: {
      },
      disableSubmit: false,
      entityId: '',
      roleList: [],
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
          rules: [{ required: true, message: '请输入名称!' }],
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
  created() {
    this.$events.$on('ok', () => {
      const that = this
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          let formData = Object.assign(that.model, values)
          formData.confirmpassword = undefined
          if (!that.model.customerId) {
            formData.password = md5(formData.password)
          }
          let obj = !that.model.customerId ? addConsumer(formData) : editConsumer(formData)
          obj.then((res) => {
            if (that.$isAjaxSuccess(res.code)) {
              that.$message.success(res.message)
              that.$router.push(this.$routePath.CCP_CUSTOMER_PATH)
            } else {
              that.$message.warning(res.message)
            }
          }).finally(() => {
          })
        }
      })
    })
  },
  mounted () {
    const customerId = this.$route.query.id
    const type = this.$route.query.type
    this.disableSubmit = false
    this.loading = false
    if (customerId) {
      this.entityId = customerId
      this.loading = true
      getConsumerDetail(this.entityId).then(res => {
        if (this.$isAjaxSuccess(res.code)) {
          this.edit(res.result)
        } else {
          this.$message.warning(res.message)
        }
      }).finally(() => {
        this.loading = false
      })
      if (type === 3) { // preview mode
        this.disableSubmit = true
      }
    } else {
      this.add()
    }
  },
  methods: {
    refresh () {
      this.entityId = ''
    },
    add () {
      this.refresh()
      this.edit({})
    },
    edit (record) {
      this.initialRoleList()
      this.form.resetFields()
      if (record.hasOwnProperty('customerId')) {
        // this.loadUserRoles(record.id)
      }
      this.model = Object.assign({}, record)
      this.$nextTick(() => {
        this.form.setFieldsValue(this.model)
      })
    },
    initialRoleList () {
      queryAllRole({
        column: '',
        order: true
      }).then((res) => {
        if (this.$isAjaxSuccess(res.code)) {
          this.roleList = res.result
        } else {
          console.log(res.message)
        }
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
  },
  destroyed () {
    this.$events.$off('ok')
  }
}
</script>

<style lang="less" scoped>
.breadcrumb{
  position: relative;
  background: #fff;
  padding: 10px;

  .operator{
    position: absolute;
    top: 8px;
    right: 20px;

    button{
      margin-left: 5px;
    }
  }
}
.content {
  // padding: 20px;

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
