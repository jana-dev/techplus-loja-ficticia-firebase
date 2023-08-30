//usando o authenticator

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

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
const database = getDatabase(app);

//identificando o form
const form = document.getElementById('cadastroForm');

form.addEventListener('submit', async function (event) { //aqui usamos async de assíncrona, para poder utilizar o await mais adiante
    event.preventDefault(); // Evita o envio tradicional do formulário, permitindo que o código a seguir seja executado sem recarregar a página

    const cpf = document.getElementById('cpf').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try { //o bloco try é usado para envolver um trecho de código onde você espera que possam ocorrer erros.
        // Crie a conta de usuário usando o Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, senha); // Cria um usuário usando email e senha e aguarda a conclusão para seguir com o código
        const user = userCredential.user; // Obtém o objeto de usuário do resultado da criação

        // Salve informações adicionais no banco de dados associadas ao usuário
        const usersRef = ref(database, 'users'); // Cria uma referência ao nó 'users' no Realtime Database
        const newUserRef = push(usersRef, user.uid); // Cria um novo nó com uma chave única baseada no UID do usuário
        set(newUserRef, {
            cpf: cpf,
            email: email
        }); // Define os dados de CPF e Email no novo nó do usuário


        console.log("Usuário cadastrado:", user);
        // Realize outras ações após o cadastro bem-sucedido
    } catch (error) { //O bloco catch é usado para capturar e tratar erros que podem ocorrer dentro do bloco try.
        console.error("Erro ao cadastrar usuário:", error);
    }

    // Limpe o formulário após o envio
    form.reset();
});
