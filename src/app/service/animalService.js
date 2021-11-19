import ApiService from "../apiservice";


class AnimalService extends ApiService {

  constructor() {
    super('/api/animais')
  }

  salvar(animal) {
    return this.post('/', animal)
  }

  editar(id, animal) {
    return this.put(`/${id}`, animal)
  }

  deletar(id) {
    return this.delete(`/${id}`)
  }

  obterHistorico(id) {
    return this.get(`/historico/${id}`)
  }

  obterPorNome(busca) {
    return this.get(`?busca=${busca}`)
  }

  listar() {
    return this.get('/listar')
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

export default AnimalService