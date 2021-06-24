import React from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import CadastroCliente from './cadastro-cliente'
import ProntuarioCliente from './prontuario-cliente'




class ClienteHome extends React.Component {
    render() {
        return (
            <div className="jumbotron">

                <Tabs defaultActiveKey="cadastro" id="uncontrolled-tab">
                    <Tab eventKey="cadastro" title="Cadastro">
                        <Card title="Cadastro de Clientes">
                            <CadastroCliente />
                        </Card>
                    </Tab>
                    <Tab eventKey="prontuario" title="Prontuário">
                        <Card title="Prontuário">
                            <ProntuarioCliente/>
                        </Card>
                    </Tab>
                    <Tab eventKey="contact" title="Agendamentos">
                        <Card title="Agendamentos">

                        </Card>
                    </Tab>
                </Tabs>


            </div>
        )
    }

}


export default withRouter(ClienteHome)