import { React } from 'react'

export default props => {

    const maxLengthCheck = (object) => {
        if (object.target.value.length > object.target.maxLength) {
            object.target.value = object.target.value.slice(0, object.target.maxLength)
        }
    }

    const rows = props.itensVenda.map((item, index) => {
        return (
            <tr style={{ backgroundColor: index % 2 ? "rgb(250,250,250)" : "rgb(241,241,241" }} key={index}>
                <td>{item.produto.nome}</td>
                <td>{item.produto.marca}</td>
                <td>R$ {item.produto.valorItem}</td>

                {item.quantidade == '' ? <td>1</td> : <td>{item.quantidade}</td>}

                <div>
                    <button type="button" onClick={e => props.editarAction(item)} className="btn btn-primary">Alterar</button>
                    <button type="button" onClick={e => props.deleteAction(item)} className="btn btn-danger">Remover</button>
                </div>

            </tr>

        )
    });

    return (

        <div className="table-responsive">
            <div style={{ height: 'max-content', marginBottom: '2rem', overflowX: "auto" }}>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Produto</th>
                            <th scope="col">Marca</th>
                            <th scope="col">Valor Unitário</th>
                            <th scope="col">Quantidade</th>

                            <th scope="col"></th>

                        </tr>
                    </thead>
                    <tbody className="col-12">
                        {rows}
                    </tbody>

                </table>
            </div>

        </div>

    )
}
