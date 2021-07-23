import React from 'react'

export default props => {

    const rows = props.funcionarios.map((funcionario, index) => {
        return (

            <tr key={index}>
                <td>{funcionario.nome}</td>
                <td>{funcionario.email}</td>
                <td>{funcionario.telefone}</td>
                <td>{funcionario.sexo}</td>


                <td>
                    {props.telaAgendamento ?
                        <input name="funcionario" type="radio" defaultChecked={props.selecionado} onClick={e => props.selectAction(funcionario)}></input> : <div>
                            <button type="button" onClick={e => props.editarAction(funcionario)} className="btn btn-primary">Editar</button>
                            <button type="button" onClick={e => props.deleteAction(funcionario)} className="btn btn-danger">Deletar</button></div>
                    }

                </td>
            </tr >
        )
    })
    return (

        <div style={{ overflowX: "auto" }}>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Email</th>
                        <th scope="col">Telefone</th>
                        <th scope="col">Sexo</th>
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