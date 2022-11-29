<template>
  <div>
    <van-nav-bar title="影院" ref="navbar" @click-left="handleLeft" @click-right="handleRight">
  <template #left>
    {{cityName}}<van-icon name="arrow-down"/>
  </template>
  <template #right>
    <van-icon name="search" size="28" color="black" />
  </template>
</van-nav-bar>
    <div class="box" :style="{
        height:height
        }">
      <ul>
      <li v-for="data in cinemaList" :key="data.cinemaId">
        <div class="left">
          <div class="cinema_name">{{data.name}}</div>
          <div class="cinema_text">{{data.address}}</div>
        </div>

        <div class="right cinema_name">
          <div style="color:#f58220;">￥{{data.lowPrice/100}}起</div>
        </div>
      </li>
    </ul>
    </div>
  </div>
</template>

<script>

import BetterScroll from 'better-scroll'
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  data () {
    return {
      height: '0px'
    }
  },
  computed: {
    ...mapState(['cinemaList', 'cityId', 'cityName'])
  },
  mounted () {
    this.height = document.documentElement.clientHeight - document.querySelector('footer').offsetHeight - this.$refs.navbar.$el.offsetHeight + 'px'

    if (this.cinemaList.length === 0) {
      this.getCinemaData(this.cityId).then(res => {
        this.$nextTick(() => {
          new BetterScroll('.box', {
            scrollbar: {
              fade: true
            }
          })
        })
      })
    } else {
      this.$nextTick(() => {
        new BetterScroll('.box', {
          scrollbar: {
            fade: true
          }
        })
      })
    }

    // http({
    //   url: `/gateway?cityId=${this.$store.state.cityId}&ticketFlag=1&k=1852264`,
    //   headers: {
    //     'X-Host': 'mall.film-ticket.cinema.list'
    //   }
    // }).then(res => {
    //   this.cinemaList = res.data.data.cinemas
    //   this.$nextTick(() => {
    //     new BetterScroll('.box', {
    //       scrollbar: {
    //         fade: true
    //       }
    //     })
    //   })
    // })
  },
  methods: {
    ...mapActions(['getCinemaData']),
    ...mapMutations(['clearCinema']),
    handleLeft () {
      this.$router.push('/city')
      this.clearCinema()
    },
    handleRight () {
      this.$router.push('/cinemas/search')
    }
  }
}
</script>

<style lang="scss" scoped>
li{
  padding: .8333rem;
  display: flex;
  justify-content: space-between;
  .left{
    width: 11.7778rem;
  }
  .cinema_name{
    font-size: 15px;
  }
  .cinema_text{
    color: #797d82;
    font-size: 12px;
    margin-top: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.box{
  overflow: hidden;
  position: relative;
}
</style>
