import React, { useState } from 'react'
import ReactPaginate from 'react-paginate';

export default props => {

    const [pageNumber, setPageNumber] = useState(0)

    const funcionarios = props.funcionarios;
    console.log(funcionarios)

    const funcionariosPerPage = 5
    const pagesVisited = pageNumber * funcionariosPerPage

    const rows = funcionarios.slice(pagesVisited, pagesVisited + funcionariosPerPage).map((funcionario, index) => {
        return (

            <tr style={{ backgroundColor: index % 2 ? "rgb(250,250,250)" : "rgb(241,241,241" }} key={index}>
                <td>{funcionario.nome}</td>
                <td>{funcionario.email}</td>
                <td>{funcionario.telefone}</td>
                <td>{funcionario.veterinario ? "Veterinário" : "Geral"}</td>
                
                <td>
                    {props.telaAgendamento ?
                        <input name="funcionario" type="radio" defaultChecked={props.selecionado === funcionario.id} onClick={e => props.selectAction(funcionario)}></input> : <div>
                            <button type="button" onClick={e => props.editarAction(funcionario)} className="btn btn-primary">Editar</button>
                            <button type="button" onClick={e => props.deleteAction(funcionario)} className="btn btn-danger">Deletar</button></div>
                    }

                </td>
            </tr >
        )
    });
    const pageCount = Math.ceil(funcionarios.length / funcionariosPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    return (

        <div style={{ overflowX: "auto" }}>
            <div style={{ height: 'max-content', marginBottom: '2rem', overflowX: "auto" }}>

                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Email</th>
                            <th scope="col">Telefone</th>
                            <th scope="col">Cargo</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>

                </table>
            </div>
            <div style={{ height: 'max-content', display: 'flex', boxSizing: 'border-box' }}>
                {funcionarios.length > 0 ? <ReactPaginate
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