import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function SideBarItem(props) {
    return (
        <a href={props.href}><FontAwesomeIcon className="mr-3" spacing="fa-fw" icon={props.icon} />{props.label}</a>
    )
}


export default SideBarItem