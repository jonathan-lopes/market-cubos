module.exports = validations = (user) => {
    const { nome, email, senha, nome_loja } = user;

    if (Object.keys(user).length === 0) {
        return "Requisição inválida.";
    }

    if (!nome) {
        return "O campo nome é obrigatório.";
    }

    if (!email) {
        return "O campo email é obrigatório.";
    }

    if (!senha) {
        return "O campo senha é obrigatório.";
    }

    if (!nome_loja) {
        return "O campo nome_loja é obrigatório.";
    }

    if (typeof nome != "string") {
        return "Valor do campo nome é Inválido.";
    }

    if (typeof email != "string") {
        return "Valor do email nome é Inválido.";
    }

    if (typeof senha != "string") {
        return "Valor do senha nome é Inválido.";
    }

    if (typeof nome_loja != "string") {
        return "Valor do nome_loja é Inválido.";
    }
}