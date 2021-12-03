import React from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import { AuthConsumer } from '../main/provedorAutenticacao'
import AgendamentoHome from '../views/agendamento/agenda-home'
import AnimalHome from '../views/animal/animal-home'
import UsuarioHome from '../views/usuario/usuario-home'
import ClienteHome from '../views/cliente/cliente-home'
import FuncionarioHome from '../views/funcionario/funcionario-home'
import Home from '../views/home'
import Login from '../views/login/login'
import NotFound from '../views/redirects/notFound'
import ServicoHome from '../views/servico/servico-home'
import ComercialHome from '../views/comercial/comercial-home'
import CaixaHome from '../views/caixa/caixa-home'
import ProdutoHome from '../views/produto/produto-home'




function RotaAutenticada({ component: Component, isUsuarioAutenticado, ...props }) {
    return (
        <Route {...props} render={(componentProps) => {
            if (isUsuarioAutenticado) {

                if (props.isAutorizado) {
                    return (
                        <Component {...componentProps} />
                    )
                }
                else {
                    console.log(props);
                    return (
                        <Redirect to={{ pathname: '/404', state: { from: componentProps.location } }} />
                    )
                }

            }
            else {
                return (
                    <Redirect to={{ pathname: '/login', state: { from: componentProps.location } }} />
                )
            }
        }} />
    )
}//|

function Rotas(props) {
    console.log(props)
    return (
        <HashRouter>
            <Switch>
                {/* DEFINIR PRIVILEGIOS DE CADA USUÁRIO */}

                <RotaAutenticada isAutorizado={props.isAdmin || props.isSecretaria || props.isVeterinario} isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <RotaAutenticada isAutorizado={props.isAdmin || props.isSecretaria} isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cliente" component={ClienteHome} />
                <RotaAutenticada isAutorizado={props.isAdmin || props.isSecretaria} isUsuarioAutenticado={props.isUsuarioAutenticado} path="/animal" component={AnimalHome} />
                <RotaAutenticada isAutorizado={props.isAdmin} isUsuarioAutenticado={props.isUsuarioAutenticado} path="/colaboradores" component={FuncionarioHome} />
                <RotaAutenticada isAutorizado={props.isAdmin} isUsuarioAutenticado={props.isUsuarioAutenticado} path="/servico" component={ServicoHome} />
                <RotaAutenticada isAutorizado={props.isAdmin || props.isSecretaria} isUsuarioAutenticado={props.isUsuarioAutenticado} path="/agendamento" component={AgendamentoHome} />
                <RotaAutenticada isAutorizado={props.isAdmin} isUsuarioAutenticado={props.isUsuarioAutenticado} path="/usuarios" component={UsuarioHome} />
                <RotaAutenticada isAutorizado={props.isAdmin || props.isSecretaria} isUsuarioAutenticado={props.isUsuarioAutenticado} path="/comercial" component={ComercialHome} />
                <RotaAutenticada isAutorizado={props.isAdmin || props.isSecretaria} isUsuarioAutenticado={props.isUsuarioAutenticado} path="/caixa" component={CaixaHome} />
                <RotaAutenticada isAutorizado={props.isAdmin || props.isSecretaria} isUsuarioAutenticado={props.isUsuarioAutenticado} path="/produto" component={ProdutoHome} />



                <Route path="/404" component={NotFound} />

                <Redirect exact from="/" to="home" />
            </Switch>
        </HashRouter>
    )
}


export default () => (
    <AuthConsumer>
        {(context) => (<Rotas usuario={context.usuarioAutenticado} isUsuarioAutenticado={context.isAutenticado} isSecretaria={context.isSecretaria} isAdmin={context.isAdmin} isVeterinario={context.isVeterinario} />)}
    </AuthConsumer>
);
