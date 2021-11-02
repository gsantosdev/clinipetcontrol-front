import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'

export default props => {

    const [pageNumber, setPageNumber] = useState(0)

    const servicos = props.servicos;
    console.log(servicos)



    const servicosPerPage = 5
    const pagesVisited = pageNumber * servicosPerPage

    const rows = servicos.slice(pagesVisited, pagesVisited + servicosPerPage).map((servico, index) => {
        return (

            <tr style={{ backgroundColor: index % 2 ? "rgb(250,250,250)" : "rgb(241,241,241" }} key={index}>
                <td>{servico.nome}</td>
                <td>{servico.observacoes}</td>

                <td>
                    {props.telaAgendamento ?
                        <input name="servico" type="radio" defaultChecked={(Number(props.idServicoSelecionado) === Number(servico.id))} onClick={e => props.selectAction(servico)}></input> : <div>
                            <button type="button" onClick={e => props.editarAction(servico)} className="btn btn-primary">Editar</button>
                            <button type="button" onClick={e => props.deleteAction(servico)} className="btn btn-danger">Deletar</button></div>
                    }
                </td>
            </tr>
        )
    });
    const pageCount = Math.ceil(servicos.length / servicosPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    return (

        <div style={{ overflowX: "auto" }}>
            <div style={{ height: 'max-content', marginBottom: '2rem', overflowX: "auto" }}>

                <table className="table table-hover ">
                    <thead>
                        <tr>
                            <th scope="col">Serviço</th>
                            <th scope="col">Observações</th>
                            <th scope="col"></th>

                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>

                </table>
            </div>
            <div style={{ height: 'max-content', display: 'flex', boxSizing: 'border-box' }}>
                {servicos.length > 0 ? <ReactPaginate
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