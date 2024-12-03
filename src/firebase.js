import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyC7cxVZyNMLGJgZAV9VXjEnW5o3Yohf04Y',
  authDomain: 'online-casino-2ef89.firebaseapp.com',
  projectId: 'online-casino-2ef89',
  storageBucket: 'online-casino-2ef89.firebasestorage.app',
  messagingSenderId: '989139214113',
  appId: '1:989139214113:web:9b1bbd4ff1441d5c2ca860',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const db = getFirestore()

export { auth, db }