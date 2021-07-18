import ApiService from "../apiservice";


class FuncionarioService extends ApiService {

  constructor() {
    super('/api/funcionarios')
  }

  salvar(funcionario) {
    return this.post('/', funcionario)
  }

  editar(id, funcionario) {
    return this.put(`/${id}`, funcionario)
  }

  deletar(id) {
    return this.delete(`/${id}`)
  }

  obterPorId(id) {
    return this.get(`/${id}`)
  }

  obterPorNomeTelefone(busca) {
    return this.get(`?busca=${busca}`)
  }

  listar() {
    return this.get(`/listar`)
  }

  obterSexos() {
    return [
      { label: 'Selecione...' },
      { label: 'Masculino' },
      { label: 'Feminino' }
    ]
  }


}

export default FuncionarioService