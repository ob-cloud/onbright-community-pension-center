<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @submit.prevent="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="12">
            <a-form-item label="设备名">
              <a-input placeholder="请输入设备名" v-model="queryParam.name"></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="录入时间">
              <a-date-picker
                style="width: 100%"
                placeholder="请选择录入时间"
                v-model="queryParam.createTime"
              />
            </a-form-item>
          </a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item label="设备类型">
                <a-select v-model="queryParam.serviceStatus" placeholder="请选择订单状态">
                  <a-select-option value="">请选择</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="供应商">
                <a-input placeholder="请输入供应商" v-model="queryParam.supplier"></a-input>
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
      <a-button @click="handleAdd" type="primary" icon="plus">添加设备</a-button>
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
        <span slot="image" slot-scope="text, record">
          <img :src="record.deviceImages" style="max-width: 80px; max-height: 60px;" />
        </span>
        <span slot="action" slot-scope="text, record">
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
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
      </a-table>
    </div>
    <device-modal ref="modalForm" @ok="modalFormOk"></device-modal>
  </a-card>
</template>

<script>
  import { ProListMixin } from '@/utils/mixins/ProListMixin'
  import DeviceModal from './modules/DeviceModal'

  export default {
    name: 'DeviceList',
    mixins: [ ProListMixin ],
    components: {
      DeviceModal,
    },
    data() {
      return {
        queryParam: {
          name: '',
          createTime: null,
          suppilier: ''
        },
        columns: [
          {
            title: '设备名',
            align: 'center',
            dataIndex: 'deviceName',
            width: 160
          },
          {
            title: '图片',
            align: 'center',
            dataIndex: 'deviceImages',
            width: 160,
            scopedSlots: { customRender: 'image' }
          },
          {
            title: '设备类型',
            align: 'center',
            width: 100,
            dataIndex: 'deviceType'
          },
          {
            title: '单价',
            align: 'center',
            width: 100,
            dataIndex: 'devicePrice'
          },
          {
            title: '录入时间',
            align: 'center',
            width: 100,
            dataIndex: 'createTime'
          },
          {
            title: '供应商',
            align: 'center',
            width: 150,
            dataIndex: 'deviceSupplier'
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
          list: '/device/getDeviceList',
        }
      }
    },
    methods: {
      handleMenuClick (e) {
        if (e.key == 1) {
          this.batchDel()
        } else if (e.key == 2) {
          this.batchFrozen(2)
        } else if (e.key == 3) {
          this.batchFrozen(1)
        }
      },

      handleDevice () {
        // this.$refs.passwordmodal.show(username)
      },
    }
  }
</script>
