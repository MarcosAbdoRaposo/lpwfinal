/*  um comando que carrega variáveis de ambiente de um arquivo .env para o objeto process.env de 
   uma aplicação Node.js, permitindo que você acesse essas variáveis em todo o código. 
    O require('dotenv') importa o módulo dotenv, enquanto o .config() o configura e carrega as 
    variáveis do arquivo .env. 

*/

require('dotenv').config();

// Carrega o servidor express

const express = require('express');
const app = express();

/* O require( "path") um comando para carregar o módulo nativo Path, que fornece funções
   para trabalhar com caminhos de arquivo de forma que funcionem em diferentes sistemas operacionais

*/
const path = require("path");

/* A linha app.use(express.static(path.join(__dirname, ".", "public")));
   configura o servidor Express para servir arquivos estáticos, como imagens, 
   CSS e JavaScript, diretamente da pasta "public" localizada no mesmo diretório do arquivo
    principal do seu projeto. 
    
    O express.static() cria um middleware que gerencia o envio desses arquivos, 
    e path.join(__dirname, ".", "public") cria o caminho completo e correto para a pasta "public", 
    garantindo que o servidor saiba onde encontrar os arquivos, independentemente do sistema operacional. 

*/

app.use(express.static(path.join(__dirname, ".", "public")));

// Inclui as Funções de CRUD definidas em /routes/clientes:

const clientesRoutes = require('./routes/clientes');

/* app.use(express.json()); é um middleware no Express.js que permite que o servidor analise
 o corpo de requisições que vêm no formato JSON. 
 
 Ele torna os dados JSON recebidos acessíveis no objeto req.body para que seu aplicativo
 possa usá-los, como em requisições POST e PUT. 

*/

app.use(express.json());


/*  app.use(): Este é um método do Express.js para adicionar funções de middleware (intermediário) 
    ao pipeline de processamento de solicitações do aplicativo. 

    Middlewares são funções que têm acesso aos objetos de solicitação (req), resposta (res) 
    e à próxima função de middleware na pilha (next).

    /clientes: Este é o caminho de montagem (ou prefixo de URL).
    Isso significa que qualquer rota definida dentro do usuariosRoutes será acessível
    somente se a URL começar com /clientes.

    ClientesRoutes: Este é um objeto roteador (express.Router()) importado de outro arquivo ou módulo.
    Ele contém definições de rotas específicas (como clientesRoutes.get('/', ...) ou
    clientesRoutes.post('/novo', ...)). 

*/


app.use('/clientes', clientesRoutes);

/* Define o destino padrão do site como sendo public/index.html

*/

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// Obtem a porta que foi definido no arquivo .env 

const PORT = process.env.PORT || 3000;

// Ativa o serviço

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Descaradamente chupinhado do código do Professor Marcio Araya
// Por Marcos Raposo


