const readline = require('readline');

// Configuração da interface para capturar a entrada do usuário
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Função principal para verificar conseguirá apresentar o TCC antes do Natal
function verificarApresentacaoTCC(E, D) {
    if (E > D) {
        console.log("Eu odeio o prof. Florovsky!");
    } else {
        const diferenca = D - E;

        if (diferenca >= 3) {
            console.log("Muito bem! O aluno está apto a apresentar até o natal!");
        } else {
            console.log("O trabalho está muito ruim!");
            E += 2;  // Adiciona mais dois dias para a correção

            if (E < 24) {
                console.log("TCC Apresentado!");
            } else {
                console.log("Não deu! Só no próximo ano agora.");
            }
        }
    }
}

// Captura a entrada do usuário
rl.question("", (input) => {
    // Divide a entrada em duas partes
    const [inputE, inputD] = input.split(' ').map(Number);

    // Verifica se as entradas são válidas
    if (!isNaN(inputE) && !isNaN(inputD) && inputE > 0 && inputD > 0 && inputE < 25 && inputD < 25) {
        verificarApresentacaoTCC(inputE, inputD);
    } else {
        console.log("Entrada inválida. Certifique-se de que os valores estão no intervalo correto e separados por espaço.");
    }
    
    // Fecha a interface de entrada
    rl.close();
});
