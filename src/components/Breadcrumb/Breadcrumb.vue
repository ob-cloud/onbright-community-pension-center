<script>
export default {
  props: {
    action: {
      type: Boolean,
      default: true
    },
    actionFn: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      // routeList: []
    }
  },
  computed: {
    routeList() {
      const routes = this.$route.matched.slice(1)
      const breadcrumb = routes.map(route => {
        return {
          path: route.path,
          breadcrumbName: route.meta.title
        }
      })
      return breadcrumb
    }
  },
  methods: {
    goback () {
      this.$store.dispatch('ToggleMultiTab', true)
      // this.$multiTab.close(this.$route.path)
      this.$router.go(-1)
    },
    reload () {
      this.$router.replace({
        path: '/refresh'
      })
      // this.$router.replace({path: this.$route.fullPath, query: {...this.$route.query, t: Date.now()}})
    },
    visitLink (link) {
      this.$store.dispatch('ToggleMultiTab', true)
      this.$router.push(link)
    },
    confirm () {
      this.actionFn && this.actionFn()
      this.$events.$emit('ok', this)
    },
    cancel () {
      this.goback()
      this.$events.$emit('cancel')
    },
    itemRender ({route, routes}) {
      // <router-link to={route.path}>{route.breadcrumbName}</router-link>
      return routes.indexOf(route) === routes.length - 1 ? (
        <span>{route.breadcrumbName}</span>
      ) : (
         <span style="cursor: pointer;" {...{on: {click: this.visitLink.bind(this, route.path)}}}>{route.breadcrumbName}</span>
      )
    },
    renderOperator () {
      const action = (
        <div class="operator">
          <a-button type="primary" size="small" {...{on: {click: this.confirm}}}>确认</a-button>
          <a-button size="small" {...{on: {click: this.goback}}}>取消</a-button>
        </div>
      )
      const noaction = (
        <div class="operator">
          <a-button shape="circle" icon="left" size="small" {...{on: {click: this.goback}}} />
          <a-button shape="circle" icon="reload" size="small" {...{on: {click: this.reload}}} />
        </div>
      )
      return (this.action ? action : noaction)
    },
  },
  render () {
    return (
      <div class="breadcrumb">
        <div class="breadcrumb-wrapper">
          <a-breadcrumb routes={this.routeList} itemRender={this.itemRender}></a-breadcrumb>
          {this.renderOperator()}
        </div>
      </div>
    )
  },
}
</script>

<style lang="less" scoped>
.breadcrumb{
  position: fixed;
  width: 100%;
  height: 41px;
  z-index: 9;
  background: #fff;
  padding: 10px 20px;
  margin: -23px -24px 24px -24px;

  .breadcrumb-wrapper{
    position: relative;
  }

  .operator{
    position: fixed;
    right: 40px;
    margin: -23px -24px 24px -24px;

    button{
      margin-left: 5px;
    }
  }
}
</style>
