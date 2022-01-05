const validations = require('./validations');
const connection = require('../../conexao');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    const { nome, email, senha, nome_loja } = req.body;
    
    const SALT_ROUNDS = 10;

    const error = validations(req.body);

    if (error) {
        return res.status(400).json({ mensagem: error });
    }

    try {
        const query = "SELECT * FROM usuarios WHERE email = $1";
        const { rowCount } = await connection.query(query, [email]);

        if (rowCount > 0) {
            return res.status(400).json({ mensagem: "Email informado já existe." })
        }

    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }

    try {
        const pwdcrypt = await bcrypt.hash(senha, SALT_ROUNDS);
        const query = "INSERT INTO usuarios (nome, nome_loja, email, senha) VALUES ($1, $2, $3, $4)"
        const { rowCount } = await connection.query(query, [nome, nome_loja, email, pwdcrypt]);

        if (rowCount === 0) {
            return res.status(500).json({ mensagem: "Não foi possivel cadastrar usuário." });
        }

        return res.status(201).json();
    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }
}

module.exports = registerUser;