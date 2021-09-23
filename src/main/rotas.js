import React from 'react'


import Login from '../views/login'
import Home from '../views/home'
import CadastroUsuario from '../views/cadastroUsuario'
import ClienteHome from '../views/cliente/cliente-home'
import FuncionarioHome from '../views/funcionario/funcionario-home'
import AgendamentoHome from '../views/agendamento/agenda-home'
import { AuthContext, AuthConsumer } from '../main/provedorAutenticacao';
import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'
import AnimalHome from '../views/animal/animal-home'
import ServicoHome from '../views/servico/servico-home'
import AuthService from '../app/service/authService'



function RotaAutenticada({ component: Component, isUsuarioAutenticado, ...props }) {
    return (
        <Route {...props} render={(componentProps) => {
            if (isUsuarioAutenticado) {
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

function Rotas(props) {
    return (
        <HashRouter>
            <Switch>
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cliente" component={ClienteHome} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/animal" component={AnimalHome} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-usuarios" component={CadastroUsuario} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/funcionario" component={FuncionarioHome} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/servico" component={ServicoHome} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/agendamento" component={AgendamentoHome} />
                <Redirect exact from="/" to="home" />
            </Switch>
        </HashRouter>
    )
}


export default () => (
    <AuthConsumer>
        {(context) => (<Rotas isUsuarioAutenticado={context.isAutenticado} />)}
    </AuthConsumer>
);
