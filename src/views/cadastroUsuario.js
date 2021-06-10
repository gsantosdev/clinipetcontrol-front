import React from 'react'

import Card from '../components/card'

import FormGroup from '../components/form-group'

class CadastroUsuario extends React.Component {


    state = {
        nome:'',
        email:'',
        senha:'',
        senhaRepeticao:''
    }

    cadastrar = () =>{
        console.log(this.state)
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="bs-component">
                            <Card title=" Cadastro de Usuário">
                                <FormGroup label="Nome: *" htmlFor="inputNome">
                                    <input className="form-control" type="text"
                                    id="inputNome"
                                    name="nome"
                                    onChange={e => this.setState({nome: e.target.value})}
                                    />
                                </FormGroup>
                                <FormGroup label="Email: *" htmlFor="inputEmail">
                                    <input className="form-control" 
                                    type="email"
                                    id="inputEmail"
                                    name="email"
                                    onChange={e => this.setState({email: e.target.value})}
                                    />
                                </FormGroup>
                                <FormGroup label="Senha: *" htmlFor="inputSenha">
                                    <input className="form-control" 
                                    type="password"
                                    id="inputSenha"
                                    name="senha"
                                    onChange={e => this.setState({senha: e.target.value})}
                                    />
                                </FormGroup>
                                <FormGroup label="Repita a senha: *" htmlFor="inputRepitaSenha">
                                    <input className="form-control" 
                                    type="password"
                                    id="inputRepitaSenha"
                                    name="senhaRepeticao"
                                    onChange={e => this.setState({senhaRepeticao: e.target.value})}
                                    />
                                </FormGroup>
                                <button onClick={this.cadastrar} type="button" className="btn btn-success">Salvar</button>
                                <button type="button" className="btn btn-danger">Cancelar</button>

                            </Card>
                        </div>
                    </div>
                </div>

        )
    }
}

export default CadastroUsuario