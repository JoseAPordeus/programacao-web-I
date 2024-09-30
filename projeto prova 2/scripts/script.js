let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Função para adicionar um produto ao carrinho
const adicionaAoCarrinho = (nomeProduto, precoProduto) => {
    const produto = { nome: nomeProduto, preco: precoProduto };
    carrinho.push(produto);
    atualizaContagemCarrinho();
    salvarCarrinho();
    alert(`O produto ${nomeProduto} foi adicionado ao seu carrinho.`);
};

// Função para atualizar a contagem de itens no carrinho
const atualizaContagemCarrinho = () => {
    document.getElementById('carrinho-contagem').textContent = carrinho.length;
};

// Função para salvar o carrinho no localStorage
const salvarCarrinho = () => {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
};

// Função para carregar o carrinho ao carregar a página
const carregaCarrinho = () => {
    carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    atualizaContagemCarrinho();
    mostrarItensCarrinho();
};

// Função para mostrar os itens do carrinho
const mostrarItensCarrinho = () => {
    const containerCarrinho = document.getElementById('carrinho-container');
    const totalCarrinho = document.getElementById('carrinho-total');
    containerCarrinho.innerHTML = '';
    let total = 0;

    carrinho.forEach((produto, indice) => {
        const itemCarrinho = document.createElement('div');
        itemCarrinho.classList.add('carrinho__item');

        itemCarrinho.innerHTML = `
            <img src="./img/${produto.nome}.jpg" alt="${produto.nome}">
            <div class="carrinho__item--detalhes">
                <h3>${produto.nome}</h3>
                <p>${produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            </div>
            <button onclick="removerItemCarrinho(${indice})">Remover</button>
        `;

        containerCarrinho.appendChild(itemCarrinho);
        total += produto.preco;
    });

    totalCarrinho.textContent = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

// Função para remover um item do carrinho
const removerItemCarrinho = (indice) => {
    carrinho.splice(indice, 1);
    atualizaContagemCarrinho();
    salvarCarrinho();
    mostrarItensCarrinho();
};

// Função para limpar o carrinho
const limpaCarrinho = () => {
    carrinho = [];
    atualizaContagemCarrinho();
    salvarCarrinho();
    mostrarItensCarrinho();
};

//RESPOSTAS

//Etapa 02
//URL para buscar: https://viacep.com.br/ws/58400240/json/
//Método http para usar: GET
//Resposta do Reject: reject('Erro ao consultar o CEP'))
const buscarEndereco = (cep) => {
    return new Promise((resolve, reject) => {
        const url = `https://viacep.com.br/ws/${cep}/json/`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    reject('Erro ao consultar o CEP');
                }
                return response.json();
            })
            .then(data => {
                if (data.erro) {
                    reject("CEP não encontrado!");
                }else{
                    resolve(data);
                }
            })
            .catch(() => reject('Houve um problema com a conecção!'));
    });
};

// Função para consultar o CEP e preencher o formulário
const consultaCep = () => {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    if (cep.length === 8) {
        buscarEndereco(cep)
            .then(data => {
                if (data.erro) {
                    alert('CEP não encontrado');
                } else {
                    document.getElementById('logradouro').value = data.logradouro;
                    document.getElementById('complemento').value = data.complemento;
                    document.getElementById('cidade').value = data.localidade;
                    document.getElementById('estado').value = data.estado;
                }
            })
            .catch(error => alert(error));
    } else {
        alert('CEP inválido!');
    }
};

//Etapa 03
//URL para buscar: http://demo2582395.mockable.io/enviar
//Método http para usar: POST
//Resposta do Reject: reject('Erro ao enviar o formulário'))
const enviarDados = (dadosFormulario) => {
    return new Promise((resolve, reject) => {
        fetch('http://demo2582395.mockable.io/enviar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosFormulario)
        })
            .then(response => {
                if (!response.ok) {
                    reject('Erro ao enviar o formulário');
                }
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(() => reject('Erro ao enviar o formulário'));
    });
};

//Não mexer neste método
function submeterDados(event) {

    const dadosFormulario = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        motivo: document.getElementById('motivo').value,
        cep: document.getElementById('cep').value,
        logradouro: document.getElementById('logradouro').value,
        complemento: document.getElementById('complemento').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value
    };

    enviarDados(dadosFormulario)
        .then(data => {
            alert(data.msg); //Mensagem correta!
        })
        .catch(error => alert(error));
};

//Etapa 04
//URL para buscar: http://demo2582395.mockable.io/produtos
//Método http para usar: GET
//Resposta do Reject: reject('Erro ao consultar os Produtos'))
const consultarDadosConcorrencia = () => {
    return new Promise((resolve, reject) => {
        fetch('http://demo2582395.mockable.io/produtos')
            .then(response => {
                if (!response.ok) {
                    reject('Erro ao consultar os Produtos');
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(() => reject('Erro ao consultar os Produtos'));
    });
};

const alterarValoresTabela = (opcao) => {
    consultarDadosConcorrencia().then(data => {
        
        // Atualiza a tabela com os dados do concorrente selecionado
        modificaValores(data[opcao]);
    }).catch(error => alert(error));
}

//Não mexer neste método
const modificaValores = ([produto1, produto2, produto3, produto4, produto5, produto6]) => {

    const tabela = document.getElementById("tabelaProdutos").getElementsByTagName('tbody')[0];
    tabela.rows[0].cells[1].innerText = produto1.preco;
    tabela.rows[0].cells[2].innerText = produto1.estoque;
    tabela.rows[1].cells[1].innerText = produto2.preco;
    tabela.rows[1].cells[2].innerText = produto2.estoque;
    tabela.rows[2].cells[1].innerText = produto3.preco;
    tabela.rows[2].cells[2].innerText = produto3.estoque;
    tabela.rows[3].cells[1].innerText = produto4.preco;
    tabela.rows[3].cells[2].innerText = produto4.estoque;
    tabela.rows[4].cells[1].innerText = produto5.preco;
    tabela.rows[4].cells[2].innerText = produto5.estoque;
    tabela.rows[5].cells[1].innerText = produto6.preco;
    tabela.rows[5].cells[2].innerText = produto6.estoque;

}
// Carrega o carrinho quando a página é carregada
window.onload = carregaCarrinho;