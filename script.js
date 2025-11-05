// === CEK KONEKSI SCRIPT ===
console.log("✅ script.js berhasil terhubung!");

// === LOGIN ===
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Data Belum Lengkap",
        text: "Mohon isi email dan password terlebih dahulu!",
        confirmButtonColor: "#7b2ff7"
      });
      return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("Login berhasil:", userCredential.user);
        Swal.fire({
          icon: "success",
          title: "Login Berhasil!",
          text: "Selamat datang kembali 👋",
          showConfirmButton: false,
          timer: 1800,
          timerProgressBar: true
        }).then(() => {
          window.location.href = "dashboard.html";
        });
      })
      .catch((error) => {
        console.error("Login error:", error.message);
        Swal.fire({
          icon: "error",
          title: "Login Gagal!",
          text: "Email atau Password salah. Silahkan periksa kembali.",
          confirmButtonColor: "#ff3366"
        });
      });
  });
}

// === REGISTER ===
const registerBtn = document.getElementById("registerBtn");
if (registerBtn) {
  registerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value.trim();

    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Data Belum Lengkap",
        text: "Isi email dan password terlebih dahulu.",
        confirmButtonColor: "#7b2ff7"
      });
      return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Simpan data ke Firestore
        const db = firebase.firestore();
        return db.collection("users").doc(user.uid).set({
          email: user.email,
          role: "user",
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        })
    .then(() =>{
        Swal.fire({
          icon: "success",
          title: "Registrasi Berhasil!",
          text: "Akun kamu sudah dibuat, silakan login sekarang.",
          timer:1800,
          confirmButtonColor: false
        }).then(() => {
          window.location.href = "index.html";
        });
      })
      .catch((error) => {
        console.error("Register error:", error.message);
        Swal.fire({
          icon: "error",
          title: "Registrasi Gagal!",
          text: error.message,
          confirmButtonColor: "#ff3366"
        });
      });
  });
}

// === LOGOUT ===
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();

    firebase.auth().signOut()
      .then(() => {
        console.log("Logout berhasil!");
        Swal.fire({
          icon: "success",
          title: "Logout Berhasil",
          text: "Kamu sudah keluar dari akun.",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true
        }).then(() => {
          window.location.href = "index.html";
        });
      })
      .catch((error) => {
        console.error("Logout error:", error.message);
        Swal.fire({
          icon: "error",
          title: "Logout Gagal!",
          text: error.message,
          confirmButtonColor: "#ff3366"
        });
      });
  });
}
