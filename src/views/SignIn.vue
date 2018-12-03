<template>
  <div class="sign-in">
    <h1 class="title is-5">Sign in</h1>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script lang="ts">
import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class SignIn extends Vue {
  private mounted () {
    let ui = firebaseui.auth.AuthUI.getInstance()
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth())
    }
    ui.start('#firebaseui-auth-container', {
      signInFlow: 'redirect',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        {
          provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          defaultCountry: 'JP',
        },
      ],
      signInSuccessUrl: '/mypage',
    })
  }
}
</script>

<style scoped>
.sign-in {
  text-align: center;
}
</style>
