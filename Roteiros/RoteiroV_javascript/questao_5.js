const crypto = require('crypto');

// Função para criptografia de dados
const criptografarMensagem = (texto, chaveSecreta) => {
    const algorithm = 'aes-256-cbc';
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(chaveSecreta), iv);
    let encrypted = cipher.update(texto, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    // Retorna o IV junto com o texto criptografado
    return `${iv.toString('hex')}:${encrypted}`;
};

// Função para descriptografar dados
const descriptografar = (textoCriptografado, chaveSecreta) => {
    const algorithm = 'aes-256-cbc';
    const [ivHex, encrypted] = textoCriptografado.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(chaveSecreta), iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

// Função para processar números
const processarNumeros = (numeros, chaveSecreta) => {
    return numeros
        .filter(num => num % 2 === 0) // Filtra apenas números pares
        .map(num => criptografarMensagem(num.toString(), chaveSecreta)); // Criptografa cada número par
};

// Exemplo de uso
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const chaveSecreta = '12345678901234567890123456789012'; // Chave secreta de 32 bytes para AES-256

// Processa a criptografia
const textosCriptografados = processarNumeros(numeros, chaveSecreta);
console.log('Textos criptografados:', textosCriptografados);

// Descriptografar os textos criptografados
const textosDescriptografados = textosCriptografados.map(texto => descriptografar(texto, chaveSecreta));
console.log('Textos descriptografados:', textosDescriptografados);
