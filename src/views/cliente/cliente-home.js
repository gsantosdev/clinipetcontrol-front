import React from 'react'

import {withRouter} from 'react-router-dom'
import CadastroCliente from './cadastro-cliente'

import Card from '../../components/card'

class ClienteHome extends React.Component{
    render(){
        return(
            <Card title="Cadastro de Clientes">
                <CadastroCliente/>
            </Card>
        )
    }

}


export default withRouter(ClienteHome)