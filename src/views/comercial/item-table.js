import React from 'react'

export default props => {



    function add0(value) {
        if (value < 10) {
            return '0' + value;
        } else {
            return value;
        }
    }

    function getIntervalo(item) {

        var dataInicio = new Date(item.agendamento.dataHorario);
        var dataFim = new Date(item.agendamento.dataHorario);


        dataFim.setMinutes(dataInicio.getMinutes() + Number(item.agendamento.duracaoAprox))





        return add0(dataInicio.getHours().toString()) + ":" + add0(dataInicio.getMinutes().toString())
            + " - " + add0(dataFim.getHours().toString()) + ":" + add0(dataFim.getMinutes())


    }


    const rows = props.itensVenda.map((item, index) => {
        return (
            <tr style={{ backgroundColor: index % 2 ? "rgb(250,250,250)" : "rgb(241,241,241" }} key={index}>
                <td>{item.agendamento.servico.nome}</td>
                <td>R$ {item.agendamento.servico.valorItem}</td>

                <td>
                    <div>
                        <button type="button" onClick={e => props.editarAction(item, index)} className="btn btn-primary">Editar</button>
                        <button type="button" onClick={e => props.deleteAction(item)} className="btn btn-danger">Remover</button>
                    </div>
                </td>

            </tr>

        )
    });

    return (

        <div className="table-responsive">
            <div style={{ height: 'max-content', marginBottom: '2rem', overflowX: "auto" }}>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Serviço</th>
                            <th scope="col">Valor estimado</th>
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
