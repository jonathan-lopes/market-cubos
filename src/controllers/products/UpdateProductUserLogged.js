const connection = require('../../conexao');
const validations = require('./validations');

const UpdateProductUserLogged = async (req, res) => {
    const { nome, quantidade, categoria, preco, descricao, imagem } = req.body;
    const { id: userID } = req.user;
    const productsID = req.params.id;

    const error = validations(req.body);

    if (error) {
        return res.status(400).json({ mensagem: error });
    }

    try {
        const query = `
        UPDATE
            produtos
        SET
            nome = $1,
            quantidade = $2,
            categoria = $3,
            preco = $4,
            descricao = $5,
            imagem = $6
        WHERE
            usuario_id = $7
            AND id = $8;
        `;
        const { rowCount } = await connection.query(query, [nome, quantidade, categoria, preco, descricao, imagem, userID, productsID]);

        if (rowCount === 0) {
            return res.status(404).json({ mensagem: `Não foi encontrado produto com ID ${productsID} no seu usuário.` });
        }

        return res.status(204).json();
    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }
}

module.exports = UpdateProductUserLogged