module.exports = validations = (user) => {
    const { nome, quantidade, categoria, preco, descricao, imagem } = user;

    if (Object.keys(user).length === 0) {
        return "Requisição inválida.";
    }

    if (!nome) {
        return "O campo nome é obrigatório.";
    }

    if (!quantidade) {
        return "O campo quantidade é obrigatório.";
    }

    if (!categoria) {
        return "O campo categoria é obrigatório.";
    }

    if (!descricao) {
        return "O campo descricao é obrigatório.";
    }

    if (!preco) {
        return "O campo preco é obrigatório.";
    }
    if (!imagem) {
        return "O campo imagem é obrigatório.";
    }

    if (typeof nome != "string") {
        return "Valor do campo nome é Inválido.";
    }

    if (typeof categoria != "string") {
        return "Valor do campo categoria é Inválido.";
    }

    if (typeof descricao != "string") {
        return "Valor do campo descicao é Inválido.";
    }

    if (typeof imagem != "string") {
        return "Valor do campo imagem é Inválido.";
    }

    if (typeof quantidade != "number") {
        return "Valor do campo quantidade é Inválido.";
    }

    if (quantidade <= 0) {
        return "Quantidade tem que ser maior que 0."
    }
}
