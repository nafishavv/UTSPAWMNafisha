import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import{getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyDKvh440PIvpdh47YQZeCWlJdGvln_Ez-s",
    authDomain: "simul8-physics.firebaseapp.com",
    projectId: "simul8-physics",
    storageBucket: "simul8-physics.firebasestorage.app",
    messagingSenderId: "568159205563",
    appId: "1:568159205563:web:5ad2990b830732bb25119e",
    measurementId: "G-SSL5LWNNL0"
  };
 
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth=getAuth();
  const db=getFirestore();

  onAuthStateChanged(auth, (user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData=docSnap.data();
                const fullName = userData.firstName + " " + userData.lastName;
          
                // Update the profile page with full name and email
                document.getElementById('loggedUserName').innerText = fullName;
                document.getElementById('loggedUserEmail').innerText = userData.email;

            }
            else{
                console.log("no document found matching id")
            }
        })
        .catch((error)=>{
            console.log("Error getting document");
        })
    }
    else{
        console.log("User Id not Found in Local storage")
    }
  })