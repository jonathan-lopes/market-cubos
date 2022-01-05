const validations = require('./validations');
const connection = require('../../conexao');
const bcrypt = require('bcrypt');

const updateUser = async (req, res) => {
    const { nome, email, senha, nome_loja } = req.body;
    const { id } = req.user;

    const SALT_ROUNDS = 10;

    const error = validations(req.body);

    if (error) {
        return res.status(400).json({ mensagem: error });
    }

    try {
        const query = "SELECT * FROM usuarios WHERE email = $1 AND id <> $2";
        const { rowCount, rows } = await connection.query(query, [email, id]);

        if (rowCount > 0) {
            return res.status(400).json({ mensagem: "Email informado já existe." });
        }
    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }

    try {
        const pwdcrypt = await bcrypt.hash(senha, SALT_ROUNDS);
        const query = "UPDATE usuarios SET nome = $1, email = $2, senha = $3, nome_loja = $4 WHERE id = $5";
        const { rowCount } = await connection.query(query, [nome, email, pwdcrypt, nome_loja, id]);

        if (rowCount === 0) {
            return res.status(500).json({ mensagem: "Não foi possivel atualizar o usuário." })
        }

        return res.status(204).json();
    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }
}

module.exports = updateUser;