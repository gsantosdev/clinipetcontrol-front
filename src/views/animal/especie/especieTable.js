import React from 'react'

export default props => {

    const rows = props.especies.map((especie, index) => {
        return (

            <tr  key={index}>
                <td className="col-md-8">{especie.nome}</td>

                <td>
                    <button type="button" onClick={e => props.editarAction(especie)} className="btn btn-primary">Editar</button>
                    <button type="button" onClick={e => props.deleteAction(especie)} className="btn btn-danger">Deletar</button>

                </td>
            </tr>
        )
    })
    return (

        <div style={{ overflowX: "auto" }}>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Espécie</th>
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