<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
    wrapClassName="ant-modal-cust-warp"
    style="top:5%;height: 85%;overflow-y: hidden"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="角色名称">
          <a-input placeholder="请输入角色名称" v-decorator="[ 'roleName', validatorRules.roleName]" />
        </a-form-item>

        <!-- <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="角色编码">
          <a-input placeholder="请输入角色编码" :disabled="roleDisabled" v-decorator="[ 'roleCode', validatorRules.roleCode]" />
        </a-form-item> -->

        <a-form-item label="角色类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <!-- <a-select
            style="width: 100%"
            placeholder="请选择角色类型"
            optionFilterProp="children"
            @change="changeRoleType"
            v-decorator="[ 'type', validatorRules.type]"
          >
            <a-select-option v-for="(role,roleindex) in roleTypeList" :key="roleindex.toString()" :value="role.value">
              {{ role.name }}
            </a-select-option>
          </a-select> -->
          <dict-select-tag v-decorator="['type', { initialValue: '', ...validatorRules.type}]" placeholder="请选择角色类型" :type="'select'" :triggerChange="true" dictCode="role_type" />
        </a-form-item>

        <!-- <a-form-item v-if="isCommunityType" label="关联附属角色" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            mode="multiple"
            style="width: 100%"
            placeholder="请选择角色"
            optionFilterProp="children"
            v-model="selectedRole"
          >
            <a-select-option v-for="(role,roleindex) in roleList" :key="roleindex.toString()" :value="role.id">
              {{ role.roleName }}
            </a-select-option>
          </a-select>
        </a-form-item> -->

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="描述">
          <a-textarea :rows="5" placeholder="..." v-decorator="[ 'description', validatorRules.description ]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import pick from 'lodash.pick'
  import { addRole, editRole, queryAllRole, querySubRole } from '@/api/system'
  import DictSelectTag from '@/components/Pro/DictSelectTag'

  export default {
    name: 'RoleModal',
    components: { DictSelectTag },
    data () {
      return {
        title: '操作',
        visible: false,
        roleDisabled: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        isCommunityType: false,
        selectedRole: [],
        roleList: [],
        roleTypeList: [{
          value: 0,
          name: '中台'
        }, {
          value: 1,
          name: '社区'
        }, {
          value: 2,
          name: '供应商'
        }],
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules: {
          roleName: {
            rules: [
              { required: true, message: '请输入角色名称!' },
              { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
            ]},
          type: {
            rules: [ { required: true, message: '请选择平台类型!' } ]
          },
          // roleCode: {
          //   rules: [
          //     { required: true, message: '请输入角色名称!'},
          //     { min: 0, max: 64, message: '长度不超过 64 个字符', trigger: 'blur' },
          //     { validator: this.validateRoleCode}
          //   ]},
          description: {
            rules: [
              { required: true, message: '请选择平台类型!' },
              { min: 0, max: 126, message: '长度不超过 126 个字符', trigger: 'blur' }
            ]}
        },
      }
    },
    created () {
    },
    methods: {
      add () {
        this.edit({})
      },
      edit (record) {
        this.form.resetFields()
        this.initialRoleList()
        record.type = `${record.type || ''}` // toString for dictTagSelect
        this.model = Object.assign({}, record);
        this.visible = true

        //编辑页面禁止修改角色编码
        this.roleDisabled = !!this.model.id
        if (this.model.id && this.model.type === 1) {
          this.isCommunityType = true
          this.loadUserRoles(this.model.id)
        }
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'roleName', 'description','roleCode', 'type'))
        })
      },
      close () {
        this.$emit('close')
        this.visible = false
        this.selectedRole = []
        this.isCommunityType = false
      },
      handleOk () {
        const that = this
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true
            let formData = Object.assign(this.model, values)
            if (this.isCommunityType) {
              formData.childIds = this.selectedRole.length > 0 ? this.selectedRole.join(',') : ''
            }
            let obj = !this.model.id ? addRole(formData) : editRole(formData)
            obj.then((res)=>{
              if(this.$isAjaxSuccess(res.code)){
                that.$message.success(res.message)
                that.$emit('ok')
              }else{
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
      initialRoleList () {
        queryAllRole({ column: '', order: true }).then((res) => {
          if (this.$isAjaxSuccess(res.code)) {
            this.roleList = res.result
          } else {
            console.log(res.message)
          }
        })
      },
      loadUserRoles (roleId) {
        querySubRole({ roleId }).then((res) => {
          if (this.$isAjaxSuccess(res.code)) {
            this.selectedRole = res.result.childs
          } else {
            console.log(res.message)
          }
        })
      },
      changeRoleType (val) {
        this.isCommunityType = val === 1
      }
      // validateRoleCode (rule, value, callback){
      //   if(/[\u4E00-\u9FA5]/g.test(value)){
      //     callback('角色编码不可输入汉字!')
      //   }else{
      //     var params = {
      //       tableName: 'sys_role',
      //       fieldName: 'role_code',
      //       fieldVal: value,
      //       dataId: this.model.id,
      //     };
      //     duplicateCheck(params).then((res)=>{
      //       if(this.$isAjaxSuccess(res.code)){
      //         callback()
      //       }else{
      //         callback(res.message)
      //       }
      //     })
      //   }
      // }
    }
  }
</script>

<style scoped>

</style>
