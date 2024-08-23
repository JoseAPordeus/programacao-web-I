const http = require('http');

// Objeto inicial com dados comprometidos
const dono = {
    "proprietario": "Silvio Santos",
    "endereco": {
        "cep": 'hacked, pay to recover',
        "logradouro": 'hacked, pay to recover',
        "complemento": 'hacked, pay to recover',
        "bairro": 'hacked, pay to recover',
        "localidade": 'hacked, pay to recover',
        "uf": '',
        "geo": {
            "lat": "-23.61919020307765",
            "lng": "-46.70793551534256"
        }
    }
};

// Função para buscar dados do VIACEP usando o módulo http
function buscarEndereco(cep) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'viacep.com.br',
            path: `/ws/${cep}/json/`,
            method: 'GET'
        };

        const req = http.request(options, res => {
            let data = '';

            res.on('data', chunk => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(data);
                    if (parsedData.erro) {
                        reject(new Error('CEP não encontrado'));
                    } else {
                        resolve(parsedData);
                    }
                } catch (error) {
                    reject(new Error('Erro ao processar a resposta'));
                }
            });
        });

        req.on('error', error => {
            reject(new Error('Erro na requisição'));
        });

        req.end();
    });
}

// Preenchendo o objeto dono com os dados obtidos
buscarEndereco('05650-000')
    .then(endereco => {
        dono.endereco.cep = endereco.cep;
        dono.endereco.bairro = endereco.bairro;
        dono.endereco.localidade = endereco.localidade;
        dono.endereco.uf = endereco.uf;

        const resultado = `${dono.proprietario} - ${dono.endereco.cep} - ${dono.endereco.bairro}, ${dono.endereco.localidade} (${dono.endereco.geo.lat}, ${dono.endereco.geo.lng})`;
        console.log(resultado);
    })
    .catch(error => {
        console.error('Erro ao buscar o CEP:', error.message);
    });
