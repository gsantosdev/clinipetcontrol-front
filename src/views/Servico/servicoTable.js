import React from 'react'

export default props => {

    const rows = props.servicos.map((servico, index) => {
        return (

            <tr style={{backgroundColor: index % 2 ? "rgb(250,250,250)": "rgb(241,241,241"}} key={index}>
                <td className="col-md-4">{servico.nome}</td>
                <td className="col-md-8">{servico.observacoes}</td>


                <td>
                    {!props.telaAgendamento ? <div className="m-2"> 
                        <button type="button" onClick={e => props.editarAction(servico)} className="btn btn-primary">Editar</button>
                        <button type="button" onClick={e => props.deleteAction(servico)} className="btn btn-danger">Deletar</button></div>
                        : <input name="servico" type="radio" onClick={e => props.selectAction(servico)}></input>}

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