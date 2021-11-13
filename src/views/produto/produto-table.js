import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'

export default props => {

  const [pageNumber, setPageNumber] = useState(0)

  const produtos = props.produtos;
  console.log(produtos)

  const produtosPerPage = 5
  const pagesVisited = pageNumber * produtosPerPage

  const rows = produtos.slice(pagesVisited, pagesVisited + produtosPerPage).map((produto, index) => {
    return (

      <tr style={{ backgroundColor: index % 2 ? "rgb(250,250,250)" : "rgb(241,241,241" }} key={index}>
        <td>{produto.nome}</td>
        <td>{produto.marca}</td>

        <td>{produto.quantidadeEstoque}</td>
        <td>R$ {produto.valorItem}</td>


        <td>
          <div>
            {props.telaVenda ? <button type="button" onClick={e => props.selecionarProduto(produto, props.quantidade)} className="btn btn-primary"> Selecionar </button> :
              <>
                <button type="button" onClick={e => props.editarAction(produto)} className="btn btn-primary">Editar</button>
                <button type="button" onClick={e => props.deleteAction(produto)} className="btn btn-danger">Deletar</button>
                <button type="button" onClick={e => props.entradaEstoqueAction(produto)} className="btn btn-success">Entrada Estoque</button>
                <button hidden={true} type="button" onClick={e => props.baixaEstoqueAction(produto)} className="btn btn-warning">Baixa Estoque</button>


              </>
            }
          </div>

        </td>
      </tr>
    )
  });
  const pageCount = Math.ceil(produtos.length / produtosPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }
  return (

    <div style={{ overflowX: "auto" }}>
      <div style={{ height: 'max-content', marginBottom: '2rem', overflowX: "auto" }}>

        <table className="table table-hover ">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Marca</th>
              <th scope="col">Quantidade em estoque</th>
              <th scope="col">Valor de venda</th>
              <th scope="col"></th>

            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>

        </table>
      </div>
      <div style={{ height: 'max-content', display: 'flex', boxSizing: 'border-box' }}>
        {produtos.length > 0 ? <ReactPaginate
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