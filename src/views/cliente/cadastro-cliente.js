import React from 'react'


import FormGroup from '../../components/form-group'
import { withRouter } from 'react-router-dom'
import CpfCnpj from '../../components/inputs/cpfInput'
import SelectMenu from '../../components/selectMenu'
import ClienteService from '../../app/service/clienteService'
import { cpf } from 'cpf-cnpj-validator';
import { mensagemErro, mensagemSucesso } from '../../components/toastr';
import moment from 'moment'




class CadastroCliente extends React.Component {


    state = {
        nome: '',
        sobrenome: '',
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

    constructor() {
        super();
        this.service = new ClienteService();
    }

    validar() {
        const msgs = []

        console.log(cpf.strip(this.state.cpf))

        if (!this.state.nome) {
            msgs.push('O campo Nome é obrigatório.')
        }


        else if (!this.state.sobrenome) {
            msgs.push('O campo Sobrenome é obrigatório.')
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

        const cliente = {
            nome: this.state.nome + " " + this.state.sobrenome,
            cpf: this.state.cpf,
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
                    <div className="col-md-3">
                        <FormGroup id="inputNome" label="Nome: *">
                            <input type="text" className="form-control"
                                onChange={e => this.setState({ nome: e.target.value })} />
                        </FormGroup>
                    </div>
                    <div className="col-md-3">
                        <FormGroup id="inputSobrenome" label="Sobrenome: ">
                            <input type="text" className="form-control"
                                onChange={e => this.setState({ sobrenome: e.target.value })} />
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
                            <input type="date" t className="form-control"
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
                                onChange={e => this.setState({ telefone: e.target.value })} required />
                        </FormGroup>
                    </div>
                    <div className="col-md-3">
                        <FormGroup id="inputEmail" label="Email: *">
                            <input type="email" className="form-control"
                                onChange={e => this.setState({ email: e.target.value })}  /* TODO pattern=""*/ required />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputLogradouro" label="Logradouro: *">
                            <input type="text" className="form-control"
                                onChange={e => this.setState({ logradouro: e.target.value })}  /* TODO pattern=""*/ required />
                        </FormGroup>
                    </div>
                    <div className="col-md-2">
                        <FormGroup id="inputNumero" label="Número: *">
                            <input type="number" className="form-control"
                                onChange={e => this.setState({ numero: e.target.value })}/* TODO pattern=""*/ required />
                        </FormGroup>
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-3">
                        <FormGroup id="inputBairo" label="Bairro: *">
                            <input type="text" className="form-control"
                                onChange={e => this.setState({ bairro: e.target.value })}  /* TODO pattern=""*/ required />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputCidade" label="Cidade: *">
                            <input type="text" className="form-control"
                                onChange={e => this.setState({ cidade: e.target.value })} /* TODO pattern=""*/ required />
                        </FormGroup>
                    </div>
                    <div className="col-md-3">
                        <FormGroup id="inputCep" label="CEP: *">
                            <input type="text" className="form-control"
                                onChange={e => this.setState({ cep: e.target.value })} /* TODO pattern=""*/ required />
                        </FormGroup>
                    </div>

                    <div className="col-md-2">
                        <FormGroup id="inputUf" label="UF: *">
                            <SelectMenu className="form-control" lista={UFs}
                                onChange={e => this.setState({ uf: e.target.value })} />
                        </FormGroup>
                    </div>

                </div>

                <div className="row">
                    <div className="d-flex justify-content-end">
                        <div className="p-1">
                            <button onClick={this.cadastrar} type="button" className="btn btn-success">Salvar</button>
                        </div>
                        <div className="p-1">
                            <button onClick={this.cancelar} type="button" className="btn btn-danger">Cancelar</button>
                        </div>

                    </div>
                </div>


            </div>
        )
    }
}

export default withRouter(CadastroCliente)