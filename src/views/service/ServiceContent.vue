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
            <a-form-item label="添加时间">
              <a-input placeholder="请选择添加时间" v-model="queryParam.createTime"></a-input>
            </a-form-item>
          </a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item label="服务商">
                <a-input placeholder="请输入服务商" v-model="queryParam.customerName"></a-input>
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
            <a-icon type="lock" @click="batchFrozen('2')" />
            启用
          </a-menu-item>
          <a-menu-item key="3">
            <a-icon type="unlock" @click="batchFrozen('1')" />
            禁用
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
          <a v-if="record.status==0">
            <a-popconfirm title="确定禁用吗?" @confirm="() => handleFrozen(record.id, 2, record.username)">
              <a>禁用</a>
            </a-popconfirm>
          </a>
          <a v-if="record.status==1">
            <a-popconfirm title="确定启用吗?" @confirm="() => handleFrozen(record.id, 1, record.username)">
              <a>启用</a>
            </a-popconfirm>
          </a>

          <a-divider type="vertical" />

          <a-dropdown>
            <a class="ant-dropdown-link">
              更多 <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;" @click="handleDetail(record)">详情</a>
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
    name: 'PackageList',
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
            title: '服务标题',
            align: 'left',
            dataIndex: 'serviceName',
            width: 160
          },
          {
            title: '服务类型',
            align: 'center',
            width: 100,
            dataIndex: 'serviceType'
          },
          {
            title: '服务单位',
            align: 'center',
            width: 150,
            dataIndex: 'serviceUnit'
          },
          {
            title: '服务费用',
            align: 'center',
            width: 150,
            sorter: true,
            dataIndex: 'servicePrice'
          },
          {
            title: '添加时间',
            align: 'center',
            width: 150,
            sorter: true,
            dataIndex: 'createTime'
          },
          {
            title: '状态',
            align: 'center',
            width: 100,
            dataIndex: 'status',
            customRender (t) {
              const Map = {0: '已启用', 1: '未启用'}
              return Map[t] || ''
            }
          },
          {
            title: '服务商',
            align: 'center',
            width: 150,
            dataIndex: 'provider'
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
          list: '/cpc/Svc/getSvcList',
        },
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
      }
    }

  }
</script>
