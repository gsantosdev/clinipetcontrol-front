import React from 'react'

export default props => {

    const rows = props.servicos.map((servico, index) => {
        return (

            <tr key={index}>
                <td className="col-md-8">{servico.nome}</td>
                <td className="col-md-4">{servico.observacoes}</td>


                <td>
                    <button type="button" onClick={e => props.editarAction(servico)} className="btn btn-primary">Editar</button>
                    <button type="button" onClick={e => props.deleteAction(servico)} className="btn btn-danger">Deletar</button>

                </td>
            </tr>
        )
    })
    return (

        <div style={{ overflowX: "auto" }}>
            <table className="table table-hover">
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


    )
}