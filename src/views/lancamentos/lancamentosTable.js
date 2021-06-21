import React from 'react'
import currencyFormatter from 'currency-formatter'

export default props => {

    const rows = props.lancamentos.map((lancamento, index) => {
        return (
            <tr key={index}>
                <td>{lancamento.descricao}</td>
                <td>{currencyFormatter.format(lancamento.valor, { locale: 'pt-BR' })}</td>
                <td>{lancamento.tipo}</td>
                <td>{lancamento.mes}</td>
                <td>{lancamento.status}</td>
                <td>
                    <button type="button" onClick={e => props.editarAction(lancamento)} className="btn btn-primary">Editar</button>
                    <button type="button" onClick={e => props.deleteAction(lancamento)} className="btn btn-danger">Deletar</button>
                </td>
            </tr>
        )
    })
    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Mês</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>

        </table>
    )
}