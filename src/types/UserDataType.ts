import firebase from 'firebase/app'

export default interface UserDataType {
  createdAt?: firebase.firestore.FieldValue
  updatedAt?: firebase.firestore.FieldValue
  profile?: string
}
