import ApiService from "../apiservice";


class ClienteService extends ApiService {

    constructor() {
        super('/api/clientes')
    }

    salvar(cliente) {
        return this.post('/', cliente)
    }

    editar(id, cliente) {
        return this.put(`/${id}`, cliente)
    }

    deletar(id) {
        return this.delete(`/${id}`)
    }

    obterPorNomeCpfTelefone(busca) {
        return this.get(`?busca=${busca}`)
    }

    listar() {
        return this.get('/listar')
    }

    obterPorId(id) {
        return this.get(`/${id}`)
    }

    obterAnimais(id) {
        return this.get(`/${id}/animais`)
    }

    relatorioPfPj() {
        return this.get('/relatorioHome')
    }

    relatorioQuantidadeAnimais() {
        return this.get('/relatorioQuantidadeAnimal')
    }

    async getAnimais(id) {
        const x = [{ label: 'Selecione...', value: null }];

        await this.obterAnimais(id).then(response => {
            response.data.forEach(element => {
                x.push(element)
            });
        })


        console.log(x);

        return Promise.resolve(x);
    }

    obterUFs() {
        return [
            { label: 'Selecione...' },
            { label: 'AC' },
            { label: 'AL' },
            { label: 'AP' },
            { label: 'AM' },
            { label: 'BA' },
            { label: 'CE' },
            { label: 'DF' },
            { label: 'ES' },
            { label: 'GO' },
            { label: 'MA' },
            { label: 'MT' },
            { label: 'MS' },
            { label: 'MG' },
            { label: 'PA' },
            { label: 'PB' },
            { label: 'PR' },
            { label: 'PE' },
            { label: 'PI' },
            { label: 'RJ' },
            { label: 'RN' },
            { label: 'RS' },
            { label: 'RO' },
            { label: 'RR' },
            { label: 'SC' },
            { label: 'SP' },
            { label: 'SE' },
            { label: 'TO' },
        ]
    }

}

export default ClienteService