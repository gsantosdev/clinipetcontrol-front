import React from 'react'


import FormGroup from '../../components/form-group'
import { withRouter } from 'react-router-dom'
import CpfCnpj from '../../components/inputs/cpfInput'
import SelectMenu from '../../components/selectMenu'



class CadastroCliente extends React.Component {


    state = {
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
    render() {

        const UFs = [
            { label: 'AC' },
            { label: 'AL' },
            { label: 'AP' },
            { label: 'AM' },
            { label: 'BA' },
            { label: 'CE' },
            { label: 'DF' },
            { label: 'ES' },
            { label: 'GO' },
            { label: 'MA' },
            { label: 'MT' },
            { label: 'MS' },
            { label: 'MG' },
            { label: 'PA' },
            { label: 'PB' },
            { label: 'PR' },
            { label: 'PE' },
            { label: 'PI' },
            { label: 'RJ' },
            { label: 'RN' },
            { label: 'RS' },
            { label: 'RO' },
            { label: 'RR' },
            { label: 'SC' },
            { label: 'SP' },
            { label: 'SE' },
            { label: 'TO' },
        ]


        return (
            <div className="row mb-3">
                <div className="row">
                    <div className="col-md-3">
                        <FormGroup id="inputNome" label="Nome: *">
                            <input type="text" className="form-control" />
                        </FormGroup>
                    </div>
                    <div className="col-md-3">
                        <FormGroup id="inputNome" label="Sobrenome: ">
                            <input type="text" className="form-control" />
                        </FormGroup>
                    </div>

                    <div className="col-md-3">
                        <FormGroup id="inputCpf" label="CPF: *">
                            <CpfCnpj
                                /* TODO pattern=""*/
                                maxlenght="11"
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
                            <input type="date" className="form-control"  /* TODO pattern=""*/ required />
                        </FormGroup>
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-3">
                        <FormGroup id="inputTelefone" label="Telefone: *">
                            <input type="tel" class="form-control" id="tel" placeholder="(00) 0000-0000" name="tel" maxlength="15" pattern="\(\d{2}\)\s*\d{5}-\d{4}" required />
                        </FormGroup>
                    </div>
                    <div className="col-md-3">
                        <FormGroup id="inputEmail" label="Email: *">
                            <input type="email" class="form-control"  /* TODO pattern=""*/ required />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputLogradouro" label="Logradouro: *">
                            <input type="text" class="form-control"  /* TODO pattern=""*/ required />
                        </FormGroup>
                    </div>
                    <div className="col-md-2">
                        <FormGroup id="inputNumero" label="Número: *">
                            <input type="number" class="form-control"  /* TODO pattern=""*/ required />
                        </FormGroup>
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-3">
                        <FormGroup id="inputBairo" label="Bairro: *">
                            <input type="text" class="form-control"  /* TODO pattern=""*/ required />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputCidade" label="Cidade: *">
                            <input type="text" class="form-control"  /* TODO pattern=""*/ required />
                        </FormGroup>
                    </div>
                    <div className="col-md-3">
                        <FormGroup id="inputCep" label="CEP: *">
                            <input type="text" class="form-control"  /* TODO pattern=""*/ required />
                        </FormGroup>
                    </div>

                    <div className="col-md-2">
                        <FormGroup id="inputUf" label="UF: *">
                            <SelectMenu className="form-control" lista={UFs} />
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