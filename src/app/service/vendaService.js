import ApiService from "../apiservice";


class VendaService extends ApiService {

  constructor() {
    super('/api/vendas')
  }

  efetuar(venda) {
    return this.post('/', venda)
  }

}

export default VendaService