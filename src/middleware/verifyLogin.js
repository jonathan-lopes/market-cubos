const connection = require('../conexao');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../key/jwtSecret');

const verifyLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." });
    }

    try {
        const token = authorization.replace("Bearer", "").trim();

        const { id } = jwt.verify(token, jwtSecret);

        const query = "SELECT * FROM usuarios WHERE  id = $1";
        const { rowCount, rows } = await connection.query(query, [id]);

        if (rowCount === 0) {
            return res.status(404).json({ mensagem: "O usuário não foi encontrado." });
        }

        const { senha, ...user } = rows[0];

        req.user = user;
        next();
    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }
}

module.exports = verifyLogin;