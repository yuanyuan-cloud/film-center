<template>
  <div>
    <!-- <film-swiper :key="datalist.length">
      <film-swiper-item v-for="data in datalist" :key="data.id" class="filmswiperitem">
        <img :src="data.imgUrl">
      </film-swiper-item>
    </film-swiper> -->

    <film-header class="sticky"></film-header>

    <router-view></router-view>

  </div>

</template>
<script>
import filmHeader from '@/components/films/FilmHeader.vue'
import 'swiper/swiper-bundle.css'
import axios from 'axios'
export default {
  data () {
    return {
      datalist: []
    }
  },
  mounted () {
    axios.get('/banner.json').then(res => {
      this.datalist = res.data.banner
    })
  },
  components: {
    filmHeader
  }
}
</script>

<style lang="scss" scoped>
  .filmswiperitem{
    img{
      width: 100%;
    }
  }
  .sticky{
    position: sticky;
    top: 0px;
    background: white;
    z-index: 100;
  }
</style>
