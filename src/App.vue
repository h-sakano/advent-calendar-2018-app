<template>
  <div id="app">
    <global-navi :items="globalNaviItems"/>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import GlobalNavi, { GlobalNaviItemType } from '@/components/GlobalNavi.vue'

@Component({
  components: {
    GlobalNavi,
  },
})
export default class App extends Vue {
  private globalNaviItems: GlobalNaviItemType[] = [
    { name: 'Home', to: '/' },
    { name: 'About', to: '/about' },
  ]
}
</script>

<style lang="scss">
@import 'bulma/bulma.sass';

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
