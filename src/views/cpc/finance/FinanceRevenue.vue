<template>
  <a-card :bordered="true" :body-style="{padding: '0'}">
    <div class="extra-wrapper" slot="extra">
      <div class="extra-item">
        <a>今日</a>
        <a>本周</a>
        <a>本月</a>
        <a>本年</a>
      </div>
      <a-range-picker :style="{width: '256px'}" />
    </div>
    <div class="revenue-wrapper">
      <a-row :gutter="24">
        <a-col :md="6" :sm="12">
          <a-card class="item">
            <div class="title">营收总额</div>
            <div class="">￥22222222</div>
          </a-card>
        </a-col>
        <a-col :md="4" :sm="12">
          <a-card class="item">
            <div class="title">有效服务数</div>
            <div class="">100000</div>
          </a-card>
        </a-col>
        <a-col :md="5" :sm="12">
          <a-card class="item">
            <div class="title">有效服务营收</div>
            <div class="">￥22222222</div>
          </a-card>
        </a-col>
        <a-col :md="4" :sm="12">
          <a-card class="item">
            <div class="title">无效服务数</div>
            <div class="">10000</div>
          </a-card>
        </a-col>
        <a-col :md="5" :sm="12">
          <a-card class="item">
            <div class="title">无效服务总额</div>
            <div class="">￥22222222</div>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <div class="services">
      <a-table rowKey="id" :columns="columns" :data-source="dataSource"></a-table>
    </div>
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      columns: [{
        title: '服务类别',
        align: 'center',
        width: 120,
        customRender () {
          return '营收额'
        }
      }, {
        title: '租金',
        align: 'center',
        width: 120,
        dataIndex: 'a'
      }, {
        title: '商品',
        align: 'center',
        width: 120,
        dataIndex: 'b'
      }, {
        title: '餐饮',
        align: 'center',
        width: 120,
        dataIndex: 'c'
      }, {
        title: '护理',
        align: 'center',
        width: 120,
        dataIndex: 'd'
      }, {
        title: '娱乐',
        align: 'center',
        width: 120,
        dataIndex: 'e'
      }, {
        title: '其他',
        align: 'center',
        width: 120,
        dataIndex: 'f'
      }],
      dataSource: [{}]
    }
  },
  created() {

  },
}
</script>

<style lang="less" scoped>
.extra-wrapper {
  line-height: 55px;
  padding-right: 24px;


  .extra-item {
    display: inline-block;
    margin-right: 24px;

    a {
      margin-left: 24px;
    }
  }
}
.revenue-wrapper{
  padding: 10px;
  .item{
    height: 120px;
  }
}
</style>
