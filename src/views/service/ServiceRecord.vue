<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @submit.prevent="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="12">
            <a-form-item label="服务标题">
              <a-input placeholder="请输入服务标题" v-model="queryParam.customerName"></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="申请时间">
              <a-date-picker
                style="width: 100%"
                placeholder="请选择申请时间"
                v-model="queryParam.createTime"
              />
            </a-form-item>
          </a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item label="服务状态">
                <a-select v-model="queryParam.serviceStatus" placeholder="请选择服务状态">
                  <a-select-option value="">请选择</a-select-option>
                  <a-select-option value="1">已完成</a-select-option>
                  <a-select-option value="2">进行中</a-select-option>
                  <a-select-option value="3">待受理</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="服务商">
                <a-input placeholder="请输入服务商" v-model="queryParam.customerName"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="派单状态">
                <a-select v-model="queryParam.allocateStatus" placeholder="请选择派单状态">
                  <a-select-option value="">请选择</a-select-option>
                  <a-select-option value="1">已派单</a-select-option>
                  <a-select-option value="2">未派单</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </template>

          <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'" />
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator" style="border-top: 5px">
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item key="1">
            <a-icon type="delete" @click="batchDel" />
            删除
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="lock" />
            导出
          </a-menu-item>

        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作
          <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i>已选择&nbsp;<a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项&nbsp;&nbsp;
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        bordered
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange"
      >
        <span slot="action" slot-scope="text, record">
          <a-dropdown>
            <a class="ant-dropdown-link">
              更多 <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;" @click="handleAction(record)">详情</a>
              </a-menu-item>

              <a-menu-item v-if="record.allocateStatus==1">
                <a>派单</a>
              </a-menu-item>

              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
      </a-table>
    </div>
    <service-content-modal ref="modalForm"></service-content-modal>
  </a-card>
</template>

<script>
  import { ProListMixin } from '@/utils/mixins/ProListMixin'
  import ServiceContentModal from './modules/ServiceContentModal'

  export default {
    name: 'ServiceRecord',
    mixins: [ ProListMixin ],
    components: {
      ServiceContentModal
    },
    data() {
      return {
        queryParam: {
          packageName: '',
        },
        columns: [
          {
            title: '服务编号',
            align: 'center',
            dataIndex: 'id',
            width: 160
          },
          {
            title: '服务标题',
            align: 'center',
            dataIndex: 'serviceName',
            width: 160
          },
          {
            title: '护理对象',
            align: 'center',
            width: 100,
            dataIndex: 'wechatUserParentName'
          },
          {
            title: '申请时间',
            align: 'center',
            width: 100,
            dataIndex: 'createTime'
          },
          {
            title: '护工',
            align: 'center',
            width: 150,
            dataIndex: 'nursingWorker'
          },
          {
            title: '护理时间',
            align: 'center',
            width: 150,
            sorter: true,
            dataIndex: 'serviceBegainTime'
          },
          {
            title: '服务商',
            align: 'center',
            width: 150,
            sorter: true,
            dataIndex: 'serviceOrgName'
          },
          {
            title: '服务状态',
            align: 'center',
            width: 100,
            dataIndex: 'status',
            customRender (t) {
              const Map = {0: '已完成', 1: '待受理', 2: '进行中'}
              return Map[t] || ''
            }
          },
          {
            title: '派单状态',
            align: 'center',
            width: 100,
            dataIndex: 'orderStatus',
            customRender (t) {
              const Map = {0: '已派单', 1: '未派单'}
              return Map[t] || ''
            }
          },
          {
            title: '操作',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' },
            align: 'center',
            width: 170
          }
        ],
        url: {
          list: '/Svc//getSvcOrderList',
        },
        path: {
          detail: '/service/record/detail'
        }
      }
    },
    methods: {
      // batchFrozen (status) {
      //   if (this.selectedRowKeys.length <= 0) {
      //     this.$message.warning('请选择一条记录！')
      //     return false
      //   } else {
      //     let ids = ''
      //     let that = this
      //     let isAdmin = false
      //     that.selectionRows.forEach(function (row) {
      //       if (row.username == 'admin') {
      //         isAdmin = true
      //       }
      //     });
      //     if (isAdmin) {
      //       that.$message.warning('管理员账号不允许此操作,请重新选择！')
      //       return
      //     }
      //     that.selectedRowKeys.forEach(function (val) {
      //       ids += val + ','
      //     })
      //     that.$confirm({
      //       title: '确认操作',
      //       content: '是否' + (status == 1 ? '解冻' : '冻结') + '选中账号?',
      //       onOk: function () {
      //         frozenBatch({ids: ids, status: status}).then((res) => {
      //           if (that.$isAjaxSuccess(res.code)) {
      //             that.$message.success(res.message)
      //             that.loadData()
      //             that.onClearSelected()
      //           } else {
      //             that.$message.warning(res.message)
      //           }
      //         })
      //       }
      //     })
      //   }
      // },
      handleMenuClick (e) {
        if (e.key == 1) {
          this.batchDel()
        } else if (e.key == 2) {
          this.batchFrozen(2)
        } else if (e.key == 3) {
          this.batchFrozen(1)
        }
      },
      // handleFrozen (id, status, username) {
      //   //TODO 后台校验管理员角色
      //   // if ('admin' == username) {
      //   //   this.$message.warning('管理员账号不允许此操作！')
      //   //   return
      //   // }
      //   // frozenBatch({ids: id, status: status}).then((res) => {
      //   //   if (this.$isAjaxSuccess(res.code)) {
      //   //     this.$message.success(res.message)
      //   //     this.loadData()
      //   //   } else {
      //   //     this.$message.warning(res.message)
      //   //   }
      //   // });
      // },
      handleDevice () {
        // this.$refs.passwordmodal.show(username)
      },
      handleActionDetail (record) {
        this.$router.push({path: '/service/record/detail', query: { id: record.id, disableSubmit: true, t: Date.now() }}, () => {
          this.$store.dispatch('ToggleMultiTab', false)
          this.$store.dispatch('ToggleIsActionBreadcrumb', false)
        })
      }
    }

  }
</script>
