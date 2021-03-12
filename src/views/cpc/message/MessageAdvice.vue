<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @submit.prevent="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="12">
            <a-form-item label="反馈标题">
              <a-input placeholder="请输入反馈标题" v-model="queryParam.customerName"></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="12">
            <a-form-item label="反馈类型">
              <a-select v-decorator="[ 'status' ]" placeholder="请选择反馈类型">
                <a-select-option value="">请选择</a-select-option>
                <a-select-option :value="0">服务反馈</a-select-option>
                <a-select-option :value="1">工单反馈</a-select-option>
                <a-select-option :value="2">其他反馈</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item label="反馈时间">
                <a-date-picker
                  style="width: 100%"
                  placeholder="请选择反馈时间"
                  v-decorator="['feedbackTime']"
                />
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

    <!-- table区域-begin -->
    <div>
      <!-- <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i>已选择&nbsp;<a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项&nbsp;&nbsp;
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div> -->

      <a-table
        ref="table"
        bordered
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <!-- <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />

          <a-dropdown>
            <a class="ant-dropdown-link">
              更多 <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;" @click="handleDetail(record)">查看</a>
              </a-menu-item>

              <a-menu-item>
                <a href="javascript:;" @click="handleDevice(record.customerName)">设备</a>
              </a-menu-item>

              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>

              <a-menu-item v-if="record.status==1">
                <a-popconfirm title="确定禁用吗?" @confirm="() => handleFrozen(record.id, 2, record.username)">
                  <a>禁用</a>
                </a-popconfirm>
              </a-menu-item>

              <a-menu-item v-if="record.status==2">
                <a-popconfirm title="确定启用吗?" @confirm="() => handleFrozen(record.id, 1, record.username)">
                  <a>启用</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span> -->
      </a-table>
    </div>
  </a-card>
</template>

<script>
  import { ProListMixin } from '@/utils/mixins/ProListMixin'

  export default {
    name: 'FeedbackList',
    mixins: [ ProListMixin ],
    components: {
    },
    data() {
      return {
        queryParam: {
          packageName: '',
        },
        columns: [
          {
            title: '反馈编号',
            align: 'center',
            dataIndex: 'id',
            width: 120
          },
          {
            title: '反馈标题',
            align: 'center',
            width: 120,
            dataIndex: 'title'
          },

          {
            title: '反馈类型',
            align: 'center',
            width: 100,
            dataIndex: 'type',
            customRender (t) {
              const StatusMap = {0: '服务反馈', 1: '工单反馈', 2: '其他反馈'}
              return StatusMap[t]
            }
          },
          {
            title: '反馈内容',
            align: 'center',
            width: 150,
            dataIndex: 'content'
          },
          {
            title: '反馈人',
            align: 'center',
            width: 150,
            dataIndex: 'feeder'
          },
          {
            title: '反馈时间',
            align: 'center',
            width: 150,
            sorter: true,
            dataIndex: 'createTime'
          },
          // {
          //   title: '操作',
          //   dataIndex: 'action',
          //   scopedSlots: { customRender: 'action' },
          //   align: 'center',
          //   width: 170
          // }
        ],
        url: {
          list: '/message/getFeedbackList',
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
