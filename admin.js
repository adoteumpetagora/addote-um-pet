// ======================================================
// ADOTE UM PET - PAINEL ADMINISTRATIVO
// ======================================================

// Chaves utilizadas no localStorage
const CHAVE_ANIMAIS = "adoteUmPet_animais";
const CHAVE_SOLICITACOES = "adoteUmPet_solicitacoes";
const CHAVE_DOACOES = "adoteUmPet_doacoes";


// ======================================================
// DADOS INICIAIS
// ======================================================

const animaisIniciais = [
    {
        id: 1,
        nome: "Thor",
        tipo: "Cachorro",
        idade: "2 anos",
        imagem: "imagens/thor.jpg",
        status: "Disponível"
    },
    {
        id: 2,
        nome: "Luna",
        tipo: "Gato",
        idade: "1 ano",
        imagem: "imagens/luna.jpg",
        status: "Disponível"
    },
    {
        id: 3,
        nome: "Bidu",
        tipo: "Cachorro",
        idade: "3 anos",
        imagem: "imagens/bidu.jpg",
        status: "Adotado"
    },
    {
        id: 4,
        nome: "Mel",
        tipo: "Gato",
        idade: "2 anos",
        imagem: "imagens/mel.jpg",
        status: "Disponível"
    },
    {
        id: 5,
        nome: "Amora",
        tipo: "Coelho",
        idade: "1 ano",
        imagem: "imagens/amora.jpg",
        status: "Disponível"
    },
    {
        id: 6,
        nome: "Mingau",
        tipo: "Gato",
        idade: "4 anos",
        imagem: "imagens/mingau.jpg",
        status: "Adotado"
    }
];


const solicitacoesIniciais = [
    {
        id: 1,
        nome: "Maria Silva",
        email: "maria@email.com",
        telefone: "(62) 99999-1111",
        animal: "Thor",
        data: "15/09/2026",
        status: "Pendente"
    },
    {
        id: 2,
        nome: "João Santos",
        email: "joao@email.com",
        telefone: "(62) 99999-2222",
        animal: "Luna",
        data: "14/09/2026",
        status: "Aprovada"
    },
    {
        id: 3,
        nome: "Ana Oliveira",
        email: "ana@email.com",
        telefone: "(62) 99999-3333",
        animal: "Amora",
        data: "13/09/2026",
        status: "Pendente"
    }
];


// ======================================================
// INICIALIZAÇÃO DO LOCALSTORAGE
// ======================================================

function inicializarDados() {

    if (!localStorage.getItem(CHAVE_ANIMAIS)) {
        localStorage.setItem(
            CHAVE_ANIMAIS,
            JSON.stringify(animaisIniciais)
        );
    }

    if (!localStorage.getItem(CHAVE_SOLICITACOES)) {
        localStorage.setItem(
            CHAVE_SOLICITACOES,
            JSON.stringify(solicitacoesIniciais)
        );
    }

    if (!localStorage.getItem(CHAVE_DOACOES)) {
        localStorage.setItem(
            CHAVE_DOACOES,
            JSON.stringify([])
        );
    }
}


// ======================================================
// FUNÇÕES PARA LER OS DADOS
// ======================================================

function obterAnimais() {

    return JSON.parse(
        localStorage.getItem(CHAVE_ANIMAIS)
    ) || [];
}


function obterSolicitacoes() {

    return JSON.parse(
        localStorage.getItem(CHAVE_SOLICITACOES)
    ) || [];
}


function obterDoacoes() {

    return JSON.parse(
        localStorage.getItem(CHAVE_DOACOES)
    ) || [];
}


// ======================================================
// SALVAR DADOS
// ======================================================

function salvarAnimais(animais) {

    localStorage.setItem(
        CHAVE_ANIMAIS,
        JSON.stringify(animais)
    );
}


function salvarSolicitacoes(solicitacoes) {

    localStorage.setItem(
        CHAVE_SOLICITACOES,
        JSON.stringify(solicitacoes)
    );
}


// ======================================================
// ATUALIZAR RESUMO
// ======================================================

function atualizarResumo() {

    const animais = obterAnimais();
    const solicitacoes = obterSolicitacoes();
    const doacoes = obterDoacoes();

    const totalAnimais = document.getElementById("totalAnimais");
    const totalSolicitacoes = document.getElementById("totalSolicitacoes");
    const totalAdocoes = document.getElementById("totalAdocoes");
    const totalDoacoes = document.getElementById("totalDoacoes");


    if (totalAnimais) {
        totalAnimais.textContent = animais.length;
    }


    if (totalSolicitacoes) {

        const pendentes = solicitacoes.filter(
            solicitacao => solicitacao.status === "Pendente"
        );

        totalSolicitacoes.textContent = pendentes.length;
    }


    if (totalAdocoes) {

        const adotados = animais.filter(
            animal => animal.status === "Adotado"
        );

        totalAdocoes.textContent = adotados.length;
    }


    if (totalDoacoes) {

        const total = doacoes.reduce(
            (soma, doacao) => soma + Number(doacao.valor || 0),
            0
        );

        totalDoacoes.textContent = total.toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );
    }
}


// ======================================================
// RENDERIZAR ANIMAIS
// ======================================================

function renderizarAnimais() {

    const tabela = document.getElementById("tabelaAnimais");

    if (!tabela) return;

    const animais = obterAnimais();

    tabela.innerHTML = "";


    if (animais.length === 0) {

        tabela.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center;">
                    Nenhum animal cadastrado.
                </td>
            </tr>
        `;

        return;
    }


    animais.forEach(animal => {

        const linha = document.createElement("tr");

        const classeStatus =
            animal.status === "Adotado"
                ? "status-adotado"
                : "status-disponivel";


        linha.innerHTML = `
            <td>
                <div class="animal-tabela">

                    <img
                        src="${animal.imagem || "imagens/pet.jpg"}"
                        alt="${animal.nome}"
                        onerror="this.style.display='none'"
                    >

                    <strong>${animal.nome}</strong>

                </div>
            </td>

            <td>${animal.tipo}</td>

            <td>${animal.idade}</td>

            <td>
                <span class="${classeStatus}">
                    ${animal.status}
                </span>
            </td>

            <td>

                <div class="acoes">

                    <button
                        type="button"
                        class="btn-editar"
                        data-id="${animal.id}"
                        title="Editar"
                    >
                        ✏️
                    </button>

                    <button
                        type="button"
                        class="btn-excluir"
                        data-id="${animal.id}"
                        title="Excluir"
                    >
                        🗑️
                    </button>

                </div>

            </td>
        `;


        tabela.appendChild(linha);
    });
}


// ======================================================
// RENDERIZAR SOLICITAÇÕES
// ======================================================

function renderizarSolicitacoes() {

    const tabela = document.getElementById(
        "tabelaSolicitacoes"
    );

    if (!tabela) return;

    const solicitacoes = obterSolicitacoes();

    tabela.innerHTML = "";


    if (solicitacoes.length === 0) {

        tabela.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center;">
                    Nenhuma solicitação encontrada.
                </td>
            </tr>
        `;

        return;
    }


    solicitacoes.forEach(solicitacao => {

        const linha = document.createElement("tr");


        let classeStatus = "status-pendente";

        if (solicitacao.status === "Aprovada") {
            classeStatus = "status-aprovada";
        }

        if (solicitacao.status === "Recusada") {
            classeStatus = "status-recusada";
        }


        linha.innerHTML = `

            <td>
                <strong>${solicitacao.nome}</strong>
            </td>

            <td>${solicitacao.animal}</td>

            <td>${solicitacao.data}</td>

            <td>
                <span class="${classeStatus}">
                    ${solicitacao.status}
                </span>
            </td>

            <td>

                <div class="acoes">

                    <button
                        type="button"
                        class="btn-ver"
                        data-id="${solicitacao.id}"
                        title="Ver detalhes"
                    >
                        👁️
                    </button>

                    ${
                        solicitacao.status === "Pendente"
                        ? `
                            <button
                                type="button"
                                class="btn-aprovar"
                                data-id="${solicitacao.id}"
                                title="Aprovar"
                            >
                                ✅
                            </button>

                            <button
                                type="button"
                                class="btn-recusar"
                                data-id="${solicitacao.id}"
                                title="Recusar"
                            >
                                ❌
                            </button>
                        `
                        : ""
                    }

                </div>

            </td>
        `;


        tabela.appendChild(linha);
    });
}


// ======================================================
// MODAL DE ANIMAL
// ======================================================

const modal = document.getElementById("modalAnimal");

const formAnimal = document.getElementById("formAnimal");

const tituloModal = document.getElementById(
    "tituloModalAnimal"
);


function abrirModalAdicionar() {

    if (!modal || !formAnimal) return;

    formAnimal.reset();

    document.getElementById("animalId").value = "";

    tituloModal.textContent = "Adicionar animal";

    modal.classList.add("ativo");
}


function abrirModalEditar(id) {

    const animais = obterAnimais();

    const animal = animais.find(
        item => Number(item.id) === Number(id)
    );

    if (!animal) return;


    document.getElementById("animalId").value =
        animal.id;

    document.getElementById("nomeAnimal").value =
        animal.nome;

    document.getElementById("tipoAnimal").value =
        animal.tipo;

    document.getElementById("idadeAnimal").value =
        animal.idade;

    document.getElementById("imagemAnimal").value =
        animal.imagem || "";

    document.getElementById("statusAnimal").value =
        animal.status;


    tituloModal.textContent = "Editar animal";

    modal.classList.add("ativo");
}


function fecharModal() {

    if (!modal) return;

    modal.classList.remove("ativo");
}


// ======================================================
// SALVAR ANIMAL
// ======================================================

function salvarAnimal(event) {

    event.preventDefault();


    const id = document.getElementById(
        "animalId"
    ).value;


    const nome = document.getElementById(
        "nomeAnimal"
    ).value.trim();


    const tipo = document.getElementById(
        "tipoAnimal"
    ).value;


    const idade = document.getElementById(
        "idadeAnimal"
    ).value.trim();


    const imagem = document.getElementById(
        "imagemAnimal"
    ).value.trim();


    const status = document.getElementById(
        "statusAnimal"
    ).value;


    if (!nome || !tipo || !idade) {

        alert("Preencha todos os campos obrigatórios.");

        return;
    }


    const animais = obterAnimais();


    if (id) {

        const indice = animais.findIndex(
            animal => Number(animal.id) === Number(id)
        );


        if (indice !== -1) {

            animais[indice] = {
                ...animais[indice],
                nome,
                tipo,
                idade,
                imagem,
                status
            };

        }

    } else {

        const novoAnimal = {

            id: Date.now(),

            nome,

            tipo,

            idade,

            imagem,

            status
        };


        animais.push(novoAnimal);
    }


    salvarAnimais(animais);

    renderizarAnimais();

    atualizarResumo();

    fecharModal();

    alert(
        id
            ? "Animal atualizado com sucesso!"
            : "Animal adicionado com sucesso!"
    );
}


// ======================================================
// EXCLUIR ANIMAL
// ======================================================

function excluirAnimal(id) {

    const animais = obterAnimais();

    const animal = animais.find(
        item => Number(item.id) === Number(id)
    );


    if (!animal) return;


    const confirmar = confirm(
        `Deseja realmente excluir ${animal.nome}?`
    );


    if (!confirmar) return;


    const novosAnimais = animais.filter(
        item => Number(item.id) !== Number(id)
    );


    salvarAnimais(novosAnimais);

    renderizarAnimais();

    atualizarResumo();


    alert("Animal excluído com sucesso!");
}


// ======================================================
// VER DETALHES DA SOLICITAÇÃO
// ======================================================

function verSolicitacao(id) {

    const solicitacoes = obterSolicitacoes();

    const solicitacao = solicitacoes.find(
        item => Number(item.id) === Number(id)
    );


    if (!solicitacao) return;


    alert(
        `DETALHES DA SOLICITAÇÃO\n\n` +

        `Nome: ${solicitacao.nome}\n` +

        `E-mail: ${solicitacao.email}\n` +

        `Telefone: ${solicitacao.telefone}\n` +

        `Animal: ${solicitacao.animal}\n` +

        `Data: ${solicitacao.data}\n` +

        `Status: ${solicitacao.status}`
    );
}


// ======================================================
// APROVAR SOLICITAÇÃO
// ======================================================

function aprovarSolicitacao(id) {

    const solicitacoes = obterSolicitacoes();

    const solicitacao = solicitacoes.find(
        item => Number(item.id) === Number(id)
    );


    if (!solicitacao) return;


    const confirmar = confirm(
        `Aprovar a adoção de ${solicitacao.animal} para ${solicitacao.nome}?`
    );


    if (!confirmar) return;


    solicitacao.status = "Aprovada";


    salvarSolicitacoes(solicitacoes);


    // Também muda o status do animal
    const animais = obterAnimais();

    const animal = animais.find(
        item =>
            item.nome.toLowerCase() ===
            solicitacao.animal.toLowerCase()
    );


    if (animal) {

        animal.status = "Adotado";

        salvarAnimais(animais);
    }


    renderizarSolicitacoes();

    renderizarAnimais();

    atualizarResumo();


    alert("Solicitação aprovada!");
}


// ======================================================
// RECUSAR SOLICITAÇÃO
// ======================================================

function recusarSolicitacao(id) {

    const solicitacoes = obterSolicitacoes();

    const solicitacao = solicitacoes.find(
        item => Number(item.id) === Number(id)
    );


    if (!solicitacao) return;


    const confirmar = confirm(
        `Deseja recusar a solicitação de ${solicitacao.nome}?`
    );


    if (!confirmar) return;


    solicitacao.status = "Recusada";


    salvarSolicitacoes(solicitacoes);


    renderizarSolicitacoes();

    atualizarResumo();


    alert("Solicitação recusada.");
}


// ======================================================
// EVENTOS DA TABELA DE ANIMAIS
// ======================================================

document.addEventListener("click", function(event) {

    const botaoEditar =
        event.target.closest(".btn-editar");


    const botaoExcluir =
        event.target.closest(".btn-excluir");


    const botaoVer =
        event.target.closest(".btn-ver");


    const botaoAprovar =
        event.target.closest(".btn-aprovar");


    const botaoRecusar =
        event.target.closest(".btn-recusar");


    if (botaoEditar) {

        abrirModalEditar(
            botaoEditar.dataset.id
        );

        return;
    }


    if (botaoExcluir) {

        excluirAnimal(
            botaoExcluir.dataset.id
        );

        return;
    }


    if (botaoVer) {

        verSolicitacao(
            botaoVer.dataset.id
        );

        return;
    }


    if (botaoAprovar) {

        aprovarSolicitacao(
            botaoAprovar.dataset.id
        );

        return;
    }


    if (botaoRecusar) {

        recusarSolicitacao(
            botaoRecusar.dataset.id
        );

        return;
    }
});


// ======================================================
// BOTÕES DO MODAL
// ======================================================

const btnAdicionarAnimal =
    document.getElementById("btnAdicionarAnimal");


const btnFecharModal =
    document.getElementById("btnFecharModal");


const btnCancelarAnimal =
    document.getElementById("btnCancelarAnimal");


if (btnAdicionarAnimal) {

    btnAdicionarAnimal.addEventListener(
        "click",
        abrirModalAdicionar
    );
}


if (btnFecharModal) {

    btnFecharModal.addEventListener(
        "click",
        fecharModal
    );
}


if (btnCancelarAnimal) {

    btnCancelarAnimal.addEventListener(
        "click",
        fecharModal
    );
}


if (formAnimal) {

    formAnimal.addEventListener(
        "submit",
        salvarAnimal
    );
}


// ======================================================
// FECHAR MODAL CLICANDO FORA
// ======================================================

if (modal) {

    modal.addEventListener(
        "click",
        function(event) {

            if (event.target === modal) {

                fecharModal();
            }
        }
    );
}


// ======================================================
// BOTÃO SAIR
// ======================================================

const btnSair =
    document.getElementById("btnSair");


if (btnSair) {

    btnSair.addEventListener(
        "click",
        function() {

            const confirmar = confirm(
                "Deseja sair do painel administrativo?"
            );


            if (confirmar) {

                window.location.href = "index.html";
            }
        }
    );
}


// ======================================================
// INICIALIZAR PAINEL
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        inicializarDados();

        renderizarAnimais();

        renderizarSolicitacoes();

        atualizarResumo();

    }
);