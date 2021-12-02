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

      layout: 'lightHorizantalLines'
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


export function gerarPDFCaixa(fechamento) {

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
          [{ text: '(+) ENTRADA', style: 'tableHeader', colSpan: 2, alignment: 'center', }, 'Column 2', { text: '(-) SAÍDA', style: 'tableHeader', colSpan: 2, alignment: 'center' }, 'Column 4'],
          ['PRODUTOS', 'R$ ' + fechamento.produtos, 'SANGRIAS', 'R$ ' + fechamento.sangrias],
          ['SERVIÇOS', 'R$ ' + fechamento.servicos, 'DESPESAS', 'R$ ' + fechamento.despesas],
          ['DEPÓSITOS', 'R$ ' + fechamento.depositos, '', ''],
          ['OUTRAS RECEITAS', 'R$ ' + fechamento.outrasReceitas, '', ''],
          [{ text: '', margin: [0, 10, 0, 8] }, '', '', ''],
          ['SUBTOTAL', 'R$ ' + fechamento.subtotalEntrada, 'SUBTOTAL', 'R$ ' + fechamento.subtotalSaida],
          [{ text: '', margin: [0, 10, 0, 8] }, '', '', ''],
          ['TOTAL EM VENDAS', 'R$ ' + fechamento.totalVendas, '', ''],
          [{ text: '', margin: [0, 30, 0, 8] }, '', '', ''],
          [{ text: 'HÓRARIO DE ABERTURA', colSpan: 2 }, '', new Date(fechamento.inicio).toLocaleDateString() + " " + new Date(fechamento.inicio).toLocaleTimeString(), ''],
          [{ text: 'HÓRARIO DE FECHAMENTO', colSpan: 2 }, '', new Date(fechamento.fim).toLocaleDateString() + " " + new Date(fechamento.fim).toLocaleTimeString(), '']

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
