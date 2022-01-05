const connection = require('../../conexao');

const detailProductsUserLogged = async (req, res) => {
    const { id: userID } = req.user;
    const productsID = req.params.id;

    try {
        const query = "SELECT * FROM produtos WHERE usuario_id = $1 AND id = $2;"
        const { rows, rowCount } = await connection.query(query, [userID, productsID]);

        if (rowCount === 0) {
            return res.status(404).json({ mensagem: `Não foi encontrado produto com ID ${productsID} no seu usuário.` });
        }

        return res.status(200).json(rows[0]);
    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }
}

module.exports = detailProductsUserLogged;