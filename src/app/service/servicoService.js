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

    obterNomes() {
        return this.get('/listarNomes')
    }

    async getNomesServicos(id) {
        const x = [{ label: 'Selecione...', value: null }];

        await this.obterNomes(id).then(response => {
            response.data.forEach(element => {
                x.push(element)
            });
        })

        console.log(x);

        return Promise.resolve(x);
    }

    listar() {
        return this.get(`/listar`)
    }


}

export default ServicoService