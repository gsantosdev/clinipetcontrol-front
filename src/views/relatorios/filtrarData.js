import React from "react";
import Card from "../../components/card";
import FormGroup from '../../components/form-group';




class FiltrarData extends React.Component {


  render() {

    return (
      <div className="col-6 justify-content-center mb-3">

        <Card title="Filtrar por data">

          <div className="row">
            <div className="col-sm-12 col-md-6 col-xl-6 col-xxl-6">
              <FormGroup id="inputdataInicial" label="Data inicial: *">
                <input id="dataInicial"
                  type="date"
                  className="form-control"
                  value={this.state.dataInicial}


                   /* TODO pattern=""*/ required />
              </FormGroup>
            </div>

            <div className="col-sm-12 col-md-6 col-xl-6 col-xxl-6 mb-2">
              <FormGroup id="inputDataFinal" label="Data final: *">
                <input id="dataFinal"
                  type="date"
                  className="form-control"
                  value={this.state.dataFinal}

                   /* TODO pattern=""*/ required />
              </FormGroup>
            </div>
            <div className="d-flex justify-content-end">
              <div className="p-1">
                <button onClick={this.props.gerarRelatorio(this.state.dataInicial, this.state.dataFinal)} type="button" className="btn btn-success">Filtrar</button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  }




}

export default FiltrarData



