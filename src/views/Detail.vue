<template>
  <div v-if="filmInfo">
    <detail-header v-scroll="10">
      {{filmInfo.name}}
    </detail-header>
    <div :style="{
      backgroundImage:'url('+filmInfo.poster+')'
      }" class="poster"></div>

    <div class="content">
      <!-- 简介 -->
      <div>{{filmInfo.name}}</div>
      <div>
        <div class="detail-text">{{filmInfo.category}}</div>
        <div class="detail-text">{{filmInfo.premiereAt | dateFilter}}</div>
        <div class="detail-text">{{filmInfo.nation}} | {{filmInfo.runtime}}分钟</div>
        <div class="detail-text" style="line-height:15px;" :class="isHidden?'hidden':''">{{filmInfo.synopsis}}</div>

        <div style="text-align:center;"><i class="iconfont" @click="isHidden=!isHidden" :class="isHidden?'icon-moreunfold':'icon-less'"></i></div>
      </div>
      <!-- 演职人员 -->
    <div>
      <div>演职人员</div>
      <detail-swiper :perview="3.5" name="actors">
        <detail-swiper-item v-for="(data,index) in filmInfo.actors" :key="index">
          <div
            :style="{
              backgroundImage: 'url(' + data.avatarAddress + ')',
              }"
              class="avatar"
          >
          </div>
          <div style="text-align:center;font-size:12px">{{data.name}}</div>
          <div style="text-align:center;font-size:13px">{{data.role}}</div>
          </detail-swiper-item>

      </detail-swiper>
    </div>

    <!-- 剧照 -->
    <div>
      <div>剧照</div>
      <detail-swiper :perview="2" name="photos">
        <detail-swiper-item v-for="(data,index) in filmInfo.photos" :key="index">
          <div
            :style="{
              backgroundImage: 'url(' + data + ')',
              }"
              class="avatar"
              @click="handlePreview(index)"
          >
          </div>
          </detail-swiper-item>

      </detail-swiper>
    </div>

    </div>

  </div>
</template>

<script>
import http from '@/util/http'
import obj from '@/util/mixinObj'
import moment from 'moment'
import Vue from 'vue'
import detailHeader from '@/components/detail/DetailHeader'
import detailSwiper from '@/components/detail/DetailSwiper.vue'
import detailSwiperItem from '@/components/detail/DetailSwiperItem.vue'
import { ImagePreview } from 'vant'

Vue.filter('dateFilter', (date) => {
  return moment(date * 1000).format('YYYY-MM-DD')
})
Vue.directive('scroll', {
  inserted (el, binding) {
    el.style.display = 'none'
    window.onscroll = () => {
      if ((document.documentElement.scrollTop || document.body.scrollTop) > binding.value) {
        el.style.display = 'block'
      } else {
        el.style.display = 'none'
      }
    }
  },
  unbind () {
    window.onscroll = null
  }
})
export default {
  mixins: [obj],
  data () {
    return {
      filmInfo: null,
      isHidden: true
    }
  },
  components: {
    detailSwiper,
    detailSwiperItem,
    detailHeader
  },
  methods: {
    handlePreview (index) {
      ImagePreview({
        images: this.filmInfo.photos,
        startPosition: index
      })
    }
  },
  mounted () {
    http({
      url: `/gateway?filmId=${this.$route.params.id}&k=2511461`,
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res => {
      this.filmInfo = res.data.data.film
    })
  }
}
</script>

<style lang="scss" scoped>
.poster{
  width: 100%;
  height: 11.6667rem;
  background-position: center;
  background-size: cover;
}
.content{
  padding: .8333rem;
  .detail-text{
    color: #797d82;
    font-size: 13px;
    margin-top: .2222rem;
  }
}
.hidden{
  overflow: hidden;
  height: 1.6667rem;
}
.avatar{
  width: 100%;
  height: 4.7222rem;
  background-position: center;
  background-size: cover;
}
</style>
