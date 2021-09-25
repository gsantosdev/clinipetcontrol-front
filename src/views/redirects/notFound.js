import React from "react";
import { withRouter } from "react-router";

class NotFound extends React.Component {

  state = {
  }

  constructor() {
    super();
  }

  voltarHome = () =>{
    this.props.history.push('/home')
  }

  render() {
    return (
      <div className="jumbotron">
        <div className="d-flex justify-content-center">
          <h1 className="display-3"><b>404</b></h1>
        </div>

        <hr className="my-4" />

        <input type="button" value="VOLTAR" onClick={()=>this.voltarHome()}></input>

      </div>
    )
  }
}

export default withRouter(NotFound)