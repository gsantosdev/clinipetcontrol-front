import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'
import { formatCNPJ, formatCPF } from '@brazilian-utils/brazilian-utils';

export default props => {

    const [pageNumber, setPageNumber] = useState(0)

    const ordens = props.ordens;

    console.log(ordens)


    const ordensPerPage = 5
    const pagesVisited = pageNumber * ordensPerPage



    const rows = ordens.slice(pagesVisited, pagesVisited + ordensPerPage).map((ordem, index) => {
        return (
            <tr style={{ backgroundColor: index % 2 ? "rgb(250,250,250)" : "rgb(241,241,241" }} key={index}>
                {ordem.statusOrdem == "PENDENTE" ? <td style={{ color: "rgb(195 189 0)" }}>{ordem.statusOrdem}</td> : false}
                {ordem.statusOrdem == "EM_EXECUCAO" ? <td style={{ color: "#bb149f" }}>EM EXECUÇÃO</td> : false}
                {ordem.statusOrdem == "CONCLUIDO" ? <td style={{ color: "rgb(78 173 47)" }}>{ordem.statusOrdem}</td> : false}
                {ordem.statusOrdem == "CANCELADO" ? <td style={{ color: "rgb(223 56 63)" }}>{ordem.statusOrdem}</td> : false}
                {ordem.statusOrdem == "AGUARDANDO_PAGAMENTO" ? <td style={{ color: "#bb149f" }}>AGUARDANDO PAGAMENTO</td> : false}


                <td>{ordem.descricao}</td>
                <td>{ordem.nome}</td>
                <td>{ordem.cpf.length === 11 ? formatCPF(ordem.cpf) : formatCNPJ(ordem.cpf)}</td>
                <td>{new Date(ordem.dataExecucao).toLocaleDateString() + " " + new Date(ordem.dataExecucao).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>

                {console.log(new Date(ordem.dataCriacao))}
                <td>
                    {ordem.statusOrdem === "PENDENTE" ?
                        <div className="d-flex justify-content-start">
                            <button type="button" onClick={e => props.remarcaAgendamentoAction(ordem.agendamento, ordem.idLancamento)} className="btn btn-warning">REMARCAR</button>
                            <button type="button" onClick={e => props.atualizaStatusAction("EM_EXECUCAO", ordem.idLancamento)} className="btn" style={{ color: "white", backgroundColor: 'blue' }}>EXECUTAR</button>
                            <button type="button" onClick={e => props.atualizaStatusAction("CANCELADO", ordem.idLancamento)} className="btn btn-danger">CANCELAR</button>
                        </div> : false}
                    {ordem.statusOrdem === "EM_EXECUCAO" ?
                        <div className="d-flex justify-content-start">
                            <button type="button" onClick={e => props.atualizaStatusAction("AGUARDANDO_PAGAMENTO", ordem.idLancamento, ordem.idAgendamento)} className="btn btn-success">FINALIZAR EXECUÇÃO</button>
                            <button type="button" onClick={e => props.atualizaStatusAction("CANCELADO", ordem.idLancamento)} className="btn btn-danger">CANCELAR</button>
                        </div>
                        : false}
                    {ordem.statusOrdem === "AGUARDANDO_PAGAMENTO" ?
                        <div className="d-flex justify-content-start">
                            <button type="button" onClick={e => props.atualizaStatusAction("CONCLUIDO", ordem.idLancamento)} className="btn btn-success">CONCLUIR</button>
                            <button type="button" onClick={e => props.atualizaStatusAction("CANCELADO", ordem.idLancamento)} className="btn btn-danger">CANCELAR</button>
                        </div>
                        : false}

                </td>
            </tr >

        )
    });

    const pageCount = Math.ceil(ordens.length / ordensPerPage);

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
                            <th scope="col">Proprietário</th>
                            <th scope="col">CPF / CNPJ</th>
                            <th scope="col">Data e hora do agendamento</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody className="col-12">
                        {rows}
                    </tbody>

                </table>
            </div>

            <div style={{ height: 'max-content', display: 'flex', boxSizing: 'border-box' }}>
                {ordens.length > 0 ? <ReactPaginate
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