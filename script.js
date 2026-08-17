import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";


// 🔥 Настройки нашего Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAugWXHGGTh_izIfxE_GCaVzZIBM6hVsWM",
    authDomain: "my-first-site-d47ad.firebaseapp.com",
    projectId: "my-first-site-d47ad",
    storageBucket: "my-first-site-d47ad.firebasestorage.app",
    messagingSenderId: "442377600402",
    appId: "1:442377600402:web:c92cda4c4ea0aef908d54b",
    measurementId: "G-QGVL1RGX6V"
};


// 🚀 Подключаем Firebase
const app = initializeApp(firebaseConfig);


// 🔐 Подключаем систему авторизации
const auth = getAuth(app);


// Находим кнопку регистрации
const registerButton = document.getElementById("registerButton");


// Проверяем, есть ли кнопка на странице
if (registerButton) {

    registerButton.addEventListener("click", async () => {

        // Получаем введённые данные
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const message = document.getElementById("message");


        // Проверяем, заполнены ли поля
        if (!email || !password) {
            message.textContent = "Заполни email и пароль.";
            return;
        }


        try {

            // Создаём аккаунт в Firebase
            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


            // Получаем созданного пользователя
            const user = userCredential.user;


            message.textContent =
                "🎉 Аккаунт успешно создан!";


            console.log("Пользователь:", user);

        } catch (error) {

            console.error(error);


            // Показываем понятную ошибку
            if (error.code === "auth/email-already-in-use") {

                message.textContent =
                    "Этот email уже зарегистрирован.";

            } else if (error.code === "auth/invalid-email") {

                message.textContent =
                    "Неверный email.";

            } else if (error.code === "auth/weak-password") {

                message.textContent =
                    "Пароль слишком слабый.";

            } else {

                message.textContent =
                    "Ошибка регистрации: " + error.message;
            }
        }

    });

}
