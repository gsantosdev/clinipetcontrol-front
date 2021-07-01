import React from 'react'


import FormGroup from '../../components/form-group'
import { withRouter } from 'react-router-dom'
import CpfCnpj from '../../components/inputs/cpfInput'
import SelectMenu from '../../components/selectMenu'
import ClienteService from '../../app/service/clienteService'
import { cpf } from 'cpf-cnpj-validator';
import { mensagemErro, mensagemSucesso } from '../../components/toastr';
import moment from 'moment'
import { onlyNumbers } from '@brazilian-utils/brazilian-utils'



class CadastroCliente extends React.Component {


    state = {
        id: null,
        nome: '',
        cpf: '',
        maskCpf: '',
        dataNascimento: '',
        telefone: '',
        email: '',
        logradouro: '',
        numero: '',
        bairro: '',
        cep: '',
        cidade: '',
        uf: ''
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name]: value })
    }

    limpaCampos() {
        Object.keys(this.state).forEach(key => {
            this.setState({ [key]: '' })
        })
        document.getElementById("dataNascimento").value = '';

    }

    constructor(props) {
        super(props);
        this.service = new ClienteService();

    }

    componentDidMount() {
        console.log(this.props.state)
        this.setState(this.props.state)
    }

    validar() {
        const msgs = []

        console.log(cpf.strip(this.state.cpf))

        if (!this.state.nome) {
            msgs.push('O campo Nome é obrigatório.')
        }

        else if (!this.state.cpf) {
            msgs.push('O campo CPF é obrigatório.')
        }
        else if (!(cpf.isValid(cpf.strip(this.state.cpf)))) {
            msgs.push('O campo CPF está invalido')
        }

        else if (!this.state.dataNascimento) {
            msgs.push('O campo Data de Nascimento é obrigatório.')
        }

        else if (!this.state.telefone) {
            msgs.push('O campo Telefone é obrigatório.')
        }

        else if (!this.state.email) {
            msgs.push('O campo Email é obrigatório.')
        }
        else if (!this.state.email.match(/^[a-z0-9.]+@[a-z0-9.]+\.[a-z]/)) {
            msgs.push('Informe um email válido.')
        }
        else if (!this.state.email) {
            msgs.push('O campo Email é obrigatório.')
        }

        else if (!this.state.logradouro) {
            msgs.push('O campo Logradouro é obrigatório.')
        }

        else if (!this.state.numero) {
            msgs.push('O campo Número é obrigatório.')
        }

        else if (!this.state.bairro) {
            msgs.push('O campo Bairro é obrigatório.')
        }

        else if (!this.state.cidade) {
            msgs.push('O campo Cidade é obrigatório.')
        }

        else if (!this.state.cep) {
            msgs.push('O campo CEP é obrigatório.')
        }

        else if (!this.state.uf) {
            msgs.push('O campo UF é obrigatório.')
        }
        else if (this.state.uf == "Selecione...") {
            msgs.push('O campo UF esta ínvalido')
        }

        return msgs
    }

    cadastrar = () => {
        const msgs = this.validar()

        if (msgs && msgs.length > 0) {
            msgs.forEach((msg, index) => {
                mensagemErro(msg)
            });
            return false;
        }

        console.log(onlyNumbers(this.state.cpf))

        const cliente = {
            nome: this.state.nome,
            cpf: onlyNumbers(this.state.cpf),
            dataNascimento: this.state.dataNascimento,
            telefone: this.state.telefone,
            email: this.state.email,
            logradouro: this.state.logradouro,
            numero: this.state.numero,
            bairro: this.state.bairro,
            cep: this.state.cep,
            cidade: this.state.cidade,
            uf: this.state.uf
        }

        this.service.salvar(cliente)
            .then(response => {
                mensagemSucesso(response)
                this.limpaCampos()
                //this.props.history.push('/login')
            }).catch(error => {
                mensagemErro(error.response.data)
            })
    }

    editar = () => {

        const msgs = this.validar()

        if (msgs && msgs.length > 0) {
            msgs.forEach((msg, index) => {
                mensagemErro(msg)
            });
            return false;
        }


        const cliente = {
            id: this.state.id,
            nome: this.state.nome,
            cpf: onlyNumbers(this.state.cpf),
            dataNascimento: this.state.dataNascimento,
            telefone: this.state.telefone,
            email: this.state.email,
            logradouro: this.state.logradouro,
            numero: this.state.numero,
            bairro: this.state.bairro,
            cep: this.state.cep,
            cidade: this.state.cidade,
            uf: this.state.uf
        }

        this.service.editar(this.state.id, cliente)
            .then(response => {
                mensagemSucesso(response)
                //this.props.history.push('/login')
            }).catch(error => {
                mensagemErro(error.response.data)
            })
    }

    render() {

        const UFs = this.service.obterUFs()

        return (
            <div className="row mb-3">
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputNome" label="Nome completo: *">
                            <input type="text" className="form-control"
                                value={this.state.nome}
                                name="nome"
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>

                    <div className="col-md-3">
                        <FormGroup id="inputCpf" label="CPF: *">
                            <CpfCnpj
                                /* TODO pattern=""*/
                                className="form-control"
                                value={this.state.cpf}
                                onChange={(e, type) => {
                                    this.setState({ cpf: e.target.value, maskCpf: type === "CPF" });
                                }}
                            />
                        </FormGroup>
                    </div>
                    <div className="col-md-3">
                        <FormGroup id="inputDataNascimento" label="Data de nascimento: *">
                            <input id="dataNascimento" type="date" className="form-control"
                                value={moment(this.state.dataNascimento, "DD/MM/YYYY").format("YYYY-MM-DD")}
                                onChange={async e => {
                                    await this.setState({
                                        dataNascimento: moment(e.target.value, "YYYY-MM-DD").format("DD/MM/YYYY")
                                    })
                                    console.log(this.state.dataNascimento)
                                }}

                             /* TODO pattern=""*/ required />
                        </FormGroup>
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-3">
                        <FormGroup id="inputTelefone" label="Telefone: *">
                            <input type="tel" className="form-control" id="tel" placeholder="(00) 0000-0000"
                                name="tel" maxLength="15" pattern="\(\d{2}\)\s*\d{5}-\d{4}"
                                value={this.state.telefone}
                                name="telefone"
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-3">
                        <FormGroup id="inputEmail" label="Email: *">
                            <input type="email" className="form-control"
                                value={this.state.email}
                                name="email"
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputLogradouro" label="Logradouro: *">
                            <input type="text" className="form-control"
                                value={this.state.logradouro}
                                name="logradouro"
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-2">
                        <FormGroup id="inputNumero" label="Número: *">
                            <input type="number" className="form-control"
                                value={this.state.numero}
                                name="numero"
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-3">
                        <FormGroup id="inputBairo" label="Bairro: *">
                            <input type="text" className="form-control"
                                value={this.state.bairro}
                                name="bairro"
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputCidade" label="Cidade: *">
                            <input type="text" className="form-control"
                                value={this.state.cidade}
                                name="cidade"
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-3">
                        <FormGroup id="inputCep" label="CEP: *">
                            <input type="text" className="form-control"
                                value={this.state.cep}
                                name="cep"
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>

                    <div className="col-md-2">
                        <FormGroup id="inputUf" label="UF: *">
                            <SelectMenu className="form-control" lista={UFs}
                                value={this.state.uf}
                                name="uf"
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>

                </div>

                <div className="row">
                    <div className="d-flex justify-content-end">
                        <div className="p-1">
                            <button onClick={this.props.editar ? this.editar : this.cadastrar} type="button" className="btn btn-success">Salvar</button>
                        </div>
                        <div className="p-1">
                            <button hidden={this.props.editar} onClick={this.cancelar} type="button" className="btn btn-danger">Cancelar</button>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}

export default withRouter(CadastroCliente)