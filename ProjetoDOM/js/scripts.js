 //Etapa 1: Modificar o conteúdo de parágrafos. Se algum dos inputs não estiver preenchido, não modifique o seu respectivo texto.
//Dica01: Utilize a propriedade "textContent" para modificar o texto de um parágrafo.
//Dica02: Utilize a propriedade "value" para recuperar a informação preenchida nos campos de input.
const alterarTextos = () => {
    document.getElementById("texto1").textContent = document.getElementById("input1").value;
    document.getElementById("texto2").textContent = document.getElementById("input2").value;
    document.getElementById("texto3").textContent = document.getElementById("input3").value;
}

//Etapa 2: Adicionar e remover elementos no final da lista de itens
//Dica01: Utilize o método createElement para criar li
//Dica02: Utilize a propriedade "textContent" do li para modificar o seu conteúdo
//Dica03: Utilize a propriedade "ul.children.length" para saber a quantidade de itens na lista
//Dica04: Utilize a propriedade "ul.appendChild" para adicionar o li na lista
function adicionarItem() {
    var tamList = document.getElementById("listaItens").children.length
    let novoItem = document.createElement("li");
    novoItem.textContent = `item ${tamList + 1}`;
    document.getElementById("listaItens").appendChild(novoItem);
}

//Dica05: Utilize as propriedades "ul.removeChild" e "ul.lastChild" para fazer remoções de li na lista
//Dica06: Lembre-se de só deixar remover se a lista tiver pelo menos um elemento
function removerItem() {
    if (document.getElementById("listaItens").children.length > 0) {
        document.getElementById("listaItens").removeChild(document.getElementById("listaItens").lastChild)
    }
}

//Etapa 3: Modificar estilos de inputs do tipo text
//Obrigatório: Uso de callback function para alterar a cor de fundo de todos os inputs
//Dica01: Utilize a propriedade "style.backgroundColor" para modificar a cor de fundo dos inputs
function mudarCorFundo() {
    const inputs = document.querySelectorAll('input[type="text"]');
    //TODO
}

//Etapa 4: Ocultar e Exibir Elementos
//Dica01: Utilize a propriedade "style.display" e o valor da variável estilo para ocultar ou exibir a imagem
function ocultarImagem() {
    estilo = 'none'
    document.getElementById("imagem").style.display = estilo
}

function exibirImagem() {
    estilo = 'block'
    document.getElementById("imagem").style.display = estilo
}

//Etapa 4: Mover elementos na página
//Dica01: Utilize apenas as propriedades "box.style.left" e "box.style.top" para fazer a movimentação do elemento
function mover(direcao) {
    const box = document.getElementById('divDeslizavel');
    let left = parseInt(window.getComputedStyle(box).left) || 0;
    let top = parseInt(window.getComputedStyle(box).top) || 0;
    
    switch (direcao) {
        case 'esquerda':
            box.style.left = `${left-20}px`
            break;
        case 'direita':
            box.style.left = `${left+20}px`
            break;
        case 'cima':
            box.style.top = `${top+20}px`
            break;
        case 'baixo':
            box.style.top = `${top-20}px`
            break;
    }
}

//Exercício 6: Trocar Classe de Elementos
//Dica01: Utilize a propriedade "p.classList.toggle" para fazer a alternância
function alternarClasse() {
    const p = document.getElementById('classeParagrafo');
    //TODO
    p.classList.toggle('classeAzul');
    p.classList.toggle('classeVermelha');
    if (p.classList.contains('classeVermelha')) {
        p.textContent = "Este parágrafo é da classe vermelha."
    } else if (p.classList.contains('classeAzul')) {
        p.textContent = "Este parágrafo é da classe azul."
    }
}

//Exercício 7: Galeria de Imagens com Zoom
//Dica01: Utilize a função replace para substitutir o 100 por 300 no valor de src da imagem
function mostrarImagemMaior(img) {
    const imagemMaior = document.getElementById('imagem-maior');
    const imagemSrc = img.src;
    const imagemSrcMaior = imagemSrc.replace('100', '300');

    imagemMaior.src = imagemSrcMaior;
}

// Exercício 8: Validação de Formulário
//Obrigatório: É preciso aplicar estratégias de validação dos valores dos quatro campos do formulário.
//Pelo menos: não aceitar nome vazio, o cpf precisa estar mascarado e com 14 dígitos, 
//o email precisa ter pelo menos um @ e um ponto duas posições após o @ e a senha não deve conter menos que 8 caracteres.
function validarFormulario() {
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const erro = document.getElementById('mensagem-erro');
    
    erro.textContent = ''; // Limpa a mensagem de erro

    // Validação do nome
    if (nome === '') {
        erro.textContent = 'O nome não pode estar vazio.';
        return false;
    }

    // Validação do CPF (14 dígitos, incluindo máscara: 000.000.000-00)
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfRegex.test(cpf)) {
        erro.textContent = 'O CPF deve estar no formato 000.000.000-00.';
        return false;
    }

    // Validação do email (deve conter um "@" e um ponto com pelo menos duas posições após o "@")
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
        erro.textContent = 'O email deve ser válido e conter "@" e "." com pelo menos duas posições após o "@".';
        return false;
    }

    // Validação da senha (mínimo de 8 caracteres)
    if (senha.length < 8) {
        erro.textContent = 'A senha deve conter no mínimo 8 caracteres.';
        return false;
    }

    return true;
}

// Exercício 9: Contador Incremental
//Dica01: Utilize a propriedade "textContent" para modificar o texto de um parágrafo.
//Desafio01: Implemente a geração da música "Um Elefante Incomodaa Muita Gente"
//quando o número de versos for maior que 9, a função deve colocar reticência (...) para o caso
//do número de "incomodam" ser maior ou igual a 10.
let contador = 0;

function atualizarContador() {
    const contadorElemento = document.getElementById('contador');
    contadorElemento.textContent = contador;
}

function incrementar() {
    contador++;
    atualizarContador();
    geraMusicaElefante(contador);
}

function decrementar() {
    if (contador > 0) {
        contador--;
    }
    atualizarContador();
    geraMusicaElefante(contador);
}

function geraMusicaElefante(numVersos) {
    const paragrafoMusica = document.getElementById('paragrafoMusica');
    paragrafoMusica.textContent = ''; // Limpa o conteúdo anterior

    for (let i = 1; i <= numVersos; i++) {
        let incomodam = "incomoda";

        if (i > 1 && i < 10) {
            incomodam = "incomodam " + "muita gente ".repeat(i);
        } else if (i >= 10) {
            incomodam = "incomodam muita gente...";
        }

        const verso = `${i} elefante${i > 1 ? 's' : ''} ${incomodam}`;
        const p = document.createElement('p');
        p.textContent = verso;
        paragrafoMusica.appendChild(p);
    }
}

// Exercício 10: Filtrar Itens de uma Lista com callback e arrow function
//Dica01: Utilize a propriedade "textContent" para modificar o texto de um parágrafo.
//Desafio02: Transforme a lista de itens em objetos (professor: nome, area, laboratorio, disciplina) e utilize o filtro para atuar considerando todos os atributos do projeto.
function filtrarItens() {
    const filtro = document.getElementById('filtro').value.toLowerCase();
    const itens = document.getElementById('lista-professores').getElementsByTagName('li');

    Array.from(itens).forEach(item => {
        const textoItem = item.textContent.toLowerCase();
        if (textoItem.includes(filtro)) {
            item.style.display = "";  // Mostrar o item
        } else {
            item.style.display = "none";  // Esconder o item
        }
    });
}