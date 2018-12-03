<template>
  <div class="my-page">
    <div class="container">
      <div class="greeting">
        <h1 class="title is-6">Hello, {{displayName}}.</h1>
      </div>
      <div class="field">
        <label class="label">Image</label>
        <div class="control">
          <div class="file has-name">
            <label class="file-label">
              <input class="file-input" type="file" name="file" accept='image/*' @change.prevent="selectFile">
              <span class="file-cta">
                <span class="file-label">
                  Choose
                </span>
              </span>
              <span class="file-name">
                {{ selectedImageFileName }}
              </span>
            </label>
          </div>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-link" @click="saveImage">Save Image</button>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <img :src="imageUrl" class="image">
        </div>
      </div>
      <div class="field">
        <label class="label">Profile</label>
        <div class="control">
          <textarea class="textarea" placeholder="Enter your profile" v-model="profile"></textarea>
        </div>
      </div>
      <div class="field">
        <label class="label">Preview</label>
        <div class="control">
          <div v-html="sanitizedProfile" class="preview"></div>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-link" @click="saveProfile">Save Profile</button>
        </div>
      </div>
      <button class="button is-primary" @click="signOut">
        <strong>Sign out</strong>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/functions'
import 'firebase/storage'
import _ from 'lodash'
import firestore from '@/firestore'
import { Component, Vue, Watch } from 'vue-property-decorator'
import UserDataType from '@/types/UserDataType'

@Component
export default class MyPage extends Vue {
  private profile: string = ''
  private debouncedSanitize: any = null
  private sanitizedProfile: string = ''
  private selectedFile: any = null
  private imageUrl: string = ''

  private created () {
    this.debouncedSanitize = _.debounce(this.updateSanitizedProfile, 500)

    firestore.collection('users').doc(this.$store.getters.user.uid).get()
    .then((doc) => {
      const userData = doc.data()
      if (doc && userData) {
        this.profile = userData.profile
        this.imageUrl = userData.imageUrl
      }
    })
  }

  private saveProfile () {
    firestore.collection('users').doc(this.$store.getters.user.uid).update({
      profile: this.profile,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      alert('Document successfully updated!')
    })
  }

  private signOut () {
    this.$store.dispatch('signOut')
    this.$router.push('/')
  }

  private selectFile (e: any): void {
    this.selectedFile = e.target.files[0]
  }

  private saveImage () {
    const storageRef = firebase.storage().ref()
    if (this.selectedFile) {
      const imageRef = storageRef.child(`${this.$store.getters.user.uid}/${this.selectedImageFileName}`)
      imageRef.put(this.selectedFile)
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          this.imageUrl = downloadURL
          firestore.collection('users').doc(this.$store.getters.user.uid).update({
            imageUrl: downloadURL,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          })
        })
      })
    }
  }

  private async updateSanitizedProfile () {
    const sanitizeFunc = firebase.functions().httpsCallable('sanitize')
    const response = await sanitizeFunc({ text: this.profile })
    this.sanitizedProfile = response.data.sanitizedText
  }

  get displayName (): string {
    return this.$store.getters.user.displayName || 'Nameless'
  }

  get selectedImageFileName (): string {
    if (this.selectedFile) {
      return this.selectedFile.name
    }
    return '...'
  }

  @Watch('profile')
  private watchProfile (val: string, oldVal: string) {
    this.debouncedSanitize()
  }
}
</script>

<style scoped>
.greeting {
  text-align: center;
}
.preview {
  height: 300px;
  overflow: scroll;
  border: solid 1px #aaa;
  border-radius: 3px;
  padding: 10px;
}
.image {
  max-width: 300px;
  max-height: 300px;
}
</style>
