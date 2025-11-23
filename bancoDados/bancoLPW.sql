SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "-03:00";


--
-- Banco de dados: facsenac
--
CREATE DATABASE IF NOT EXISTS lpw DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE lpw;

-- --------------------------------------------------------

--
-- Estrutura para tabela Clientes


CREATE TABLE IF NOT EXISTS clientes (
  id int NOT NULL primary key  AUTO_INCREMENT,
  nome varchar(120) NOT NULL,
  endereco varchar(120) not null,
  cidade varchar(36) not null,
  uf     char(2) not null,
  cep    char(8) not null,
  email varchar(120) null,
  telefone varchar(15) NULL,
  datacadastro DATE DEFAULT (CURRENT_DATE),
  valorcredito numeric(12,2)
)  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela usuarios
--

INSERT INTO clientes ( nome, endereco,cidade,uf,cep,email,telefone,valorcredito) VALUES
('Maria Alves', 'SQN 313','BRASÍLIA','DF','70000000','maria.alves@gmail.com','6132163707',10000),
('Gabriel o Pensador', 'Rua Fernando Leão, 28','Rio de Janeiro','RJ','20000000','gabriel.pensador@gmail.com','6132163708',5000),
('Ed Mota', 'Rui Caiçara, 95','Rio e Janeiro','RJ','20000000','ed.mota@gmail.com','6132163709',8000);


COMMIT;
