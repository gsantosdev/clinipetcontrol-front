import { formatCPF } from '@brazilian-utils/brazilian-utils';
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'

export default props => {

    const [pageNumber, setPageNumber] = useState(0)

    const clientes = props.clientes;
    console.log(clientes)

    const clientesPerPage = 5
    const pagesVisited = pageNumber * clientesPerPage

    const rows = clientes.slice(pagesVisited, pagesVisited + clientesPerPage).map((cliente, index) => {
        return (
            <tr style={{ backgroundColor: index % 2 ? "rgb(250,250,250)" : "rgb(241,241,241" }} key={index}>
                <td>{cliente.nome}</td>
                <td>{formatCPF(cliente.cpf)}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefone}</td>

                <td>

                    {props.telaAnimal ?
                        <input name="cliente" type="radio" defaultChecked={props.selecionado === cliente.id} onClick={e => props.selectAction(cliente)}></input> :

                        <div className="d-flex justify-content-start">
                            <button type="button" onClick={e => props.editarAction(cliente)} className="btn btn-primary">Editar</button>
                            <button type="button" onClick={e => props.deleteAction(cliente)} className="btn btn-danger">Deletar</button>
                        </div>
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
                            <th scope="col">Nome</th>
                            <th scope="col">CPF</th>
                            <th scope="col">Email</th>
                            <th scope="col">Telefone</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody className="col-12">
                        {rows}
                    </tbody>

                </table>
            </div>

            <div style={{ height: 'max-content', display: 'flex', boxSizing: 'border-box' }}>
                {clientes.length > 0 ? <ReactPaginate
                    previousLabel={"Anterior"}
                    nextLabel={"Próximo"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previouBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    pageLinkClassName={"paginationLink"}
                    activeClassName={"paginationActive"}
                    activeLinkClassName={"paginationActive"}
                /> : false}
            </div>

        </div>


    )
}