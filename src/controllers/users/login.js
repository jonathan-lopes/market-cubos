const connection = require('../../conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../../key/jwtSecret');

const login = async (req, res) => {
    const { email, senha } = req.body;

    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ mensagem: "Requisição inválida." })
    }

    if (!email) {
        return res.status(400).json({ mensagem: "O campo email é obrigatório." });
    }

    if (!senha) {
        return res.status(400).json({ mensagem: "O campo senha é obrigatório." })
    }

    if (typeof email != "string") {
        return res.status(400).json({ mensagem: "Valor do email nome é Inválido." });
    }

    if (typeof senha != "string") {
        return res.status(400).json({ mensagem: "Valor do senha nome é Inválido." });
    }

    try {
        const query = "SELECT * FROM usuarios WHERE email = $1";
        const { rowCount, rows } = await connection.query(query, [email]);

        if (rowCount === 0) {
            return res.status(404).json({ mensagem: "Usuário não encontrado." });
        }

        const user = rows[0];

        const verifyPasswd = await bcrypt.compare(senha, user.senha);

        if (!verifyPasswd) {
            return res.status(401).json({ mensagem: "Email ou senha incorretos." });
        }

        const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: "30m" });

        return res.status(200).json({ token });
    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }
}

module.exports = login;