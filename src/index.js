
import { initializeApp } from "firebase/app";
import {
  getFirestore, collection, getDocs,
  addDoc, deleteDoc, doc

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

// get collection data

getDocs(colRef)
  .then((snapshot) => {
    let salunifashion = []
    snapshot.docs.forEach((doc) => {
        salunifashion.push({ ...doc.data(),id: doc.id })  
  })
  console.log(salunifashion)
})
.catch((err) => {
    console.log(err.message)
});

//add items 

const addProducts = document.querySelector('.add')
addProducts.addEventListener('submit',(e) =>{
    e.preventDefault()

   addDoc(colRef, {
    Name: addProducts.name.value,
    Size: addProducts.size.value,
    Color:addProducts.color.value,
    Price:addProducts.price.value,

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