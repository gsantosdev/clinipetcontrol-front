import ApiService from "../apiservice";


class ProdutoService extends ApiService {

  constructor() {
    super('/api/produtos')
  }

  salvar(produto) {
    return this.post('/', produto)
  }

  obterPorNomeOuMarca(busca) {
    return this.get(`/?busca=${busca}`)
  }

  obterPorNomeOuMarcaComEstoque(busca) {
    return this.get(`/?busca=${busca}&comEstoque=true`)
  }

  editar(id, produto) {
    return this.put(`/${id}`, produto)
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

}

export default ProdutoService