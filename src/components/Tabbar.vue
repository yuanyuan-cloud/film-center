<template>
  <footer>
<ul>
    <router-link to="/films" custom v-slot="{navigate,isActive}">
      <li @click="navigate" :class="isActive?'kerwinactive':''"><i class="iconfont icon-dianying1"></i>
      <span>电影</span>
      </li>
    </router-link>
    <router-link to="/cinemas" custom v-slot="{navigate,isActive}">
      <li @click="navigate" :class="isActive?'kerwinactive':''">
        <i class="iconfont icon-yingyuan"></i>
      <span>影院</span>
      </li>
    </router-link>
    <router-link to="/center" custom v-slot="{navigate,isActive}">
      <li @click="navigate" :class="isActive?'kerwinactive':''">
        <i class="iconfont icon-wode"></i>
      <span>我的</span>
      </li>
    </router-link>
  </ul>
  </footer>

</template>

<style lang="scss" scoped>
  footer{
    position: fixed;
    bottom: 0px;
    left: 0;
    width: 100%;
    height: 2.7222rem;
    background: white;
    z-index: 100;
    ul{
      display: flex;
      li{
        flex: 1;
        line-height: 1.3889rem;
        text-align: center;
        display: flex;
        flex-direction: column;
        i{
          font-size: 20px;
        }
        span{
          font-size: 16px;
        }
      }
    }
  }
  .kerwinactive{
    color:  red;
  }
</style>
