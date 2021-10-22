import ApiService from "../apiservice";


class VendaService extends ApiService {

  constructor() {
    super('/api/vendas')
  }

  efetuar(venda) {
    return this.post('/', venda)
  }

  listarOrdensPorCliente(busca){
    return this.get(`/listar/servicos?busca=${busca}`)
  }

}

export default VendaService