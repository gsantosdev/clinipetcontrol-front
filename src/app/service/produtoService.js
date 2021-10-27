import ApiService from "../apiservice";


class ProdutoService extends ApiService {

  constructor() {
    super('/api/produtos')
  }

  salvar(produto) {
    return this.post('/', produto)
  }

  obterPorNome(busca) {
    return this.get(`/?busca=${busca}`)
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

}

export default ProdutoService