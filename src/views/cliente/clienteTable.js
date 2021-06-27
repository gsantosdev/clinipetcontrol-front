import React from 'react'

export default props => {

    const rows = props.clientes.map((cliente, index) => {
        return (
            <tr key={index}>
                <td>{cliente.nome}</td>
                <td>{cliente.cpf}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefone}</td>
            </tr>
        )
    })
    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">CPF</th>
                    <th scope="col">Email</th>
                    <th scope="col">Telefone</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>

        </table>
    )
}