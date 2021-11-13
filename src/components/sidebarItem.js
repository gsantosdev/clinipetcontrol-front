import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function SideBarItem(props) {

    if (props.render) {
        return (
            <a className={props.selecionado === props.nome ? "col-sm-12 selecionado" : "col-sm-12"} onClick={(e) => {
                if (props.encerrarSessao != null) {
                    props.encerrarSessao()
                    props.selecionar("")

                }
                else {
                    props.selecionar(props.nome)

                }
            }} href={props.href}><FontAwesomeIcon className="mr-3" spacing="fa-fw" icon={props.icon} />{props.label}</a>
        )
    }
    return false

}


export default SideBarItem