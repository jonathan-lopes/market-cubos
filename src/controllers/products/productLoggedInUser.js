const connection = require('../../conexao');

const productLoggedInUser = async (req, res) => {
    const { id } = req.user;
    const category = req.query.categoria;

    if (!category) {
        try {
            const query = "SELECT * FROM produtos WHERE usuario_id = $1;";
            const { rows } = await connection.query(query, [id]);

            return res.status(200).json(rows);
        } catch (error) {
            return res.status(400).json({ mensagem: error.message });
        }
    }

    try {
        const query = "SELECT * FROM produtos WHERE usuario_id = $1 AND categoria ILIKE $2;";
        const { rows } = await connection.query(query, [id, category]);

        return res.status(200).json(rows);
    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }
}

module.exports = productLoggedInUser;