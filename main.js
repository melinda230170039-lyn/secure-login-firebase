import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword }
  from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const regEmail = document.getElementById("regEmail");
const regPass = document.getElementById("regPass");
const logEmail = document.getElementById("logEmail");
const logPass = document.getElementById("logPass");
const btnRegister = document.getElementById("btnRegister");
const btnLogin = document.getElementById("btnLogin");
const msg = document.getElementById("msg");

btnRegister.addEventListener("click", async () => {
  try {
    const user = await createUserWithEmailAndPassword(auth, regEmail.value, regPass.value);
    msg.textContent = "Registrasi berhasil: " + user.user.email;
  } catch (err) {
    msg.textContent = "Gagal registrasi: " + err.message;
  }
});

btnLogin.addEventListener("click", async () => {
  try {
    const user = await signInWithEmailAndPassword(auth, logEmail.value, logPass.value);
    msg.textContent = "Login berhasil sebagai: " + user.user.email;
  } catch (err) {
    msg.textContent = "Gagal login: " + err.message;
  }
});