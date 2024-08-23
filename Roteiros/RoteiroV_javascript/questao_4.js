// Função async para colocar todas as letras em maiúsculo após 500ms
const colocarTodasLetrasEmMaiusculoEm500ms = async (param) => {
    if (typeof param !== 'string') {
        throw new Error('O parâmetro deve ser uma string');
    }
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(param.toUpperCase());
        }, 500);
    });
};

// Função async para inverter todas as letras
const inverterTodasLetras = async (str) => {
    if (typeof str !== 'string') {
        throw new Error('O parâmetro deve ser uma string');
    }
    return str.split('').reverse().join('');
};

// Função principal para processar a string com async/await
const processarString = async (input) => {
    try {
        const maiusculo = await colocarTodasLetrasEmMaiusculoEm500ms(input);
        const invertido = await inverterTodasLetras(maiusculo);
        console.log('Resultado final:', invertido);
    } catch (error) {
        console.error('Erro:', error.message);
    }
};

// Testando a função
processarString('exemplo de texto');