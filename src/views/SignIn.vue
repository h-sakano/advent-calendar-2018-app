<template>
  <div class="sign-in">
    <h1 class="title is-5">Sign in</h1>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script lang="ts">
import firebase from 'firebase/app'
import 'firebase/auth'
import firestore from '@/firestore'
import firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { Component, Vue } from 'vue-property-decorator'
import UserDataType from '@/types/UserDataType'

@Component
export default class SignIn extends Vue {
  private mounted () {
    let ui = firebaseui.auth.AuthUI.getInstance()
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth())
    }
    ui.start('#firebaseui-auth-container', {
      callbacks: {
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
          this.saveUser(authResult.user)
          .then(() => {
            this.$router.push('/mypage')
          })
          return false
        },
      },
      signInFlow: 'redirect',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        {
          provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          defaultCountry: 'JP',
        },
      ],
    })
  }

  private async saveUser (user: firebase.User) {
    const userRef = firestore.collection('users').doc(user.uid)
    const userDoc = await userRef.get()
    const userData: UserDataType = {}

    if (!userDoc.exists) {
      userData.createdAt = firebase.firestore.FieldValue.serverTimestamp()
    }
    userRef.set(userData, { merge: true })
  }
}
</script>

<style scoped>
.sign-in {
  text-align: center;
}
</style>
