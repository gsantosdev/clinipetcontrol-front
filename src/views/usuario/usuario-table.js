import React from 'react'

export default props => {

    const rows = props.usuarios.map((usuario, index) => {
        return (

            <tr style={{backgroundColor: index % 2 ? "rgb(250,250,250)": "rgb(241,241,241"}} key={index}>
                <td className="col-md-4">{usuario.nome}</td>
                <td className="col-md-8">{usuario.tipo}</td>


                <td>
                    {!props.telaEditar ? <div className="m-2"> 
                        <button type="button" onClick={e => props.editarAction(usuario)} className="btn btn-primary">Editar</button>
                        <button type="button" onClick={e => props.deleteAction(usuario)} className="btn btn-danger">Deletar</button></div>
                        : <input name="usuario" type="radio" onClick={e => props.selectAction(usuario)}></input>}

                </td>
            </tr>
        )
    })
    return (

        <div style={{ overflowX: "auto" }}>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Tipo</th>
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