import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBlWfaDbJgbKCsKpfdPxXqNglGU9r293Ko",
    authDomain: "techplus-78b27.firebaseapp.com",
    projectId: "techplus-78b27",
    storageBucket: "techplus-78b27.appspot.com",
    messagingSenderId: "7406953924",
    appId: "1:7406953924:web:149465b93b1b4ba0e93091"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginSenha').value;

    try {
        // Autentique o usuário usando o Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;

        console.log("Usuário logado:", user);
        // Realize outras ações após o login bem-sucedido
    } catch (error) {
        if (error.code === 'auth/user-not-found') {
            console.error("Email não encontrado:", error.message);
        } else if (error.code === 'auth/wrong-password') {
            console.error("Senha incorreta:", error.message);
        } else {
            console.error("Erro ao fazer login:", error.message);
        }
    }

    // Limpe o formulário após a tentativa de login
    loginForm.reset();
});

