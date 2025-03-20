import React, {CSSProperties, MouseEventHandler} from "react";

interface ButtonProps {
    content: string;
    customClickEvent?: MouseEventHandler<HTMLButtonElement>;
    style?: CSSProperties;
}


function Button(props: ButtonProps) {
    return (<button onClick={props.customClickEvent} className={'button--white'}
                    style={props.style}>{props.content}</button>)
}

export default Button;