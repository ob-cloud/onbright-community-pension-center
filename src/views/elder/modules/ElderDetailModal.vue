<template>
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
      </div>
    </a-card>
    <a-card title="基本信息" class="card">
      <a slot="extra" href="#"></a>
      <div class="grid-cell double">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户名称" class="ant-col-sm-12">
          <a-input placeholder="请输入客户名称" v-decorator="[ 'customerName', validatorRules.username]" :readOnly="disableSubmit" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所在地区" class="ant-col-sm-12">
          <a-input placeholder="请输入所在地区" v-decorator="['addr']" :readOnly="disableSubmit" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户状态" class="ant-col-sm-12">
          <a-select v-decorator="[ 'status', {}]" placeholder="请选择客户状态">
            <a-select-option value="">请选择</a-select-option>
            <a-select-option value="1">入驻中</a-select-option>
            <a-select-option value="2">退驻</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="详细地址" class="ant-col-sm-12">
          <a-input placeholder="请输入详细地址" v-decorator="[ 'detailAddr', {}]" :readOnly="disableSubmit" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户来源" class="ant-col-sm-12">
          <a-input placeholder="请输入客户来源" v-decorator="[ 'from', {}]" :readOnly="disableSubmit" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="企业规模" class="ant-col-sm-12">
          <a-select v-decorator="[ 'scale', {}]" placeholder="请选择企业规模">
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
          <a-input placeholder="请输入销售人员" v-decorator="[ 'owner', {}]" :readOnly="disableSubmit" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="备注信息" class="ant-col-sm-12">
          <a-input placeholder="请输入备注信息" v-decorator="[ 'note', {}]" :readOnly="disableSubmit" />
        </a-form-item>
      </div>
    </a-card>
    <a-card title="联系信息" class="card">
      <a slot="extra" href="#"></a>
      <div class="grid-cell">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="联系人姓名" class="ant-col-sm-12">
          <a-input placeholder="请输入联系人姓名" v-decorator="['contact', {}]" :readOnly="disableSubmit" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="固定电话" class="ant-col-sm-12">
          <a-input placeholder="请输入固定电话" v-decorator="['telephone', {}]" :readOnly="disableSubmit" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="尊称" class="ant-col-sm-12">
          <a-checkbox>未知</a-checkbox>
          <a-checkbox>先生</a-checkbox>
          <a-checkbox>女士</a-checkbox>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="传真号码" class="ant-col-sm-12">
          <a-input placeholder="请输入传真号码" v-decorator="['fax', {}]" :readOnly="disableSubmit" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="角色" class="ant-col-sm-12">
          <a-input placeholder="请选择联系人身份" v-decorator="['role', {}]" :readOnly="disableSubmit" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="电子邮件" class="ant-col-sm-12">
          <a-input placeholder="请输入电子邮件" v-decorator="['email', {}]" :readOnly="disableSubmit" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="手机号码" class="ant-col-sm-12">
          <a-input placeholder="请输入手机号码" v-decorator="['mobile', {}]" :readOnly="disableSubmit" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="微信号" class="ant-col-sm-12">
          <a-input placeholder="请输入微信号" :readOnly="disableSubmit" />
        </a-form-item>
      </div>
    </a-card>
    <a-card title="微信配置" class="card">
      <a slot="extra" href="#"></a>
      <div class="grid-cell">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="公众号名称" class="ant-col-sm-12">
          <a-input placeholder="请输入传真号码" v-decorator="['n3', {}]" :readOnly="disableSubmit" />
          <!-- <a-input placeholder="请输入公众号名称" v-decorator="['name', {}]" /> -->
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="公众号ID" class="ant-col-sm-12">
          <a-input placeholder="请输入公众号ID" v-decorator="['uniacid', {}]" :readOnly="disableSubmit" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="AppID" class="ant-col-sm-12">
          <a-input placeholder="请输入AppID" v-decorator="['appid', {}]" :readOnly="disableSubmit" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="AppSecret" class="ant-col-sm-12">
          <a-input placeholder="请输入AppSecret" v-decorator="['appsecret', {}]" :readOnly="disableSubmit" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="URL" class="ant-col-sm-12">
          <a-input placeholder="请输入服务验证URL" v-decorator="['url', {}]" :readOnly="disableSubmit" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="Token" class="ant-col-sm-12">
          <a-input placeholder="请输入Token" v-decorator="['token', {}]" :readOnly="disableSubmit" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="支付商户号" class="ant-col-sm-12">
          <a-input placeholder="请输入支付商户号" v-decorator="['merchantId', {}]" :readOnly="disableSubmit" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="支付秘钥" class="ant-col-sm-12">
          <a-input placeholder="请输入支付秘钥" v-decorator="['wechatRefundCert', {}]" :readOnly="disableSubmit" />
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
          <a-input placeholder="请输入收款支付宝账号" v-decorator="['alipayAccount', {}]" :readOnly="disableSubmit" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="合作者身份" class="ant-col-sm-12">
          <a-input placeholder="请输入合作者身份" v-decorator="['alipayPartnerId', {}]" :readOnly="disableSubmit" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="校验秘钥" class="ant-col-sm-24">
          <a-input placeholder="请输入校验秘钥" v-decorator="['alipaySecret', {}]" :readOnly="disableSubmit" />
        </a-form-item>
      </div>
    </a-card>
  </a-form>
</template>

<script>
export default {
  data() {
    return {
      model: {
      },
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
  computed: {
    routeList() {
      const routes = this.$route.matched.slice(1)
      const breadcrumb = routes.map(route => {
        return {
          path: route.path,
          breadcrumbName: route.meta.title
        }
      })
      return breadcrumb
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
    const customerId = this.$route.query.customerId
    const type = this.$route.query.type
    this.disableSubmit = false
    if (customerId) {
      this.entityId = customerId
      this.getCustomerDetail().then(record => {
        this.edit(record)
      })
      if (type === 3) { // preview mode
        this.disableSubmit = true
      }
    } else {
      this.add()
    }
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
