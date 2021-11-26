import React from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import CadastroCliente from './cadastro-cliente'
import ProntuarioCliente from './prontuario-cliente'
import RelatorioCliente from './relatorio-cliente'




class ClienteHome extends React.Component {
    render() {
        return (
            <div className="container-fluid">

                <Tabs unmountOnExit defaultActiveKey="cadastro" id="uncontrolled-tab">
                    <Tab eventKey="cadastro" title="Cadastro">
                        <Card title="Cadastro de Clientes">
                            <CadastroCliente />
                        </Card>
                    </Tab>
                    <Tab eventKey="consultar" title="Consultar/Editar/Deletar">
                        <Card title="Consultar/Editar/Deletar">
                            <ProntuarioCliente />
                        </Card>
                    </Tab>
                    <Tab eventKey="relatorios" title="Relatorios">
                        <Card title="Relatórios de cliente">
                            <RelatorioCliente />
                        </Card>
                    </Tab>

                </Tabs>


            </div>
        )
    }

}


export default withRouter(ClienteHome)