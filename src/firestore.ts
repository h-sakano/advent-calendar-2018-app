import firebase from 'firebase/app'
import 'firebase/firestore'

const firestore = firebase.firestore()
const settings = {
  timestampsInSnapshots: true,
}
firestore.settings(settings)

export default firestore
