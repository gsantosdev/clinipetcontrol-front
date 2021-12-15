import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'

export default props => {

    const [pageNumber, setPageNumber] = useState(0)

    const historico = props.historico;
    console.log(historico)

    const historicoPerPage = 5
    const pagesVisited = pageNumber * historicoPerPage

    const rows = historico.slice(pagesVisited, pagesVisited + historicoPerPage).map((item, index) => {
        return (

            <tr style={{ backgroundColor: index % 2 ? "rgb(250,250,250)" : "rgb(241,241,241" }} key={index}>
                <td>{item.nomeServico}</td>
                <td>{item.nomeFuncionario}</td>
                <td>{new Date(item.updatedAt).toLocaleDateString() + " " + new Date(item.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>

                <td>

                </td>
            </tr>
        )
    });

    const pageCount = Math.ceil(historico.length / historicoPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }


    return (

        <div style={{ overflowX: "auto" }}>
            <div style={{ height: 'max-content', marginBottom: '2rem', overflowX: "auto" }}>

                <table className="table table-hover table-sm-responsive">
                    <thead>
                        <tr>
                            <th scope="col">Serviço</th>
                            <th scope="col">Colaborador</th>
                            <th scope="col">Finalizado em</th>

                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>

                </table>
            </div>

            <div style={{ height: 'max-content', display: 'flex', boxSizing: 'border-box' }}>
                {historico.length > 0 ? <ReactPaginate
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
        </div >


    )
}