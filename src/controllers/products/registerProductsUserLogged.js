const connection = require('../../conexao');
const validations = require('./validations');

const registerProductsUserLogged = async (req, res) => {
    const { nome, quantidade, categoria, preco, descricao, imagem } = req.body;
    const { id } = req.user;

    const error = validations(req.body);

    if (error) {
        return res.status(400).json({ mensagem: error });
    }

    try {
        const query = `
        INSERT INTO
            produtos (
            usuario_id,
            nome,
            quantidade,
            categoria,
            preco,
            descricao,
            imagem
            )
      VALUES
        ($1, $2, $3, $4, $5, $6, $7)`;
        const { rowCount } = await connection.query(query, [id, nome, quantidade, categoria, preco, descricao, imagem]);

        if (rowCount === 0) {
            return res.status(500).json({ mensagem: "Não foi possivel cadastrar o produto." });
        }

        return res.status(201).json();
    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }
}

module.exports = registerProductsUserLogged;