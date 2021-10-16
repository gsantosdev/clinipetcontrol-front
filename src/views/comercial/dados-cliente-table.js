import React from 'react'
import { formatCPF } from '@brazilian-utils/brazilian-utils';


export default props => {
  return (
    <div className="table-responsive">
      <div style={{ height: 'max-content', marginBottom: '2rem', overflowX: "auto" }}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th style={{ whiteSpace: 'nowrap', border: '0.1px solid', borderRight: 'none' }} scope="row">Nome:</th>
              <th style={{ whiteSpace: 'nowrap', border: '0.1px solid', borderLeft: 'none' }} scope="row">{props.cliente.nome}</th>
              <th style={{ whiteSpace: 'nowrap', border: '0.1px solid', borderRight: 'none' }} scope="row">CPF:</th>
              <th style={{ whiteSpace: 'nowrap', border: '0.1px solid', borderLeft: 'none' }} scope="row">{formatCPF(props.cliente.cpf)}</th>
              <th style={{ whiteSpace: 'nowrap', border: '0.1px solid', borderRight: 'none' }} scope="row">Telefone:</th>
              <th style={{ whiteSpace: 'nowrap', border: '0.1px solid', borderLeft: 'none' }} scope="row">{props.cliente.telefone}</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );

}
