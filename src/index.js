
import { initializeApp } from "firebase/app";
import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc, 
  query, where,
  orderBy, serverTimestamp,
  getDoc

} from 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDLa_nr_0c0kudQSzcGV5hkwq3WH2bRGgo",
    authDomain: "freidea-pos.firebaseapp.com",
    projectId: "freidea-pos",
    storageBucket: "freidea-pos.appspot.com",
    messagingSenderId: "317401437770",
    appId: "1:317401437770:web:2657a877ea9fe88cf878b3",
    measurementId: "G-M8RF0RL2FP"
  }

initializeApp(firebaseConfig);

// init services

const db = getFirestore();

// collection ref 

const colRef = collection(db, 'Saluni-fashion')

// queries

const q = query(colRef, orderBy('Price','desc'))  // , where("Name","==","Bhathiya")

// real time collection data

onSnapshot(q, (snapshot) => {
  let salunifashion =[]
  snapshot.docs.forEach((docs) => {
salunifashion.push({...docs.data(), id: docs.id })
  })
  console.log(salunifashion)
})

//add items 

const addProducts = document.querySelector('.add')
addProducts.addEventListener('submit',(e) => {
    e.preventDefault()

   addDoc(colRef, {
    Name: addProducts.name.value,
    Size: addProducts.size.value,
    Color:addProducts.color.value,
    Price:addProducts.price.value,
    Created: serverTimestamp()

   })
   .then(() => {
    addProducts.reset();
   })

})

//delete items 

const deleteProducts = document.querySelector('.delete')
deleteProducts.addEventListener('submit',(e) =>{
    e.preventDefault()

  const docRef = doc(db, 'Saluni-fashion', deleteProducts.id.value)

  deleteDoc(docRef)
  .then(() => {
  deleteProducts.reset()
})
})

// get a single document

// const docRef = doc(db, 'saluni-fashion','3kHVyMlEtdtXFTJBs8kC')
// getDoc(docRef)
// .then((doc) => {
//   console.log(doc.data(), doc.id)
// })

onSnapshot(docRef, ()=> {
  console.log(docRef.data(), doc.id)
})