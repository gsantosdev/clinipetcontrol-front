import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'
import { formatCPF } from '@brazilian-utils/brazilian-utils';

export default props => {

  const [pageNumber, setPageNumber] = useState(0)

  const lancamentos = props.lancamentos;

  console.log(lancamentos)


  const lancamentosPerPage = 5
  const pagesVisited = pageNumber * lancamentosPerPage



  const rows = lancamentos.slice(pagesVisited, pagesVisited + lancamentosPerPage).map((lancamento, index) => {
    return (
      <tr style={{ backgroundColor: index % 2 ? "rgb(250,250,250)" : "rgb(241,241,241" }} key={index}>
        <td style={{ color: "#bb149f" }}>{lancamento.statusLancamento}</td>

        <td>{lancamento.descricao}</td>
        <td>{lancamento.valor}</td>
        <td>{new Date(lancamento.updatedAt).toLocaleDateString() + " " + new Date(lancamento.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>

        <td>
          {lancamento.statusLancamento === "AGUARDANDO_PAGAMENTO" ?
            <>
              <button type="button" onClick={e => props.atualizaStatusAction("CONCLUIDO", lancamento.idLancamento)} className="btn btn-success">CONCLUIR</button>
              <button type="button" onClick={e => props.atualizaStatusAction("CANCELADO", lancamento.idLancamento)} className="btn btn-danger">CANCELAR</button>
            </>
            : false}

        </td>
      </tr >

    )
  });

  const pageCount = Math.ceil(lancamentos.length / lancamentosPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  return (

    <div className="table-responsive">
      <div style={{ height: 'max-content', marginBottom: '2rem', overflowX: "auto" }}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Status</th>
              <th scope="col">Descrição</th>
              <th scope="col">Nome</th>
              <th scope="col">Ultima atualização</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className="col-12">
            {rows}
          </tbody>

        </table>
      </div>

      <div style={{ height: 'max-content', display: 'flex', boxSizing: 'border-box' }}>
        {lancamentos.length > 0 ? <ReactPaginate
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