import React from 'react'

export default props => {

    const rows = props.animais.map((animal, index) => {
        return (

            <tr key={index}>
                <td>{animal.nome}</td>
                <td>{animal.raca}</td>
                <td>{animal.cor}</td>
                <td>{animal.porte}</td>

                <td>
                    {!props.telaAnimal ? <div>
                        <button type="button" onClick={e => props.editarAction(animal)} className="btn btn-primary">Editar</button>
                        <button type="button" onClick={e => props.deleteAction(animal)} className="btn btn-danger">Deletar</button></div>
                        : <input name="animal" type="radio" onClick={e => props.selectAction(animal)}></input>}

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
                        <th scope="col">Cor</th>
                        <th scope="col">Porte</th>
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