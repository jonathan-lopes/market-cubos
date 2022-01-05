CREATE DATABASE market_cubos;

CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL,
    nome VARCHAR(80) NOT NULL,
    nome_loja VARCHAR(30) NOT NULL,
    email VARCHAR(30) UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS produtos (
    id SERIAL,
    usuario_id INTEGER NOT NULL,
    nome VARCHAR(80) NOT NULL,
    quantidade INTEGER NOT NULL,
    categoria VARCHAR(30) NOT NULL,
    preco INTEGER NOT NULL,
    descricao TEXT,
    imagem TEXT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
);
