import ApiService from '../apiservice'

export default class LancamentoService extends ApiService {
    constructor() {
        super('/api/lancamentos')
    }

    salvar(lancamento) {
        return this.post(`/`, lancamento)
    }

    atualizar(status, id) {
        return this.put(`/${id}/atualiza-status`, status)
    }

    getSaldoCaixa() {
        return this.get('/caixa');
    }

    getLancamentosReceitaOrdenados() {
        return this.get('/listarReceitas')
    }

    findByIdsIn(ids) {
        return this.post('/findByIdIn', ids)
    }


    getLancamentosDespesaOrdenados() {
        return this.get('/listarDespesas')
    }

    findReceita(busca) {
        return this.get(`/findReceita?busca=${busca}`)
    }

    obterListaMeses() {
        return [
            { label: 'Selecione...', value: '' },
            { label: 'Janeiro', value: 1 },
            { label: 'Fevereiro', value: 2 },
            { label: 'Março', value: 3 },
            { label: 'Abril', value: 4 },
            { label: 'Maio', value: 5 },
            { label: 'Junho', value: 6 },
            { label: 'Julho', value: 7 },
            { label: 'Agosto', value: 8 },
            { label: 'Setembro', value: 9 },
            { label: 'Outubro', value: 10 },
            { label: 'Novembro', value: 11 },
            { label: 'Dezembro', value: 12 }
        ]
    }

    obterListaTipos() {
        return [
            { label: 'Selecione...', value: '' },
            { label: 'Despesa', value: 'DESPESA' },
            { label: 'Receita', value: 'RECEITA' }
        ]

    }

    obterListaStatus() {
        return [
            { label: 'Selecione...', value: '' },
            { label: 'Pendente', value: 'PENDENTE' },
            { label: 'Concluido', value: 'CONCLUIDO' }
        ]

    }

    consultar(lancamentoFiltro) {
        let params = `?ano=${lancamentoFiltro.ano}`

        if (lancamentoFiltro.mes) {
            params = `${params}&mes=${lancamentoFiltro.mes}`
        }

        if (lancamentoFiltro.tipo) {
            params = `${params}&mes=${lancamentoFiltro.tipo}`
        }

        if (lancamentoFiltro.status) {
            params = `${params}&status=${lancamentoFiltro.status}`
        }

        if (lancamentoFiltro.usuario) {
            params = `${params}&usuario=${lancamentoFiltro.usuario}`
        }

        if (lancamentoFiltro.descricao) {
            params = `${params}&descricao=${lancamentoFiltro.descricao}`

        }
        return this.get(params)
    }

    deletar(id) {
        return this.delete(`/${id}`)
    }
}