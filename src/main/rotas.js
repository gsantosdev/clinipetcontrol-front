import React from 'react'


import Login from '../views/login'
import Home from '../views/home'
import CadastroUsuario from '../views/cadastroUsuario'
import ConsultaLancamentos from '../views/lancamentos/consulta-lancamentos'
import ClienteHome from '../views/cliente/cliente-home'
import FuncionarioHome from '../views/funcionario/funcionario-home'

import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'
import AnimalHome from '../views/animal/animal-home'
import ServicoHome from '../views/Servico/servico-home'

function Rotas() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/consulta-lancamentos" component={ConsultaLancamentos} />
                <Route path="/cliente" component={ClienteHome} />
                <Route path="/animal" component={AnimalHome} />
                <Route path="/cadastro-usuarios" component={CadastroUsuario} />
                <Route path="/funcionario" component={FuncionarioHome} />
                <Route path="/servico" component={ServicoHome} />
                <Redirect exact from="/" to="home" />
            </Switch>
        </HashRouter>
    )
}


export default Rotas;
