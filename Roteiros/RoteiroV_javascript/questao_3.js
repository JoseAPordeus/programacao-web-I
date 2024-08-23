// Função para colocar todas as letras em maiúsculo após 500ms
const colocarTodasLetrasEmMaiusculoEm500ms = (param) => {
    return new Promise((resolve, reject) => {
        if (typeof param !== 'string') {
            return reject('O parâmetro deve ser uma string');
        }
        setTimeout(() => {
            resolve(param.toUpperCase());
        }, 500);
    });
};

// Função para inverter todas as letras
const inverterTodasLetras = (str) => {
    return new Promise((resolve, reject) => {
        if (typeof str !== 'string') {
            return reject('O parâmetro deve ser uma string');
        }
        resolve(str.split('').reverse().join(''));
    });
};

// Exemplo de uso com encadeamento de promessas
const processarString = (input) => {
    colocarTodasLetrasEmMaiusculoEm500ms(input)
        .then(result => inverterTodasLetras(result))
        .then(result => {
            console.log('Resultado final:', result);
        })
        .catch(error => {
            console.error('Erro:', error);
        });
};

// Testando a função
processarString('exemplo de texto');