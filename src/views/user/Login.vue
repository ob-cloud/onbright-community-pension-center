<script>
import SimpleLogin from './components/SimpleLogin'
export default {
  name: 'Login',
  components: { SimpleLogin },
  beforeCreate () {
    require('./components/login.less')
  },
  render () {
    return (
      <div class="main">
        <SimpleLogin></SimpleLogin>
      </div>
    )
  },
}
</script>
