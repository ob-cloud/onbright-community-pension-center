<template>
  <a-drawer
    :title="title"
    :maskClosable="true"
    :width="drawerWidth"
    placement="right"
    :closable="true"
    @close="handleCancel"
    :visible="visible"
    style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;"
  >

    <template slot="title">
      <div style="width: 100%;">
        <span>{{ title }}</span>
        <span style="display:inline-block;width:calc(100% - 51px);padding-right:10px;text-align: right">
          <a-button @click="toggleScreen" icon="appstore" style="height:20px;width:20px;border:0px"></a-button>
        </span>
      </div>

    </template>

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
          <div class="pkg-wrapper">
            <h2 class="pkg-title">套餐1</h2>
            <p class="pkg-item"><label class="pckg-item-label">设备数：</label><span>100</span></p>
            <p class="pkg-item"><label class="pckg-item-label">套餐价：</label><span>10000</span></p>
          </div>
        </a-form-item>
      </a-form>

    </a-spin>

    <div class="drawer-bootom-button" v-show="!disableSubmit">
      <a-popconfirm title="确定放弃编辑？" @confirm="handleCancel" okText="确定" cancelText="取消">
        <a-button style="margin-right: .8rem">取消</a-button>
      </a-popconfirm>
      <a-button @click="handleSubmit" type="primary" :loading="confirmLoading">提交</a-button>
    </div>
  </a-drawer>
</template>

<script>
  import Vue from 'vue'
  import { ACCESS_TOKEN } from '@/store/mutation-types'
  import { getPackageList } from '@/api/service'

  export default {
    name: 'UserModal',
    components: {
    },
    data () {
      return {
        roleDisabled: false, //是否是角色维护调用该页面
        modalWidth: 800,
        drawerWidth: 700,
        modaltoggleFlag: true,
        confirmDirty: false,
        userId: '', //保存用户id
        disableSubmit: false,
        title: '操作',
        visible: false,
        model: {},
        packageList: [],
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        confirmLoading: false,
        headers: {},
        form: this.$form.createForm(this),
        url: {
          userId: '/sys/user/generateUserId', // 引入生成添加用户情况下的url
        },
      }
    },
    created () {
      const token = Vue.ls.get(ACCESS_TOKEN)
      this.headers = {
        'X-Access-Token': token
      }
    },
    methods: {
      isDisabledAuth (code) {
        console.log(code)
        // return disabledAuthFilter(code)
      },
      //窗口最大化切换
      toggleScreen () {
        this.modalWidth = this.modaltoggleFlag ? window.innerWidth : 800
        this.modaltoggleFlag = !this.modaltoggleFlag;
      },
      initialPackageList () {
        getPackageList({
          column: '',
          order: true
        }).then((res) => {
          if (this.$isAjaxSuccess(res.code)) {
            this.packageList = res.result.records
          } else {
            console.log(res.message)
          }
        })
      },
      refresh () {
          this.userId = ''
      },
      add () {
        this.refresh()
        this.edit({activitiSync: false})
      },
      edit (record) {
        this.resetScreenSize() // 调用此方法,根据屏幕宽度自适应调整抽屉的宽度
        this.initialPackageList()
        this.form.resetFields()
        if (record.hasOwnProperty('id')) {
          //
        }
        this.userId = record.id
        this.visible = true
      },
      close () {
        this.$emit('close')
        this.visible = false
        this.disableSubmit = false
      },
      handleSubmit () {
        // const that = this
        // 触发表单验证
        // this.form.validateFields((err, values) => {
        //   if (!err) {
        //     that.confirmLoading = true
        //     // let formData = Object.assign(this.model, values)
        //     // let obj = !this.model.id ? addUser(formData) : editUser(formData)
        //     // obj.then((res) => {
        //     //   if (this.$isAjaxSuccess(res.code)) {
        //     //     that.$message.success(res.message)
        //     //     that.$emit('ok')
        //     //   } else {
        //     //     that.$message.warning(res.message)
        //     //   }
        //     // }).finally(() => {
        //     //   that.confirmLoading = false
        //     //   that.close()
        //     // })
        //   }
        // })
      },
      handleCancel () {
        this.close()
      },
      handleConfirmBlur (e) {
        const value = e.target.value
        this.confirmDirty = this.confirmDirty || !!value
      },

      // 根据屏幕变化,设置抽屉尺寸
      resetScreenSize() {
        let screenWidth = document.body.clientWidth
        this.drawerWidth = screenWidth < 500 ? screenWidth : 700
      },
    }
  }
</script>

<style scoped lang="less">
  .ant-table-tbody .ant-table-row td{
    padding-top:10px;
    padding-bottom:10px;
  }

  .drawer-bootom-button {
    position: absolute;
    bottom: -8px;
    width: 100%;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    left: 0;
    background: #fff;
    border-radius: 0 0 2px 2px;
  }

  .pkg-wrapper {
    border: 1px solid #ccc;
    box-shadow: 1px 1px 2px #eee;
    border-radius: 6px;
    padding: 10px;
    text-align: center;
    cursor: pointer;
    .pkg-title{

    }
    .pkg-item{
      margin: 0;
    }
    .pkg-item .pkg-item-label{

    }
  }
</style>
