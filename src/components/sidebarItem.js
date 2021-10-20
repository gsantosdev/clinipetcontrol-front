import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function SideBarItem(props) {

    if (props.render) {
        return (
            <a className="col-sm-12" onClick={props.onClick} href={props.href}><FontAwesomeIcon className="mr-3" spacing="fa-fw" icon={props.icon} />{props.label}</a>
        )
    }
    return false

}


export default SideBarItem