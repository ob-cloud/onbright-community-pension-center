<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
  >

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="部门角色名称">
          <a-input placeholder="请输入部门角色名称" v-decorator="['roleName', validatorRules.roleName]" />
        </a-form-item>
        <!-- <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="部门角色编码">
          <a-input placeholder="请输入部门角色编码" v-decorator="['roleCode', validatorRules.roleCode]" />
        </a-form-item> -->
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="描述">
          <a-input placeholder="请输入描述" v-decorator="['description', validatorRules.description]" />
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import pick from 'lodash.pick'
  import { duplicateCheck } from '@/api/system'
  import { addDepartRole, editDepartRole } from '@/api/ssc'

  export default {
    name: 'SysDepartRoleModal',
    data () {
      return {
        title: '操作',
        visible: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
          roleName:{
            rules: [
              { required: true, message: '请输入部门角色名称!' },
              { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
            ]},
          roleCode:{
            rules: [
              { required: true, message: '请输入部门角色编码!'},
              { min: 0, max: 64, message: '长度不超过 64 个字符', trigger: 'blur' },
              { validator: this.validateRoleCode}
            ]
          },
          description:{
            rules: [
              { min: 0, max: 126, message: '长度不超过 126 个字符', trigger: 'blur' }
            ]}
        },
        url: {
          add: '/sys/sysDepartRole/add',
          edit: '/sys/sysDepartRole/edit',
        },
      }
    },
    created () {
    },
    methods: {
      add (departId) {
        this.edit({}, departId)
      },
      edit (record, departId) {
        this.departId = departId
        this.form.resetFields()
        this.model = Object.assign({}, record)
        this.visible = true
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'roleName', 'roleCode', 'description'))
        })
      },
      close () {
        this.$emit('close')
        this.visible = false
      },
      handleOk () {
        const that = this
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            this.confirmLoading = true
            let formData = Object.assign(this.model, values)
            formData.depId = this.departId
            const obj = this.model.id ? editDepartRole(formData) : addDepartRole(formData)
            obj.then((res) => {
              if (this.$isAjaxSuccess(res.code)) {
                that.$message.success(res.message)
                that.$emit('ok')
              } else {
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
      validateRoleCode(rule, value, callback){
        if(/[\u4E00-\u9FA5]/g.test(value)){
          callback("部门角色编码不可输入汉字!");
        }else{
          var params = {
            tableName: "sys_depart_role",
            fieldName: "role_code",
            fieldVal: value,
            dataId: this.model.id,
          };
          duplicateCheck(params).then((res)=>{
            if(res.success){
              callback();
            }else{
              callback(res.message);
            }
          });
        }
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
