import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'

export default props => {

    // const [users, setUsers] = useState(props.usuarios.slice(0, 50))
    const [pageNumber, setPageNumber] = useState(0)

    const users = props.usuarios;
    console.log(users)

    const usersPerPage = 5
    const pagesVisited = pageNumber * usersPerPage

    const rows = users.slice(pagesVisited, pagesVisited + usersPerPage).map((usuario, index) => {
        return (

            <tr style={{ backgroundColor: index % 2 ? "rgb(250,250,250)" : "rgb(241,241,241" }} key={index}>
                <td className="col-md-4">{usuario.nome}</td>
                <td className="col-md-8">{usuario.tipo}</td>


                <td>
                    {!props.telaEditar ? <div className="m-2">
                        <button type="button" onClick={e => props.editarAction(usuario)} className="btn btn-primary">Editar</button>
                        <button type="button" onClick={e => props.deleteAction(usuario)} className="btn btn-danger">Deletar</button></div>
                        : <input name="usuario" type="radio" onClick={e => props.selectAction(usuario)}></input>}

                </td>
            </tr>
        )
    });

    const pageCount = Math.ceil(users.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    return (
        <div style={{ height: '40rem' }}>
            <div style={{ overflowX: "auto" }}>
                <table className="table table-hover ">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Tipo</th>
                            <th scope="col"></th>

                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>

                </table>


            </div>
            <div>
                {users.length > 0 ? <ReactPaginate
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