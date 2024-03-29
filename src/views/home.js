import React from "react";
import UsuarioService from "../app/service/usuarioService";
import { Doughnut, Pie } from "react-chartjs-2";
import { Chart, ArcElement, Title, Legend, defaults } from 'chart.js'
import ServicoService from "../app/service/servicoService";
import Card from "../components/card";
import ProdutoService from "../app/service/produtoService";
import ClienteService from "../app/service/clienteService";


class Home extends React.Component {

    state = {
        numeroClientes: 0,
        contagemServicos: [],
        contagemProdutos: [],
        pfPj: []
    }

    constructor() {
        super()
        this.usuarioService = new UsuarioService();
        this.servicoService = new ServicoService();
        this.produtoService = new ProdutoService();
        this.clienteService = new ClienteService();

    }


    obterContagemServicos = () => {
        this.servicoService.obterContagem().then(response => {
            this.setState({ contagemServicos: response.data })
        }).catch(error => {
            console.log(error.response)
        })
    }

    obterPfPj = () => {
        this.clienteService.relatorioPfPj().then(response => {
            this.setState({ pfPj: response.data })
        }).catch(error => {
            console.log(error.response)
        })
    }


    obterContagemProdutos = () => {
        this.produtoService.listarQuantidadeVendaProduto().then(response => {
            this.setState({ contagemProdutos: response.data })
        }).catch(error => {
            console.log(error.response)
        })
    }



    componentDidMount() {
        this.obterContagemServicos()
        this.obterContagemProdutos()
        this.obterPfPj()
    }

    render() {

        const dadosServicos = this.state.contagemServicos
        console.log(dadosServicos)
        const dadosProdutos = this.state.contagemProdutos

        const dadosPfPj = this.state.pfPj
        console.log(dadosPfPj)




        const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);

        const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;


        const dataServicos = {
            labels: [

            ],
            datasets: [{
                label: 'My First Dataset',
                data: [],
                backgroundColor: [

                ],
                hoverOffset: 4
            }]
        };

        const dataPfPj = {
            labels: [

            ],
            datasets: [{
                label: 'My First Dataset',
                data: [],
                backgroundColor: [

                ],
                hoverOffset: 4
            }]
        };

        const dataProdutos = {
            labels: [

            ],
            datasets: [{
                label: 'My First Dataset',
                data: [],
                backgroundColor: [

                ],
                hoverOffset: 4
            }]
        };


        dadosServicos.forEach(dado => {
            dataServicos.labels.push(dado.label)
            dataServicos.datasets[0].data.push(dado.value)
            dataServicos.datasets[0].backgroundColor.push(randomRGB())

        });

        dadosProdutos.forEach(dado => {
            dataProdutos.labels.push(dado.label)
            dataProdutos.datasets[0].data.push(dado.value)
            dataProdutos.datasets[0].backgroundColor.push(randomRGB())

        });
        dadosPfPj.forEach(dado => {
            dataPfPj.labels.push(dado.label)
            dataPfPj.datasets[0].data.push(dado.value)
            dataPfPj.datasets[0].backgroundColor.push(randomRGB())

        });

        return (
            <div>
                <div className="d-flex justify-content-center nao-imprimir mb-5">
                    <h1 className="display-6" style={{ color: '#346388' }}>Bem vindo ao CliniPetControl!</h1>
                </div>
                <div className="card">

                    <div className="row d-flex justify-content-center card-body">
                        <div className="d-flex justify-content-center nao-imprimir mb-5">

                            {this.state.contagemProdutos.length === 0 && this.state.contagemServicos.length === 0 && this.state.pfPj.length === 0 ?
                                <h1 className="display-6" style={{ color: '#346388' }}>Não há dados suficientes para gerar os gráficos!</h1>
                                : false
                            }
                        </div>

                        <div className="col-sm-12 col-lg-12 col-md-12 col-xxl-6 col-xl-6 col-12" >

                            {this.state.contagemServicos.length > 0 ?
                                <Pie
                                    data={dataServicos}
                                    options={{
                                        responsive: true,
                                        legend: { display: true, position: "top" },
                                        title: { display: true, position: 'top', padding: 40, text: 'Quantidade realizada por serviço', fontSize: '20' },
                                        datalabels: {
                                            display: true,
                                            color: "white",
                                        },
                                        tooltips: {
                                            backgroundColor: "#5a6e7f",
                                        },
                                    }}
                                />

                                : false}

                        </div>
                        <div className="col-sm-12 col-lg-12 col-md-12 col-xxl-6 col-xl-6 col-12">

                            {this.state.contagemProdutos.length > 0 ? <Pie
                                data={dataProdutos}
                                options={{
                                    responsive: true,
                                    legend: { display: true, position: "bottom" },
                                    title: { display: true, position: 'top', padding: 40, text: 'Quantidade vendida por produto', fontSize: '20' },
                                    datalabels: {
                                        display: true,
                                        color: "white",
                                    },
                                    tooltips: {
                                        backgroundColor: "#5a6e7f",
                                    },
                                }}
                            /> : false}

                        </div>

                        <div className="col-sm-12 col-lg-12 col-md-12 col-xxl-6 col-xl-6 col-12">

                            {this.state.pfPj.length > 0 ? <Doughnut
                                data={dataPfPj}
                                options={{
                                    responsive: true,
                                    legend: { display: true, position: "bottom" },
                                    title: { display: true, position: 'top', padding: 40, text: 'Quantidade de clientes PF x PJ', fontSize: '20' },
                                    datalabels: {
                                        display: true,
                                        color: "white",
                                    },
                                    tooltips: {
                                        backgroundColor: "#5a6e7f",
                                    },
                                }}
                            /> : false}

                        </div>
                        


                    </div>

                </div>
            </div>
        )
    }
}

export default Home

