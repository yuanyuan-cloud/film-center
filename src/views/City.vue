<template>
  <div class="city">
    <van-index-bar :index-list="computedList" @select="handleChange">
    <div v-for="data in cityList" :key="data.type">
      <van-index-anchor :index="data.type" />
      <van-cell :title="item.name" v-for="item in data.list" :key="item.cityId" @click="handleClick(item)"/>
    </div>

</van-index-bar>
  </div>
</template>
<script>
import http from '@/util/http'
import { Toast } from 'vant'
import obj from '@/util/mixinObj'

export default {
  mixins: [obj],
  data () {
    return {
      cityList: []
    }
  },
  computed: {
    computedList () {
      return this.cityList.map(item => item.type)
    }
  },

  mounted () {
    http({
      url: '/gateway?k=9455892',
      headers: {
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then(res => {
      this.cityList = this.renderCity(res.data.data.cities)
    })
  },
  methods: {
    handleChange (data) {
      // console.log('change', data)
      Toast(data)
    },
    renderCity (list) {
      const letterList = []
      const cityList = []
      for (let i = 65; i < 91; i++) {
        letterList.push(String.fromCharCode(i))
      }

      letterList.forEach(letter => {
        const newList = list.filter(item => item.pinyin.substring(0, 1).toUpperCase() === letter)

        newList.length > 0 && cityList.push({
          type: letter,
          list: newList
        })
      })
      return cityList
    },
    handleClick (item) {
      this.$store.commit('changeCityName', item.name)
      this.$store.commit('changeCityId', item.cityId)
      this.$router.back()
    }
  }

}

</script>

<style lang="scss">
.van-toast--html, .van-toast--text{
    min-width: 30px;
  }
</style>
