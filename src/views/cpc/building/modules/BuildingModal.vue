<template>
  <a-modal
    :title="title"
    :width="800"
    :ok="false"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :okButtonProps="{ props: {disabled: disableSubmit} }"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
  >

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="名称" :hidden="false" hasFeedback>
          <a-input id="buildingName" placeholder="请输入名称" v-decorator="['buildingName', validatorRules.departName ]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" :hidden="seen" label="上级" hasFeedback>
          <a-tree-select style="width:100%" :dropdownStyle="{maxHeight:'200px',overflow:'auto'}" :treeData="buildingTree"
                         v-model="model.parentId" placeholder="请选择上级" :disabled="condition"
          >
          </a-tree-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="类型">
          <template v-if="seen">
            <a-radio-group v-decorator="['buildingCategory',validatorRules.orgCategory]" placeholder="请选择类型">
              <a-radio value="1">
                楼
              </a-radio>
            </a-radio-group>
          </template>
          <template v-else>
            <a-radio-group v-decorator="['buildingCategory',validatorRules.orgCategory]" placeholder="请选择类型">
              <a-radio value="2">
                栋
              </a-radio>
              <a-radio value="3">
                层
              </a-radio>
            </a-radio-group>
          </template>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="编码">
          <a-input placeholder="请输入编码" v-decorator="['orgCode', validatorRules.orgCode ]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="排序">
          <a-input-number v-decorator="[ 'departOrder',{'initialValue':0}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="地址">
          <a-input placeholder="请输入地址" v-decorator="['address', {'initialValue':''}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { queryIdTree, addBuilding } from '@/api/cpc'
  import pick from 'lodash.pick'
  export default {
    name: "SysDepartModal",
    data() {
      return {
        buildingTree: [],
        title: "操作",
        seen: false,
        visible: false,
        condition: true,
        disableSubmit: false,
        model: {},
        labelCol: {
          xs: {
            span: 24
          },
          sm: {
            span: 5
          },
        },
        wrapperCol: {
          xs: {
            span: 24
          },
          sm: {
            span: 16
          },
        },

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules: {
          departName: {
            rules: [{
              required: true,
              message: '请输入机构/部门名称!'
            }]
          },
          orgCode: {
            rules: [{
              required: true,
              message: '请输入机构编码!'
            }]
          },
        },
        url: {
          add: "/sys/sysDepart/add",
        },
        dictDisabled: true,
      }
    },
    created () {
    },
    methods: {
      loadTreeData(){
        queryIdTree().then((res) => {
          if (this.$isAjaxSuccess(res.code)) {
            this.buildingTree = [];
            for (let i = 0; i < res.result.length; i++) {
              let temp = res.result[i];
              this.buildingTree.push(temp);
            }
          }
        })
      },
      add (depart) {
        if(depart){
          this.seen = false;
          this.dictDisabled = false;
        }else{
          this.seen = true;
          this.dictDisabled = true;
        }
        this.edit(depart);
      },
      edit (record) {
          this.form.resetFields();
          this.model = Object.assign({}, {});
          this.visible = true;
          this.loadTreeData();
          this.model.parentId = record!=null?record.toString():null;
          if(this.seen){
            this.model.orgCategory = '1';
          }else{
            this.model.orgCategory = '2';
          }
          this.$nextTick(() => {
            this.form.setFieldsValue(pick(this.model,'orgCategory','departName','departNameEn','departNameAbbr','depart_order','description','orgType','orgCode','fax','address','memo','status','delFlag'))
          });
      },
      close () {
        this.$emit('close');
        this.disableSubmit = false;
        this.visible = false;
      },
      handleOk () {
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            this.confirmLoading = true;
            let formData = Object.assign(this.model, values);
            //时间格式化
            console.log(formData)
            addBuilding(formData).then((res) => {
              if (this.$$$isAjaxSuccess(res.code)) {
                this.$message.success(res.message);
                this.loadTreeData()
                this.$emit('ok')
              } else {
                this.$message.warning(res.message)
              }
            }).finally(() => {
              this.confirmLoading = false
              this.close()
            })
          }
        })
      },
      handleCancel () {
        this.close()
      },
    }
  }
</script>

<style lang="less" scoped>

</style>
