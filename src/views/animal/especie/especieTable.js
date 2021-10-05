import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'

export default props => {

    const [pageNumber, setPageNumber] = useState(0)

    const especies = props.especies;
    console.log(especies)

    const especiesPerPage = 5
    const pagesVisited = pageNumber * especiesPerPage

    const rows = especies.slice(pagesVisited, pagesVisited + especiesPerPage).map((especie, index) => {
        return (

            <tr style={{ backgroundColor: index % 2 ? "rgb(250,250,250)" : "rgb(241,241,241" }} key={index}>
                <td className="col-md-8">{especie.nome}</td>

                <td>
                    <button type="button" onClick={e => props.editarAction(especie)} className="btn btn-primary">Editar</button>
                    <button type="button" onClick={e => props.deleteAction(especie)} className="btn btn-danger">Deletar</button>

                </td>
            </tr>
        )
    });


    const pageCount = Math.ceil(especies.length / especiesPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    return (

        <div style={{ overflowX: "auto" }}>
            <div style={{ height: 'max-content', marginBottom: '2rem', overflowX: "auto" }}>

                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Espécie</th>
                            <th scope="col">Ações</th>

                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>

                </table>
            </div>
            <div style={{ height: 'max-content', display: 'flex', boxSizing: 'border-box' }}>
                {especies.length > 0 ? <ReactPaginate
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