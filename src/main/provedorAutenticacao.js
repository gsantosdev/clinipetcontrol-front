import React from "react";

import AuthService from "../app/service/authService";
import { tiposUsuariosEnum } from "../utils/tipoUsuarioEnum";
import UsuarioService from "../app/service/usuarioService"

export const AuthContext = React.createContext('default')
export const AuthConsumer = AuthContext.Consumer;

const AuthProvider = AuthContext.Provider;


class ProvedorAutenticacao extends React.Component {

  constructor() {
    super();
    this.service = new UsuarioService();
  }

  state = {
    usuarioAutenticado: null,
    isAutenticado: false,
    isAdmin: false,
    isSecretaria: false,
    isVeterinario: false,
    isCaixaOpen: false

  }

  abrirCaixa = () => {
    AuthService.abrirCaixa()
    this.setState({ isCaixaOpen: true })
  }

  fecharCaixa = () => {
    AuthService.fecharCaixa()
    this.setState({ isCaixaOpen: false })
  }

  obterStatusCaixa = () => {
    AuthService.obterStatusCaixa().status === 'open' ?
      this.setState({ isCaixaOpen: true }) :
      this.setState({ isCaixaOpen: false })


  }

  iniciarSessao = (usuario) => {
    AuthService.logar(usuario);
    const tipo = AuthService.obterUsuarioAutenticado().tipo
    if (tipo === tiposUsuariosEnum.A) {
      this.setState({ isAdmin: true });
    }
    else if (tipo === tiposUsuariosEnum.V) {
      this.setState({ isVeterinario: true });

    } else {
      this.setState({ isSecretaria: true });
    }

    console.log(tipo === tiposUsuariosEnum.V)
    console.log(usuario)
    console.log("isAdmin:", this.state.isAdmin)
    console.log("isSecretaria:", this.state.isSecretaria)
    console.log("isVeterinario:", this.state.isVeterinario)
    this.obterStatusCaixa()



    this.setState({ isAutenticado: true, usuarioAutenticado: usuario })
  }



  encerrarSessao = () => {
    AuthService.removerUsuarioAutenticado();
    this.setState({ isAutenticado: false, usuarioAutenticado: null, isSecretaria: false, isAdmin: false, isVeterinario: false })
  }

  render() {
    const contexto = {
      usuarioAutenticado: this.state.usuarioAutenticado,
      isAutenticado: this.state.isAutenticado,
      isAdmin: this.state.isAdmin,
      isSecretaria: this.state.isSecretaria,
      isVeterinario: this.state.isVeterinario,
      isCaixaOpen: this.state.isCaixaOpen,
      iniciarSessao: this.iniciarSessao,
      encerrarSessao: this.encerrarSessao,
      abrirCaixa: this.abrirCaixa,
      fecharCaixa: this.fecharCaixa,
      obterStatusCaixa: this.obterStatusCaixa

    }
    return (
      <AuthProvider value={contexto}>
        {this.props.children}
      </AuthProvider>

    )
  }
}


export default ProvedorAutenticacao