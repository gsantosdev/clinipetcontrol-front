import { formatCPF } from '@brazilian-utils/brazilian-utils';
import React from 'react'

export default props => {


    const rows = itens.slice(pagesVisited, pagesVisited + clientesPerPage).map((item, index) => {
        return (
            <tr style={{ backgroundColor: index % 2 ? "rgb(250,250,250)" : "rgb(241,241,241" }} key={index}>
                <td>{item.nome}</td>
                <td>{formatCPF(cliente.cpf)}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefone}</td>

                <td>
                    {props.telaAnimal ?
                        <input name="cliente" type="radio" defaultChecked={props.selecionado === cliente.id} onClick={e => props.selectAction(cliente)}></input> : <div>
                            <button type="button" onClick={e => props.editarAction(item)} className="btn btn-primary">Editar</button>
                            <button type="button" onClick={e => props.deleteAction(item)} className="btn btn-danger">Deletar</button></div>
                    }

                </td>
            </tr>

        )
    });

    const pageCount = Math.ceil(clientes.length / clientesPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    return (

        <div className="table-responsive">
            <div style={{ height: 'max-content', marginBottom: '2rem', overflowX: "auto" }}>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Tipo</th>
                            <th scope="col">Valor</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody className="col-12">
                        {rows}
                    </tbody>

                </table>
            </div>

  

        </div>


    )
}