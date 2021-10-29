import ApiService from "../apiservice";


class VendaService extends ApiService {

  constructor() {
    super('/api/vendas')
  }

  efetuarVendaServico(venda) {
    return this.post('/servico', venda)
  }

  efetuarVendaProduto(venda) {
    return this.post('/produto', venda)
  }

  listarOrdensPorCliente(busca){
    return this.get(`/listar/servicos?busca=${busca}`)
  }

}

export default VendaService