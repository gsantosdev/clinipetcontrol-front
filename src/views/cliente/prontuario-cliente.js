import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import FormGroup from '../../components/form-group';



class ProntuarioCliente extends React.Component {

  render() {
    return (
      <>
        <div className="p-3">
          <div className="d-flex flex-row p-3">
            <div className="col-md-12">
              <FormGroup label="Pesquisar por nome:">
                <div className="input-group">
                  <div className="form-outline">
                    <input id="search-input" type="search" id="form1" className="form-control" />
                  </div>
                  <button id="search-button" type="button" className="btn btn-primary">
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </FormGroup>
            </div>

          </div>




        </div>



      </>
    )
  }
}

export default ProntuarioCliente