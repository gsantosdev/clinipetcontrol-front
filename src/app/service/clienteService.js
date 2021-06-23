import ApiService from "../apiservice";


class ClienteService extends ApiService{

    constructor(){
        super('/api/clientes')
    }

    salvar(usuario){
        return this.post('/', usuario)
    }

/*
    obterSaldoPorUsuario(id){
        return this.get(`/${id}/saldo`)

    }

 */   
}

export default ClienteService