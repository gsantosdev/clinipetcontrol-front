import localStorageService from "./localstorageService";

export const USUARIO_LOGADO = '_usuario_logado'

export default class AuthService {

  static isUsuarioAutenticado() {
    const usuario = localStorageService.obterItem(USUARIO_LOGADO)

    const isAutenticado = usuario && usuario.id ? true : false 
    console.log(isAutenticado)
    return isAutenticado;
  }

  static removerUsuarioAutenticado() {
    localStorageService.removerItem(USUARIO_LOGADO)
  }


  static logar(usuario) {
    localStorageService.adicionarItem(USUARIO_LOGADO, usuario)
  }

  static obterUsuarioAutenticado() {
    return localStorageService.obterItem(USUARIO_LOGADO);
  }
}