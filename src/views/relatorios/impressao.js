import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts"

function gerarPDF(title, dados, colunas, nomeRelatorio, tamanho, nomeArquivo, colunasAMais) {

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


export default gerarPDF