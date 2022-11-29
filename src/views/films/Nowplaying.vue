<template>
  <div>
    <van-list
  v-model="loading"
  :finished="finished"
  finished-text="我是有底线的"
  @load="onLoad"
  :immediate-check="false"
>
      <van-cell
       v-for="data in datalist" :key="data.filmId" @click="handleChangePage(data.filmId)">
        <img :src="data.poster"/>
        <div>
          <div class="title">{{data.name}}</div>
          <div class="content">
            <div :class="data.grade?'':'hidden'">观众评分:<span style="color:#f58220">{{data.grade}}</span></div>
            <div class="actors">主演: {{data.actors | actorsFilter}}</div>
            <div>
              {{data.nation}} | {{data.runtime}}分钟
            </div>
          </div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>
<script>
import Vue from 'vue'
import http from '@/util/http'
Vue.filter('actorsFilter', (data) => {
  if (data === undefined) return '暂无主演'
  return data.map(item => item.name).join(' ')
})
export default {
  data () {
    return {
      datalist: [],
      loading: false,
      finished: false,
      current: 1,
      total: 0
    }
  },
  mounted () {
    http({
      url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=1&pageSize=10&type=1&k=4173651`,
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      this.datalist = res.data.data.films
      this.total = res.data.data.total
    })
  },
  methods: {
    onLoad () {
      if (this.datalist.length === this.total && this.total !== 0) {
        this.finished = true
        return
      }
      this.current++
      http({
        url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=${this.current}&pageSize=10&type=1&k=4173651`,
        headers: {
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        this.datalist = [...this.datalist, ...res.data.data.films]
        this.loading = false
      })
    },
    handleChangePage (id) {
      this.$router.push({
        name: 'kerwinDetail',
        params: {
          id
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.van-list{
  .van-cell{
    overflow: hidden;
    padding: .8333rem;
    img{
      width: 3.6667rem;
      float:left;
    }
    .title{
      font-size: 16px;
    }
    .content{
      font-size: 13px;
      color: gray;
      .actors{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 11.1111rem;
      }
    }
  }
}
.hidden{
  visibility: hidden;
}
</style>
