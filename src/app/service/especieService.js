import ApiService from "../apiservice";


class EspecieService extends ApiService {



    constructor() {
        super('/api/especies')
        this.especies = null
    }

    salvar(especie) {
        return this.post('/', especie)
    }

    editar(id, especie) {
        return this.put(`/${id}`, especie)
    }

    deletar(id) {
        return this.delete(`/${id}`)
    }

    obterPorId(id) {
        return this.get(`/${id}`)
    }

    listar() {
        return this.get(`/listar`)
    }

    listarNomes() {
        return this.get(`/listarNomes`)
    }

    async getNomes() {
        const x = [{ label: 'Selecione...' }];

        await this.listarNomes().then(response => {
            response.data.forEach(element => {
                x.push(element)
            });
        })

        return Promise.resolve(x);
    }

}

export default EspecieService