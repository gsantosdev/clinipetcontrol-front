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

  obterSexos() {
    return [
      { label: 'Selecione...' },
      { label: 'Macho' },
      { label: 'Fêmea' }
    ]
  }

  obterPortes() {
    return [
      { label: 'Selecione...' },
      { label: 'Grande' },
      { label: 'Médio' },
      { label: 'Pequeno' }
    ]
  }



}

export default AgendamentoService