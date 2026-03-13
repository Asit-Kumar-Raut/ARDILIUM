import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAoV6a-45TG2LZFUmUSzUOWID_q5jx5Ob8",
  authDomain: "ardilium.firebaseapp.com",
  projectId: "ardilium",
  storageBucket: "ardilium.firebasestorage.app",
  messagingSenderId: "923918751511",
  appId: "1:923918751511:web:19f78ac8c763405f238952",
  measurementId: "G-LZ6K1N5JBY"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

window.firebaseAuth = auth;
window.firebaseDb = db;
window.firebaseSignOut = signOut;
window.firebaseFirestore = { collection, addDoc, getDocs, query, orderBy, serverTimestamp };

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  const loginForm = document.getElementById("login-form");
  const showLogin = document.getElementById("showLogin");
  const showRegister = document.getElementById("showRegister");

  const regName = document.getElementById("regName");
  const regEmail = document.getElementById("regEmail");
  const regPassword = document.getElementById("regPassword");
  const registerBtn = document.getElementById("registerBtn");
  const regError = document.getElementById("regError");

  const loginEmail = document.getElementById("loginEmail");
  const loginPassword = document.getElementById("loginPassword");
  const loginBtn = document.getElementById("loginBtn");
  const loginError = document.getElementById("loginError");

  showLogin?.addEventListener("click", () => {
    registerForm.style.display = "none";
    loginForm.style.display = "flex";
  });

  showRegister?.addEventListener("click", () => {
    loginForm.style.display = "none";
    registerForm.style.display = "flex";
  });

  registerBtn?.addEventListener("click", async () => {
    const name = regName.value.trim();
    const email = regEmail.value.trim();
    const password = regPassword.value.trim();

    if (!name || !email || !password) {
      regError.textContent = "Please fill in all fields.";
      return;
    }

    try {
      registerBtn.disabled = true;
      registerBtn.textContent = "Registering...";
      regError.textContent = "";

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update profile with name
      await updateProfile(userCredential.user, { displayName: name });
      
      handleAuthSuccess(name);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        regError.textContent = "Email already exists. Redirecting to login...";
        setTimeout(() => {
          registerForm.style.display = "none";
          loginForm.style.display = "flex";
          loginEmail.value = email;
          regError.textContent = "";
        }, 1500);
      } else {
        regError.textContent = error.message.replace("Firebase: ", "");
      }
      registerBtn.disabled = false;
      registerBtn.textContent = "Register";
    }
  });

  loginBtn?.addEventListener("click", async () => {
    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();

    if (!email || !password) {
      loginError.textContent = "Please fill in all fields.";
      return;
    }

    try {
      loginBtn.disabled = true;
      loginBtn.textContent = "Logging in...";
      loginError.textContent = "";

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const name = userCredential.user.displayName || email.split('@')[0];
      
      handleAuthSuccess(name);
    } catch (error) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        loginError.textContent = "Invalid email or password.";
      } else {
        loginError.textContent = error.message.replace("Firebase: ", "");
      }
      loginBtn.disabled = false;
      loginBtn.textContent = "Login";
    }
  });
});

function handleAuthSuccess(name) {
  localStorage.setItem("username", name);
  document.getElementById("auth-page").style.display = "none";
  document.getElementById("profile-selection").classList.remove("hidden");
  
  // Re-enable buttons if they go back
  const loginBtn = document.getElementById("loginBtn");
  if(loginBtn) {
    loginBtn.disabled = false;
    loginBtn.textContent = "Login";
  }
  const registerBtn = document.getElementById("registerBtn");
  if(registerBtn) {
    registerBtn.disabled = false;
    registerBtn.textContent = "Register";
  }
}
