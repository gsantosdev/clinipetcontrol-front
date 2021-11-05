import React from "react";

import AuthService from "../app/service/authService";
import { tiposUsuariosEnum } from "../utils/tipoUsuarioEnum";

export const AuthContext = React.createContext('default')
export const AuthConsumer = AuthContext.Consumer;

const AuthProvider = AuthContext.Provider;


class ProvedorAutenticacao extends React.Component {

  state = {
    usuarioAutenticado: null,
    isAutenticado: false,
    isAdmin: false,
    isSecretaria: false,
    isVeterinario: false
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
      iniciarSessao: this.iniciarSessao,
      encerrarSessao: this.encerrarSessao

    }
    return (
      <AuthProvider value={contexto}>
        {this.props.children}
      </AuthProvider>

    )
  }
}


export default ProvedorAutenticacao