import React from 'react'

export default props => {

    const rows = props.animais.map((animal, index) => {
        return (

            <tr style={{backgroundColor: index % 2 ? "rgb(250,250,250)": "rgb(241,241,241"}} key={index}>
                <td>{animal.nome}</td>
                <td>{animal.raca}</td>
                <td>{animal.especie}</td>
                <td>{animal.cor}</td>
                <td>{animal.porte}</td>
                <td>{animal.cliente.nome}</td>


                <td>
                    {props.telaAgendamento ?
                        <input name="animal" type="radio" onClick={e => props.selectAction(animal)} /> :
                        <div>
                            <button type="button" onClick={e => props.editarAction(animal)} className="btn btn-primary">Editar</button>
                            <button type="button" onClick={e => props.deleteAction(animal)} className="btn btn-danger">Deletar</button></div>}


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
                        <th scope="col">Raça</th>
                        <th scope="col">Espécie</th>
                        <th scope="col">Cor</th>
                        <th scope="col">Porte</th>
                        <th scope="col">Proprietário</th>
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