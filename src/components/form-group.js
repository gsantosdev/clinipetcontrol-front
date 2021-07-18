import React from 'react'

function FormGroup(props) {
    return (
        <div className="form-group" style={{  margin: '0.2rem', minWidth: 'fit-content' }}>
            <label style={{fontSize:props.fontSize}} htmlFor={props.htmlFor}>{props.label}</label>
            {props.children}

        </div>
    )
}


export default FormGroup