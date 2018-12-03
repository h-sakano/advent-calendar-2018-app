<template>
  <div class="my-page">
    <h1 class="title is-6">Hello, {{displayName}}.</h1>
    <button class="button is-primary" @click="signOut">
      <strong>Sign out</strong>
    </button>
  </div>
</template>

<script lang="ts">
import firebase from 'firebase/app'
import 'firebase/auth'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class MyPage extends Vue {
  private signOut () {
    this.$store.dispatch('signOut')
    this.$router.push('/')
  }

  get displayName (): string {
    return this.$store.getters.user.displayName || 'Nameless'
  }
}
</script>

<style scoped>
.my-page {
  text-align: center;
}
</style>
