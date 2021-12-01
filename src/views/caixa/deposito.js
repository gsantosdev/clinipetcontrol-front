import React from 'react'


class Deposito extends React.Component {

  render() {


    return (
      <div className="col-6 justify-content-center mb-3">

        <Card title="Filtrar por data">

          <div className="row">
            <div className="col-sm-12 col-md-6 col-xl-6 col-xxl-6">
              <FormGroup id="inputdataInicial" label="Data inicial: *">
                <input id="dataInicial" type="date" className="form-control"
                         /* TODO pattern=""*/ required />
              </FormGroup>
            </div>


            <div className="col-sm-12 col-md-6 col-xl-6 col-xxl-6 mb-2">
              <FormGroup id="inputDataFinal" label="Data final: *">
                <input id="dataFinal" type="date" className="form-control"
                         /* TODO pattern=""*/ required />
              </FormGroup>
            </div>
            <div className="d-flex justify-content-end">
              <div className="p-1">
                <button onClick={this.props.editar ? this.editar : this.cadastrar} type="button" className="btn btn-success">Filtrar</button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  }




}






export default Deposito