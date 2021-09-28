import ApiService from "../apiservice";


class UsuarioService extends ApiService {

    constructor() {
        super('/api/usuarios')
    }

    autenticar(credenciais) {
        return this.post('/autenticar', credenciais)
    }

    obterSaldoPorUsuario(id) {
        return this.get(`/${id}/saldo`)

    }

    salvar(usuario) {
        return this.post('/', usuario)
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