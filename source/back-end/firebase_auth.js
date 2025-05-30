// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
  import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
  import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBk0-qTEAELxs-YacV9e2SpUquXecbQlyc",
    authDomain: "xhibit-fair-backend.firebaseapp.com",
    projectId: "xhibit-fair-backend",
    storageBucket: "xhibit-fair-backend.firebasestorage.app",
    messagingSenderId: "228592064885",
    appId: "1:228592064885:web:4d030a37ec8c35cc4f5b3c",
    measurementId: "G-Y4ZR0C8B3G"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
      messageDiv.style.opacity=0;
    }, 5000);
  }
  const register=document.getElementById('register-btn');
  register.addEventListener('click', (event) => {
    event.preventDefault();
    const fullName=document.getElementById('fullname').value;
    const gender=document.getElementById('gender').value;
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;

    const auth=getAuth();
    const db=getFirestore();
    
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user=userCredential.user;
      const userData={
        fullName: fullName,
        gender: gender,
        email: email
      };
      showMessage('Tài khoản được tạo thành công', 'registerMessage');
      const docRef=doc(db, "users", user.uid);
      setDoc(docRef, userData)
      .then(() => {
        window.location.href='../html/login.html';
      })
      .catch((error) => {
        console.error('Lỗi ghi tài liệu', error)
      });
    })
    .catch((error) => {
      const errorCode=error.code;
      if(errorCode=='auth/email-already-in-use'){
        showMessage('Email đã tồn tại!', 'registerMessage');
      }
      else{
        showMessage('Không thể tạo tài khoản', 'registerMessage');
      }
    })
  });

  const signIn=document.getElementById('login-btn');
  signIn.addEventListener('click', (event) => {
    event.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const auth=getAuth();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      showMessage('Đăng nhập thành công', 'loginMessage');
      const user=userCredential.user;
      localStorage.setItem('loggedInUserId', user.uid);
      window.location.href='index.html';
    })
    .catch((error) => {
      const errorCode=error.code;
      if(errorCode=='auth/invalid-credential'){
        showMessage('Email hoặc Mật khẩu sai', 'loginMessage');
      }
      else{
        showMessage('Tài khoản không tồn tại', 'loginMessage');
      }
    })
  })