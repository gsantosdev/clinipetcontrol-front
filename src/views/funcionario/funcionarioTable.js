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

                    <button type="button" onClick={e => props.editarAction(cliente)} className="btn btn-primary">Editar</button>
                    <button type="button" onClick={e => props.deleteAction(cliente)} className="btn btn-danger">Deletar</button>


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
                        <th scope="col">Sexo</th>
                        <th scope="col">Telefone</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>

            </table>
        </div>


    )
}