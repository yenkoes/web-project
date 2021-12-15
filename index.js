  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
  import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBIPDAixpsiweNQatqdXY9CsEZIQtRJZbs",
    authDomain: "login-page-js.firebaseapp.com",
    projectId: "login-page-js",
    storageBucket: "login-page-js.appspot.com",
    messagingSenderId: "701525897247",
    appId: "1:701525897247:web:d24cc7d48060580c1f252a",
    databaseURL: "https://login-page-js-default-rtdb.europe-west1.firebasedatabase.app",
    measurementId: "G-BHMN4J5CBV"
  };

  const firebase = initializeApp(firebaseConfig);

  const db = getDatabase();
  if (location.hostname === "localhost") {
    // Point to the RTDB emulator running on localhost.
    connectDatabaseEmulator(db, "localhost", 9000);
  } 

  const analytics = getAnalytics();
  const auth = getAuth();

  //signup function
  function signUp(){
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = createUserWithEmailAndPassword(auth, email.value, password.value);;
    //
    promise.catch(e=>alert(e.message));
    alert("SIGN UP SUCCESFUL");
  }

  //signIN function
  function signIn(){
    var email = document.getElementById("email");
    var password  = document.getElementById("password");
    const promise = signInWithEmailAndPassword(auth, email.value, password.value);
    promise.catch(e=>alert(e.message));
    
  }


  //signOut

  function signOut(){
    auth.signOut();
    alert("SIGNED OUT");
  }


  function save_data(user_uid, user_text){
    console.log(user_text);
    console.log(user_uid)
    set(ref(db, 'users/'+ user_uid +'/text_data'), user_text)
  }


  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      const email = user.email;

      get(ref(db, 'users/'+uid+'/text_data')).then((snapshot) => {
        if (snapshot.exists()) {
          document.getElementById('text_area').textContent = snapshot.val()
        } else {
          document.getElementById('text_area').textContent = ''
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });

      alert("CURRENTLY SIGNED IN: " + email)
      console.log(document.getElementById('currentuser').textContent);
      document.getElementById('currentuser').textContent = "SIGNED IN: " + email

      document.getElementById('save_text_area').addEventListener('click', function(){save_data(uid, document.getElementById('text_area').value);});
      // ...
    } else {
      // User is signed out
      // ...
      document.getElementById('text_area').textContent = ''
      document.getElementById('currentuser').textContent = "SIGNED IN: NO ONE"
      
    }
  });

  document.getElementById('sign_up').addEventListener('click', signUp);
  document.getElementById('sign_in').addEventListener('click', signIn);
  document.getElementById('sign_out').addEventListener('click', signOut);