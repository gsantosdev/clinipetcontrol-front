import ApiService from "../apiservice";


class ClienteService extends ApiService {

    constructor() {
        super('/api/clientes')
    }

    salvar(usuario) {
        return this.post('/', usuario)
    }

    obterPorNomeCpfTelefone(busca){
        return this.get(`?busca=${busca}`)
    }

    deletar(id){
        return this.delete(`/${id}`)
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

    /*
        obterSaldoPorUsuario(id){
            return this.get(`/${id}/saldo`)
    
        }
    
     */
}

export default ClienteService