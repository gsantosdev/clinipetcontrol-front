import React from "react";
import { withRouter } from "react-router";

class NotFound extends React.Component {

   voltarHome = () => {
    this.props.history.push('/home')
  }

  render() {
    return (
      <div className="jumbotron">
        <div className="d-flex justify-content-center">
          <h1 className="display-3"><b>404 - Recurso não encontrado!</b></h1>

        </div>

        <hr className="my-4" />
        <div className="d-flex justify-content-center">
          <div className="p-1">
            <button onClick={() => this.voltarHome()} type="button" className="btn btn-success" style={{ backgroundColor: '#256597' }}>Voltar</button>
          </div>
        </div>


      </div>
    )
  }
}

export default withRouter(NotFound)