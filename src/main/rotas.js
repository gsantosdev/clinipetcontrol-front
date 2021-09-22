import React from 'react'


import Login from '../views/login'
import Home from '../views/home'
import AuthService from '../app/service/authService'
import CadastroUsuario from '../views/cadastroUsuario'
import ClienteHome from '../views/cliente/cliente-home'
import FuncionarioHome from '../views/funcionario/funcionario-home'
import AgendamentoHome from '../views/agendamento/agenda-home'

import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'
import AnimalHome from '../views/animal/animal-home'
import ServicoHome from '../views/servico/servico-home'


function RotaAutenticada({ component: Component, ...props }) {
    return (
        <Route {...props} render={(componentProps) => {
            if (AuthService.isUsuarioAutenticado()) {
                return (
                    <Component {...componentProps} />
                )
            }
            else {
                return (
                    <Redirect to={{ pathname: '/login', state: { from: componentProps.location } }} />
                )
            }
        }} />
    )
}

function Rotas() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/cliente" component={ClienteHome} />
                <RotaAutenticada path="/animal" component={AnimalHome} />
                <RotaAutenticada path="/cadastro-usuarios" component={CadastroUsuario} />
                <RotaAutenticada path="/funcionario" component={FuncionarioHome} />
                <RotaAutenticada path="/servico" component={ServicoHome} />
                <RotaAutenticada path="/agendamento" component={AgendamentoHome} />
                <Redirect exact from="/" to="login" />
            </Switch>
        </HashRouter>
    )
}


export default Rotas;
