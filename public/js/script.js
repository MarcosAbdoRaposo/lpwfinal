const API_URL = "http://localhost:3000/clientes";

async function carregarClientes() {
    const res = await fetch(API_URL);
    const clientes = await res.json();
    const tabela = document.getElementById("clientTable");
    tabela.innerHTML = "";

    clientes.forEach(cliente => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${cliente.nome}</td>
        <td>${cliente.cidade}</td>
        <td>${cliente.uf}</td>
        <td>${cliente.valorcredito}</td>
        <td class="actions">
        <button onclick="editarCliente(${cliente.id})">Editar</button>
        <button onclick="excluirCliente(${cliente.id})">Excluir</button>
        </td>
    `;
    tabela.appendChild(row);
    });
}

async function salvarCliente(e) {
    e.preventDefault();

    // Cria json com os dados a seren enviados

    const id = document.getElementById("id").value;
    const data = {
    nome: document.getElementById("nome").value,
    endereco: document.getElementById("endereco").value,
    cidade: document.getElementById("cidade").value,
    uf: document.getElementById("uf").value,
    cep: document.getElementById("cep").value,
    email: document.getElementById("email").value,
    telefone:document.getElementById("telefone").value,
    valorcredito:document.getElementById("valorcredito").value

    };

    // se existir id então é atualização, senão Inclusão

    const metodo = id ? "PUT" : "POST";
    const url = id ? `${API_URL}/${id}` : API_URL;

    await fetch(url, {
    method: metodo,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    });

    document.getElementById("clienteForm").reset();

    // Recarrega a Grade a tela
    carregarClientes();
}

async function editarCliente(id) {

    // Obtem os dados de um determinado cliente
    const res = await fetch(`${API_URL}/${id}`, { method: "GET" });
    const cliente = await res.json();

    document.getElementById("id").value = id;
    document.getElementById("nome").value = cliente.nome;
    document.getElementById("endereco").value = cliente.endereco;
    document.getElementById("cidade").value = cliente.cidadde;
    document.getElementById("uf").value = cliente.uf;
    document.getElementById("cep").value = cliente.cep;
    document.getElementById("email").value = cliente.email;
    document.getElementById("telefone").value = cliente.telefone;
    document.getElementById("valorcredito").value = cliente.valorcredito;



}

async function excluirCliente(id) {
    if (confirm("Deseja excluir este cliente?")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    carregarClientes();
    }
}

document.getElementById("clienteForm").addEventListener("submit", salvarCliente);
carregarClientes();