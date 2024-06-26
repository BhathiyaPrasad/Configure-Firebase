
import { initializeApp } from "firebase/app";
import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc,
  query, where,
  orderBy, serverTimestamp,
  getDoc,
  updateDoc
} from 'firebase/firestore'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
 // paste here your firebase configuration 
}

initializeApp(firebaseConfig);

// init services

const db = getFirestore();
const auth = getAuth();

// collection ref 

const colRef = collection(db, 'Saluni-fashion')

// queries

const q = query(colRef, orderBy('Price', 'desc'))  // , where("Name","==","Bhathiya")

// real time collection data

onSnapshot(q, (snapshot) => {
  let salunifashion = []
  snapshot.docs.forEach((docs) => {
    salunifashion.push({ ...docs.data(), id: docs.id })
  })
  console.log(salunifashion)
})

//add items 

const addProducts = document.querySelector('.add')
addProducts.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    Name: addProducts.name.value,
    Size: addProducts.size.value,
    Color: addProducts.color.value,
    Price: addProducts.price.value,
    Created: serverTimestamp()

  })
    .then(() => {
      addProducts.reset();
    })

})

//delete items 

const deleteProducts = document.querySelector('.delete')
deleteProducts.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'Saluni-fashion', deleteProducts.id.value)

  deleteDoc(docRef)
    .then(() => {
      deleteProducts.reset()
    })
})

// get a single document

const docRef = doc(db, 'Saluni-fashion', 'igXXMo1GOSPv17AOGpx5')
// getDoc(docRef)
// .then((doc) => {
//   console.log(doc.data(), doc.id)
// })

onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id)
})


const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'Saluni-fashion', updateForm.id.value)

  updateDoc(docRef, {
    Name: 'update name'
  })
    .then(() => {
      updateForm.reset()
    })
})

// attach the sign in form

const singupForm = document.querySelector('.signup')
singupForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = singupForm.email.value       //grab the values for email andd password from frontend
  const password = singupForm.password.value

  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log("User Created:", cred.user)     //you must change permission in ( authentication -> settings -> Authorized domains ) Type your local or hosted domain here
      singupForm.reset()

    })

    .catch((err) => {
      console.log(err.message)
    })
})

// attach the log  out button 


const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', (e) => {
  signOut(auth)
    .then(() => {
      console.log('User logged out')
    })
    .catch((err) => {
      console.log(err.message)
    })
})



// attache the log in from

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const email = loginForm.email.value
  const password = loginForm.password.value


  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log("User Logged In:", cred.user)
    })
    .catch((err) => {
      console.log(err.message)
    })


})

// subscribing to auth changes

onAuthStateChanged(auth, (user) => {
    console.log('User Status Changed:', user.email) 
})

