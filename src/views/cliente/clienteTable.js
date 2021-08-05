import React from 'react'
import { cpf } from 'cpf-cnpj-validator'


export default props => {
    const rows = props.clientes.map((cliente, index) => {
        return (
            <tr style={{backgroundColor: index % 2 ? "rgb(250,250,250)": "rgb(241,241,241"}} key={index}>
                <td>{cliente.nome}</td>
                <td>{cpf.format(cliente.cpf)}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefone}</td>

                <td>
                    {props.telaAnimal ?
                        <input name="cliente" type="radio" defaultChecked={props.selecionado === cliente.id} onClick={e => props.selectAction(cliente)}></input> : <div>
                            <button type="button" onClick={e => props.editarAction(cliente)} className="btn btn-primary">Editar</button>
                            <button type="button" onClick={e => props.deleteAction(cliente)} className="btn btn-danger">Deletar</button></div>
                    }

                </td>
            </tr>

        )
    })
    return (

        <div className="table-responsive">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">CPF</th>
                        <th scope="col">Email</th>
                        <th scope="col">Telefone</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody className="col-12">
                    {rows}
                </tbody>

            </table>
        </div>


    )
}