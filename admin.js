/* ========================================
   PROTEÇÃO DO PAINEL
======================================== */

auth.onAuthStateChanged(async (user) => {

    if (!user) {

        window.location.href = "login.html";

        return;
    }


    try {

        const adminDoc =
            await db
                .collection("admins")
                .doc(user.uid)
                .get();


        if (!adminDoc.exists) {

            await auth.signOut();

            window.location.href =
                "login.html";

            return;
        }


        const adminData =
            adminDoc.data();


        if (adminData.ativo === false) {

            await auth.signOut();

            window.location.href =
                "login.html";

            return;
        }


        /*
         * Usuário autorizado.
         * O restante do admin.js pode funcionar.
         */

        console.log(
            "Administrador autenticado:",
            user.email
        );


    } catch (error) {

        console.error(
            "Erro ao verificar administrador:",
            error
        );

        await auth.signOut();

        window.location.href =
            "login.html";
    }

});

/* ========================================
   DADOS INICIAIS
======================================== */

let animals = [
    {
        id: 1,
        name: "Thor",
        age: "2 anos",
        gender: "Macho",
        type: "Cachorro",
        image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80",
        description: "Carinhoso, brincalhão e muito amigável."
    },

    {
        id: 2,
        name: "Luna",
        age: "1 ano",
        gender: "Fêmea",
        type: "Gato",
        image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=600&q=80",
        description: "Uma gatinha tranquila e muito carinhosa."
    },

    {
        id: 3,
        name: "Bidu",
        age: "3 anos",
        gender: "Macho",
        type: "Cachorro",
        image: "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=600&q=80",
        description: "Companheiro, alegre e cheio de energia."
    },

    {
        id: 4,
        name: "Mel",
        age: "1 ano",
        gender: "Fêmea",
        type: "Coelho",
        image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=600&q=80",
        description: "Doce, calma e muito delicada."
    },

    {
        id: 5,
        name: "Amora",
        age: "2 anos",
        gender: "Fêmea",
        type: "Cachorro",
        image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80",
        description: "Amorosa e ótima companhia para famílias."
    },

    {
        id: 6,
        name: "Mingau",
        age: "2 anos",
        gender: "Macho",
        type: "Gato",
        image: "https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=600&q=80",
        description: "Um gato independente, mas muito carinhoso."
    }
];


let requests = [

    {
        id: 1,
        animal: "Thor",
        animalId: 1,
        adopter: "Maria",
        city: "Goiânia - GO",
        date: "16/09/2025",
        status: "Pendente"
    },

    {
        id: 2,
        animal: "Luna",
        animalId: 2,
        adopter: "Pedro",
        city: "Aparecida de Goiânia",
        date: "15/09/2025",
        status: "Pendente"
    },

    {
        id: 3,
        animal: "Mingau",
        animalId: 6,
        adopter: "Ana",
        city: "Goiânia",
        date: "14/09/2025",
        status: "Aprovada"
    },

    {
        id: 4,
        animal: "Mel",
        animalId: 4,
        adopter: "Lucas",
        city: "Trindade",
        date: "13/09/2025",
        status: "Pendente"
    }

];


/* ========================================
   ELEMENTOS
======================================== */

const menuItems =
    document.querySelectorAll(".menu-item");

const sections =
    document.querySelectorAll(".page-section");

const pageTitle =
    document.getElementById("pageTitle");


/* ========================================
   NAVEGAÇÃO
======================================== */

function showSection(sectionName) {

    sections.forEach(section => {
        section.classList.remove("active");
    });

    menuItems.forEach(item => {
        item.classList.remove("active");
    });


    const selectedSection =
        document.getElementById(sectionName);

    const selectedMenu =
        document.querySelector(
            `.menu-item[data-section="${sectionName}"]`
        );


    if (selectedSection) {
        selectedSection.classList.add("active");
    }

    if (selectedMenu) {
        selectedMenu.classList.add("active");
    }


    const titles = {

        dashboard: "Dashboard",

        animais: "Animais cadastrados",

        adicionar: "Adicionar animal",

        solicitacoes: "Solicitações de adoção",

        remover: "Remover animal"

    };


    pageTitle.textContent =
        titles[sectionName] || "Painel Admin";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


menuItems.forEach(item => {

    item.addEventListener("click", () => {

        const section =
            item.dataset.section;

        showSection(section);

    });

});


/* BOTÕES QUE LEVAM PARA OUTRAS SEÇÕES */

document
    .querySelectorAll("[data-section-button]")
    .forEach(button => {

        button.addEventListener("click", () => {

            showSection(
                button.dataset.sectionButton
            );

        });

    });


/* ========================================
   RENDERIZAR ANIMAIS
======================================== */

function renderAnimals(search = "") {

    const grid =
        document.getElementById("animalsGrid");

    const filteredAnimals =
        animals.filter(animal =>
            animal.name
                .toLowerCase()
                .includes(search.toLowerCase())
        );


    grid.innerHTML = "";


    if (filteredAnimals.length === 0) {

        grid.innerHTML = `
            <div class="empty-message">
                Nenhum animal encontrado.
            </div>
        `;

        return;
    }


    filteredAnimals.forEach(animal => {

        const card =
            document.createElement("article");

        card.className = "animal-card";

        card.innerHTML = `

            <img
                src="${animal.image}"
                alt="${animal.name}"
            >

            <div class="animal-content">

                <h3>${animal.name}</h3>

                <div class="animal-meta">
                    ${animal.age} •
                    ${animal.gender} •
                    ${animal.type}
                </div>

                <p class="animal-description">
                    ${animal.description}
                </p>

                <div class="animal-actions">

                    <button
                        class="edit-button"
                        onclick="editAnimal(${animal.id})"
                    >
                        Editar
                    </button>

                    <button
                        class="delete-button"
                        onclick="deleteAnimal(${animal.id})"
                    >
                        Remover
                    </button>

                </div>

            </div>

        `;

        grid.appendChild(card);

    });

}


/* ========================================
   RENDERIZAR REMOÇÃO
======================================== */

function renderRemoveAnimals() {

    const grid =
        document.getElementById("removeGrid");

    grid.innerHTML = "";


    animals.forEach(animal => {

        const card =
            document.createElement("article");

        card.className = "remove-card";

        card.innerHTML = `

            <img
                src="${animal.image}"
                alt="${animal.name}"
            >

            <div class="remove-card-content">

                <h3>${animal.name}</h3>

                <p>
                    ${animal.age} •
                    ${animal.gender}
                </p>

                <button
                    class="remove-button"
                    onclick="deleteAnimal(${animal.id})"
                >
                    Remover animal
                </button>

            </div>

        `;

        grid.appendChild(card);

    });

}


/* ========================================
   RENDERIZAR SOLICITAÇÕES
======================================== */

function renderRequests() {

    const container =
        document.getElementById("requestsContainer");

    const dashboard =
        document.getElementById("dashboardRequests");


    container.innerHTML = "";

    dashboard.innerHTML = "";


    requests.forEach(request => {

        const animal =
            animals.find(
                animal => animal.id === request.animalId
            );


        const image =
            animal
                ? animal.image
                : "";


        /* DASHBOARD */

        const dashboardRow =
            document.createElement("div");

        dashboardRow.className =
            "request-row";


        dashboardRow.innerHTML = `

            <img
                src="${image}"
                class="request-image"
                alt="${request.animal}"
            >

            <div class="request-info">

                <strong>
                    Solicitação #${String(request.id).padStart(3, "0")}
                </strong>

                <span>
                    ${request.animal} •
                    ${request.adopter}
                </span>

            </div>

            <span class="status ${getStatusClass(request.status)}">
                ${request.status}
            </span>

        `;


        dashboard.appendChild(dashboardRow);


        /* SOLICITAÇÕES */

        const card =
            document.createElement("div");

        card.className =
            "request-card";


        card.innerHTML = `

            <img
                src="${image}"
                class="request-card-image"
                alt="${request.animal}"
            >


            <div class="request-card-content">

                <div class="request-card-top">

                    <h3>
                        Solicitação #${String(request.id).padStart(3, "0")}
                    </h3>

                    <span class="status ${getStatusClass(request.status)}">
                        ${request.status}
                    </span>

                </div>


                <div class="request-details">

                    <div class="detail">
                        <strong>Animal:</strong>
                        <span>${request.animal}</span>
                    </div>

                    <div class="detail">
                        <strong>Adotante:</strong>
                        <span>${request.adopter}</span>
                    </div>

                    <div class="detail">
                        <strong>Cidade:</strong>
                        <span>${request.city}</span>
                    </div>

                    <div class="detail">
                        <strong>Data:</strong>
                        <span>${request.date}</span>
                    </div>

                </div>

            </div>


            ${
                request.status === "Pendente"
                ?
                `
                <div class="request-actions">

                    <button
                        class="approve-button"
                        onclick="approveRequest(${request.id})"
                    >
                        Aprovar
                    </button>

                    <button
                        class="reject-button"
                        onclick="rejectRequest(${request.id})"
                    >
                        Recusar
                    </button>

                </div>
                `
                :
                ""
            }

        `;


        container.appendChild(card);

    });


    updateStats();

}


/* ========================================
   STATUS
======================================== */

function getStatusClass(status) {

    if (status === "Aprovada") {
        return "approved";
    }

    if (status === "Recusada") {
        return "rejected";
    }

    return "pending";
}


/* ========================================
   ESTATÍSTICAS
======================================== */

function updateStats() {

    document.getElementById(
        "totalAnimals"
    ).textContent = animals.length;


    document.getElementById(
        "totalRequests"
    ).textContent = requests.length;


    document.getElementById(
        "pendingRequests"
    ).textContent =
        requests.filter(
            request => request.status === "Pendente"
        ).length;


    document.getElementById(
        "approvedRequests"
    ).textContent =
        requests.filter(
            request => request.status === "Aprovada"
        ).length;

}


/* ========================================
   APROVAR SOLICITAÇÃO
======================================== */

function approveRequest(id) {

    const request =
        requests.find(
            request => request.id === id
        );


    if (!request) return;


    request.status = "Aprovada";


    renderRequests();


    showNotification(
        "Solicitação aprovada com sucesso! 💚"
    );

}


/* ========================================
   RECUSAR SOLICITAÇÃO
======================================== */

function rejectRequest(id) {

    const request =
        requests.find(
            request => request.id === id
        );


    if (!request) return;


    request.status = "Recusada";


    renderRequests();


    showNotification(
        "Solicitação recusada."
    );

}


/* ========================================
   ADICIONAR ANIMAL
======================================== */

document
    .getElementById("animalForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const newAnimal = {

            id:
                Date.now(),

            name:
                document.getElementById(
                    "animalName"
                ).value,

            age:
                document.getElementById(
                    "animalAge"
                ).value,

            gender:
                document.getElementById(
                    "animalGender"
                ).value,

            type:
                document.getElementById(
                    "animalType"
                ).value,

            image:
                document.getElementById(
                    "animalImage"
                ).value,

            description:
                document.getElementById(
                    "animalDescription"
                ).value ||
                "Um pet esperando por uma família."
        };


        animals.push(newAnimal);


        this.reset();


        renderAnimals();

        renderRemoveAnimals();

        updateStats();


        showNotification(
            `${newAnimal.name} foi cadastrado com sucesso! 🐾`
        );


        showSection("animais");

    });


/* ========================================
   REMOVER ANIMAL
======================================== */

function deleteAnimal(id) {

    const animal =
        animals.find(
            animal => animal.id === id
        );


    if (!animal) return;


    openModal(
        `Deseja realmente remover o animal ${animal.name}?`,
        () => {

            animals =
                animals.filter(
                    animal => animal.id !== id
                );


            renderAnimals();

            renderRemoveAnimals();

            renderRequests();

            updateStats();


            showNotification(
                `${animal.name} foi removido do sistema.`
            );

        }
    );

}


/* ========================================
   EDITAR ANIMAL
======================================== */

function editAnimal(id) {

    const animal =
        animals.find(
            animal => animal.id === id
        );


    if (!animal) return;


    document.getElementById(
        "animalName"
    ).value = animal.name;


    document.getElementById(
        "animalAge"
    ).value = animal.age;


    document.getElementById(
        "animalGender"
    ).value = animal.gender;


    document.getElementById(
        "animalType"
    ).value = animal.type;


    document.getElementById(
        "animalImage"
    ).value = animal.image;


    document.getElementById(
        "animalDescription"
    ).value = animal.description;


    animals =
        animals.filter(
            animal => animal.id !== id
        );


    showSection("adicionar");


    showNotification(
        "Edite as informações e cadastre novamente."
    );

}


/* ========================================
   BUSCA
======================================== */

document
    .getElementById("animalSearch")
    .addEventListener("input", function() {

        renderAnimals(this.value);

    });


/* ========================================
   MODAL
======================================== */

const modalOverlay =
    document.getElementById("modalOverlay");

const modalMessage =
    document.getElementById("modalMessage");

const confirmModal =
    document.getElementById("confirmModal");

const closeModal =
    document.getElementById("closeModal");

const cancelModal =
    document.getElementById("cancelModal");


let modalAction = null;


function openModal(message, action) {

    modalMessage.textContent = message;

    modalAction = action;

    modalOverlay.classList.add("active");

}


function closeModalWindow() {

    modalOverlay.classList.remove("active");

    modalAction = null;

}


confirmModal.addEventListener(
    "click",
    () => {

        if (modalAction) {
            modalAction();
        }

        closeModalWindow();

    }
);


closeModal.addEventListener(
    "click",
    closeModalWindow
);


cancelModal.addEventListener(
    "click",
    closeModalWindow
);


modalOverlay.addEventListener(
    "click",
    event => {

        if (
            event.target === modalOverlay
        ) {
            closeModalWindow();
        }

    }
);


/* ========================================
   NOTIFICAÇÃO
======================================== */

function showNotification(message) {

    const notification =
        document.createElement("div");


    notification.textContent =
        message;


    notification.style.position =
        "fixed";

    notification.style.right =
        "25px";

    notification.style.bottom =
        "25px";

    notification.style.background =
        "#71865f";

    notification.style.color =
        "white";

    notification.style.padding =
        "13px 18px";

    notification.style.borderRadius =
        "10px";

    notification.style.fontSize =
        "11px";

    notification.style.fontWeight =
        "500";

    notification.style.boxShadow =
        "0 8px 25px rgba(0,0,0,.12)";

    notification.style.zIndex =
        "2000";


    document.body.appendChild(
        notification
    );


    setTimeout(() => {

        notification.remove();

    }, 3000);

}


/* ========================================
   LOGOUT
======================================== */

document
    .getElementById("logoutButton")
    .addEventListener("click", async () => {

        const confirmar =
            confirm(
                "Deseja realmente sair do painel?"
            );


        if (!confirmar) {
            return;
        }


        try {

            await auth.signOut();

            window.location.href =
                "login.html";

        } catch (error) {

            console.error(
                "Erro ao sair:",
                error
            );

            alert(
                "Não foi possível sair."
            );

        }

    });


/* ========================================
   INICIALIZAÇÃO
======================================== */

renderAnimals();

renderRemoveAnimals();

renderRequests();

updateStats();