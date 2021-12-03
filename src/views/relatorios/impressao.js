import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts"

export function gerarPDF(title, dados, colunas, nomeRelatorio, tamanho, nomeArquivo, colunasAMais) {

  pdfMake.vfs = pdfFonts.pdfMake.vfs;


  const reportTitle = [
    {
      text: title,
      alignment: 'center',
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 45]
    }
  ];

  console.log(colunasAMais)
  console.log(dados)

  const details = [
    {
      table: {
        headerRows: 1,
        widths: tamanho,
        body: [
          colunas
          ,
          ...dados
        ],
        alignment: "center"
      },
    },
    colunasAMais


  ];


  function Rodape(currentPage, pageCount) {
    return [
      {
        text: currentPage + '/' + pageCount,
        alignment: 'right',
        fontSize: 9,
        margin: [0, 10, 20, 0]
      }
    ]
  }

  const docDefinitions = {
    info: {
      title: nomeRelatorio
    },

    pageSize: 'A4',
    pageMargins: [15, 50, 15, 40],
    header: [reportTitle],
    content: [details],
    footer: Rodape


  }

  pdfMake.createPdf(docDefinitions).open();
  //pdfMake.createPdf(docDefinitions).download(nomeArquivo);

}


export function gerarPDFCaixa(saldoInicial, fechamento) {

  pdfMake.vfs = pdfFonts.pdfMake.vfs;


  const reportTitle = [
    {
      text: "Relatório de caixa",
      alignment: 'center',
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 45]
    }
  ];

  const details = [

    {
      style: 'tableExample',
      table: {
        widths: ['*', '*', '*', '*'],
        body: [
          [{ text: 'FLUXO DE CAIXA', bold: true, alignment: 'center', margin: [0, 10, 0, 8], colSpan: 4 }, '', '', ''],

          [{ text: '(+) ENTRADA', style: 'tableHeader', colSpan: 2, alignment: 'center', }, 'Column 2', { text: '(-) SAÍDA', style: 'tableHeader', colSpan: 2, alignment: 'center' }, 'Column 4'],
          ['PRODUTOS', 'R$ ' + fechamento.produtos, 'SANGRIAS', 'R$ ' + fechamento.sangrias],
          ['SERVIÇOS', 'R$ ' + fechamento.servicos, 'DESPESAS', 'R$ ' + fechamento.despesas],
          ['DEPÓSITOS', 'R$ ' + fechamento.depositos, '', ''],
          ['OUTRAS RECEITAS', 'R$ ' + fechamento.outrasReceitas, '', ''],
          ['SUBTOTAL', 'R$ ' + fechamento.subtotalEntrada, 'SUBTOTAL', 'R$ ' + fechamento.subtotalSaida],
          [{ text: '------------', margin: [0, 10, 0, 8], colSpan: 4, alignment: 'center' }, '', '', ''],
          [{ text: '------------', margin: [0, 10, 0, 8], colSpan: 4, alignment: 'center' }, '', '', ''],
          [{ text: 'TOTAIS', bold: true, alignment: 'center', margin: [0, 10, 0, 8], colSpan: 4 }, '', '', ''],

          [{ text: 'ENTRADA - SAIDA', style: 'tableHeader', colSpan: 2, alignment: 'center', }, '', { text: Number(fechamento.subtotalEntrada - fechamento.subtotalSaida).toFixed(2).toString(), style: 'tableHeader', colSpan: 2, alignment: 'center', }, ''],
          [{ text: 'VENDAS', style: 'tableHeader', colSpan: 2, alignment: 'center', }, '', { text: Number(fechamento.totalVendas).toFixed(2).toString(), style: 'tableHeader', colSpan: 2, alignment: 'center', }, ''],

          [{ text: '------------', margin: [0, 10, 0, 8], colSpan: 4, alignment: 'center' }, '', '', ''],
          [{ text: '------------', margin: [0, 10, 0, 8], colSpan: 4, alignment: 'center' }, '', '', ''],

          [{ text: 'ABERTURA E FECHAMENTO', bold: true, alignment: 'center', margin: [0, 10, 0, 8], colSpan: 4 }, '', '', ''],

          [{ text: 'HÓRARIO DE ABERTURA' }, new Date(fechamento.inicio).toLocaleDateString() + " " + new Date(fechamento.inicio).toLocaleTimeString(), 'Caixa inicial', 'R$' + Number(saldoInicial).toFixed(2).toString()],
          [{ text: 'HÓRARIO DE FECHAMENTO' }, new Date(fechamento.fim).toLocaleDateString() + " " + new Date(fechamento.fim).toLocaleTimeString(), 'Caixa final', 'R$' + Number((saldoInicial + fechamento.subtotalEntrada) - fechamento.subtotalSaida).toFixed(2).toString()]

        ],

      },
    }


  ];



  function Rodape(currentPage, pageCount) {
    return [
      {
        text: currentPage + '/' + pageCount,
        alignment: 'right',
        fontSize: 9,
        margin: [0, 10, 20, 0]
      }
    ]
  }

  const docDefinitions = {
    info: {
      title: "Relatório de caixa"
    },

    pageSize: 'A4',
    pageMargins: [15, 50, 15, 40],
    header: [reportTitle],
    content: [details],
    footer: Rodape


  }

  pdfMake.createPdf(docDefinitions).open();
  //pdfMake.createPdf(docDefinitions).download(nomeArquivo);

}
