import ApiService from "../apiservice";


class ServicoService extends ApiService {

    constructor() {
        super('/api/servicos')
    }

    salvar(servico) {
        return this.post('/', servico)
    }

    editar(id, servico) {
        return this.put(`/${id}`, servico)
    }

    deletar(id) {
        return this.delete(`/${id}`)
    }

    obterPorId(id) {
        return this.get(`/${id}`)
    }

    obterValorVenda(id) {
        return this.get(`/${id}/valor`)
    }

    listar() {
        return this.get(`/listar`)
    }


}

export default ServicoService