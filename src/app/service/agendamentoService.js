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

  obterDuracoes() {
    return [
      { label: 'Selecione...' },
      { label: '15 minutos', value: 15 },
      { label: '30 minutos', value: 30 },
      { label: '45 minutos', value: 45 },
      { label: '1 hora', value: 60 }
    ]
  }

}

export default AgendamentoService