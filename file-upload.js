import { getStorage, uploadBytesResumable, ref, getDownloadURL, uploadBytes } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";

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

const storage = getStorage();

var fbBucketName = 'files';

// get elements
var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('fileButton');


// listen for file selection
fileButton.addEventListener('change', function (e) {

  // what happened
  console.log('file upload event', e);

  // get file
  var file = e.target.files[0];
  const storageRef = ref(storage, file.name);

  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log(progress);
    uploader.setAttribute("value", progress);
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    alert("UPLOAD FAILED!");
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      document.getElementById('UPLOADED_FILE').textContent = (downloadURL)
      document.getElementById('UPLOADED_FILE').setAttribute("href", downloadURL);
      uploader.value = 0
    });
  }
);
});