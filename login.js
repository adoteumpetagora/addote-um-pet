/* ========================================
   LOGIN
======================================== */

const loginForm =
    document.getElementById("loginForm");

const emailInput =
    document.getElementById("email");

const senhaInput =
    document.getElementById("senha");

const mensagem =
    document.getElementById("mensagem");

const botaoEntrar =
    document.getElementById("botaoEntrar");

const mostrarSenha =
    document.getElementById("mostrarSenha");


/* ========================================
   MOSTRAR / OCULTAR SENHA
======================================== */

mostrarSenha.addEventListener(
    "click",
    () => {

        if (
            senhaInput.type === "password"
        ) {

            senhaInput.type = "text";

            mostrarSenha.textContent = "🙈";

        } else {

            senhaInput.type = "password";

            mostrarSenha.textContent = "👁";

        }

    }
);


/* ========================================
   LOGIN
======================================== */

loginForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        const email =
            emailInput.value.trim();

        const senha =
            senhaInput.value;


        mensagem.textContent = "";


        if (!email || !senha) {

            mensagem.textContent =
                "Preencha o e-mail e a senha.";

            return;

        }


        botaoEntrar.disabled = true;

        botaoEntrar.textContent =
            "Entrando...";


        try {

            const resultado =
                await auth.signInWithEmailAndPassword(
                    email,
                    senha
                );


            const usuario =
                resultado.user;


            /*
             * Verifica se existe cadastro
             * do administrador no Firestore.
             */

            const adminDoc =
                await db
                    .collection("admins")
                    .doc(usuario.uid)
                    .get();


            if (!adminDoc.exists) {

                await auth.signOut();

                mensagem.textContent =
                    "Este usuário não possui permissão de administrador.";

                botaoEntrar.disabled = false;

                botaoEntrar.textContent =
                    "Entrar no painel";

                return;
            }


            const adminData =
                adminDoc.data();


            if (
                adminData.ativo === false
            ) {

                await auth.signOut();

                mensagem.textContent =
                    "Esta conta de administrador está desativada.";

                botaoEntrar.disabled = false;

                botaoEntrar.textContent =
                    "Entrar no painel";

                return;
            }


            /* LOGIN AUTORIZADO */

            window.location.href =
                "admin.html";


        } catch (error) {

            console.error(
                "Erro no login:",
                error
            );


            switch (error.code) {

                case "auth/invalid-email":

                    mensagem.textContent =
                        "Digite um e-mail válido.";

                    break;


                case "auth/user-not-found":

                case "auth/wrong-password":

                case "auth/invalid-credential":

                    mensagem.textContent =
                        "E-mail ou senha incorretos.";

                    break;


                case "auth/too-many-requests":

                    mensagem.textContent =
                        "Muitas tentativas. Tente novamente mais tarde.";

                    break;


                default:

                    mensagem.textContent =
                        "Não foi possível realizar o login.";

            }


            botaoEntrar.disabled = false;

            botaoEntrar.textContent =
                "Entrar no painel";

        }

    }
);