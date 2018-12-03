<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a href="https://qiita.com/advent-calendar/2018/firebase" class="navbar-item" target="_blank">Advent Calendar 2018</a>

      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" :class="{ 'is-active': isActive }" @click="toggle">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" :class="{ 'is-active': isActive }">
      <div class="navbar-start">
        <router-link
          v-for="(item, index) in items"
          :key="index"
          :to="item.to"
          class="navbar-item"
        >
          {{ item.name }}
        </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link to="/signin" class="button is-primary" v-if="!$store.getters.isAuthenticated">
              <strong>Sign in</strong>
            </router-link>
            <router-link to="/mypage" class="button is-primary" v-if="$store.getters.isAuthenticated">
              <strong>Mypage</strong>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

export interface GlobalNaviItemType {
  name: string,
  to: string,
}

@Component
export default class GlobalNavi extends Vue {
  @Prop() private items!: GlobalNaviItemType[]
  private isActive = false

  private toggle () {
    this.isActive = !this.isActive
  }
}
</script>
