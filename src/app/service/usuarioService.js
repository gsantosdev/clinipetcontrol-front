import ApiService from "../apiservice";


class UsuarioService extends ApiService {

    constructor() {
        super('/api/usuarios')
    }

    autenticar(credenciais) {
        return this.post('/autenticar', credenciais)
    }

    salvar(usuario) {
        return this.post('/', usuario)
    }


    editar(id, usuario) {
        return this.put(`/${id}`, usuario)
    }

    deletar(id){
        return this.delete(`/${id}`)
    }


    obterPorNome(busca) {
        return this.get(`?busca=${busca}`)
    }

    listarTipos() {
        return this.get(`/tipos`)
    }

    async getTipos() {
        const x = [{ label: 'Selecione...' }];

        await this.listarTipos().then(response => {
            response.data.forEach(element => {
                x.push(element)
            });
        })

        return Promise.resolve(x);
    }
}

export default UsuarioService