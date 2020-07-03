<template>
  <a-card :bordered="false">
    <template v-if="entityId">
      <!-- 查询区域 -->
      <div class="table-page-search-wrapper">
        <a-form layout="inline" @submit.prevent="searchQuery">
          <a-row :gutter="24">

            <a-col :md="12" :sm="12">
              <a-form-item label="床位号">
                <a-input placeholder="请输入床位号" v-model="queryParam.customerName"></a-input>
              </a-form-item>
            </a-col>

            <a-col :md="6" :sm="8">
              <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
                <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
                <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <!-- 操作按钮区域 -->
      <div class="table-operator" style="border-top: 5px">
        <a-button @click="handleAdd" type="primary" icon="plus">添加床位</a-button>
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <a-menu slot="overlay" @click="handleMenuClick">
            <a-menu-item key="1">
              <a-icon type="delete" @click="batchDel" />
              删除
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
          @change="handleTableChange"
        >
          <span slot="action" slot-scope="text, record">
            <a @click="handleEdit(record)">编辑</a>

            <a-divider type="vertical" />

            <a-dropdown>
              <a class="ant-dropdown-link">
                更多 <a-icon type="down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a href="javascript:;" @click="handleImport(record)">导入</a>
                </a-menu-item>

                <a-menu-item>
                  <a href="javascript:;" @click="handleDevice(record.customerName)">设备</a>
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
    </template>
    <a-card v-else :bordered="false" style="height:200px">
      <a-empty>
        <span slot="description"> 请先选择楼宇! </span>
      </a-empty>
    </a-card>
    <bed-modal ref="modalForm" @click="modalFormOk"></bed-modal>
  </a-card>
</template>

<script>
  import { ProListMixin } from '@/utils/mixins/ProListMixin'
  import BedModal from './BuildingBedModal'
  import { getBuiltBedList } from '@/api/service'

  export default {
    name: 'BuildingBedList',
    mixins: [ ProListMixin ],
    components: {
      BedModal
    },
    data() {
      return {
        queryParam: {
          packageName: '',
        },
        entityId: '',
        columns: [
          {
            title: '床位号',
            align: 'center',
            dataIndex: 'bedNo',
            width: 120
          },
          {
            title: '状态',
            align: 'center',
            width: 120,
            dataIndex: 'status',
            customRender (t) {
              return t === 1 ? '使用中' : '空闲'
            }
          },

          {
            title: '入驻时间',
            align: 'center',
            width: 150,
            sorter: true,
            dataIndex: 'createTime'
          },
          {
            title: '操作',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' },
            align: 'center',
            width: 170
          }
        ],
        dataSource: [],
        url: {
          list: '/building/getBedList',
        },
      }
    },
    methods: {
      show(id){
        this.entityId = id
        this.loadData()
      },
      loadData(){
        getBuiltBedList().then((res) => {
          if (this.$isAjaxSuccess(res.code)) {
            this.dataSource = res.result.records
          }
        })
      },
      handleImport () {

      },
      handleDevice () {

      }
    }

  }
</script>
