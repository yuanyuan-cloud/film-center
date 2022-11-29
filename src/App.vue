<template>
  <div>
    <tabbar ref="mytabbar" v-show="$store.state.isTabbarShow"></tabbar>
    <section>
      <router-view></router-view>
    </section>
  </div>

</template>

<script>
import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import tabbar from '@/components/Tabbar.vue'

Vue.use(Vant)
export default {
  data () {
    return {

    }
  },
  components: {
    tabbar
  }
}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
html,body{
  height: 100%;
}
ul,li{
  list-style: none;
}
section{
  padding-bottom: 2.7222rem;
}

</style>
