import React from 'react';
import { withRouter } from 'react-router';
import Card from '../../components/card';

class AgendamentoHome extends React.Component {


  render() {
    return (
      <Card title="Agendamento">

        <div className="row d-flex justify-content-center">
          <h4 className="row pb-4">Selecione uma opção</h4>
          <div className="col-sm-12 col-md-4 col-lg-3 col-xl-3">
            <button className="btn btn-success" type="button" > Marcar Agendamento</button>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-3 col-xl-3">
            <button className="btn btn-warning" type="button" >Remarcar Reagendamento  </button>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-3 col-xl-3">
            <button className="btn btn-danger" type="button" > Desmarcar Reagendamento</button>
          </div>


        </div>
      </Card>
    );
  }
}


export default withRouter(AgendamentoHome)