/* Obtem uma "conexão" Knex já vinculado ao banco, que por sua vez é configurado através do knexfile, que carrega os valores definidos
no arquivo .env para process.env, de onde 

acessa as variáves armazenadas
em process.env.*

Neste local os valores arquivo .env são carregados

*/

const db = require('../db/knex');

// Método de Consulta através do ID

exports.obter = async (req, res) => {
  try {
    const cliente = await db("clientes").where({ id: req.params.id }).first();
    if (!cliente) {
      return res.status(404).json({ erro: "Cliente não encontrado" });
    }
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar cliente" });
  }
};

// Método de Listar todos os clientes 

exports.listar = async (req, res) => {
  try {
    const clientes = await db('clientes').orderBy('nome');
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar clientes' });
  }
};


// Método de inserir um cliente 

exports.inserir = async (req, res) => {
  try {
    const { nome, endereco, cidade, uf, cep, email, telefone, valorcredito } = req.body;
    await db('clientes').insert({ nome:nome, endereco:endereco, cidade:cidade, uf:uf, cep:cep, email:email, telefone:telefone, valorcredito:valorcredito });
    res.status(201).json({ mensagem: 'Cliente inserido com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao inserir cliente' });
  }
};

// Método de atualizar um cliente 


exports.atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, endereco, cidade, uf, cep, email, telefone, valorcredito } = req.body;
    await db('clientes').where({ id }).update({ nome, endereco, cidade, uf, cep, email, telefone, valorcredito });
    res.json({ mensagem: 'Cliente atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar cliente' });
  }
};

// Método de excluir um cliente 

exports.excluir = async (req, res) => {
  try {
    const { id } = req.params;
    await db('clientes').where({ id }).del();
    res.json({ mensagem: 'Cliente excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao excluir cliente' });
  }
};
