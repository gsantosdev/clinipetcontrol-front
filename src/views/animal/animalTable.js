import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'

export default props => {

    const [pageNumber, setPageNumber] = useState(0)

    const animais = props.animais;
    console.log(animais)

    const animaisPerPage = 5
    const pagesVisited = pageNumber * animaisPerPage

    const rows = animais.slice(pagesVisited, pagesVisited + animaisPerPage).map((animal, index) => {
        return (

            <tr style={{ backgroundColor: index % 2 ? "rgb(250,250,250)" : "rgb(241,241,241" }} key={index}>
                <td>{animal.nome}</td>
                <td>{animal.raca}</td>
                <td>{animal.especie}</td>
                <td>{animal.cor}</td>
                <td>{animal.porte}</td>
                <td>{animal.cliente.nome}</td>


                <td>
                    {props.telaAgendamento ?
                        <input name="animal" type="radio" onClick={e => props.selectAction(animal)} /> :
                        <div>
                            <button type="button" onClick={e => props.editarAction(animal)} className="btn btn-primary">Editar</button>
                            <button type="button" onClick={e => props.deleteAction(animal)} className="btn btn-danger">Deletar</button></div>
                    }


                </td>
            </tr>
        )
    });

    const pageCount = Math.ceil(animais.length / animaisPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }


    return (

        <div style={{ overflowX: "auto" }}>
            <div style={{ height: 'max-content', marginBottom: '2rem', overflowX: "auto" }}>

                <table className="table table-hover table-sm-responsive">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Raça</th>
                            <th scope="col">Espécie</th>
                            <th scope="col">Cor</th>
                            <th scope="col">Porte</th>
                            <th scope="col">Proprietário</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>

                </table>
            </div>

            <div style={{ height: 'max-content', display: 'flex', boxSizing: 'border-box' }}>
                {animais.length > 0 ? <ReactPaginate
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