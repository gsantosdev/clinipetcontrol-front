import ApiService from "../apiservice";


class AgendamentoService extends ApiService {

  constructor() {
    super('/api/agendamentos')
  }

  salvar(agendamento) {
    return this.post('/', agendamento)
  }

  editar(id, agendamento) {
    return this.put(`/${id}`, agendamento)
  }

  deletar(id) {
    return this.delete(`/${id}`)
  }

  listar() {
    return this.get("/listar")
  }

}

export default AgendamentoService