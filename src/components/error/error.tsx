import React from 'react';
import './error.css'

interface Props{
    errorCode:number|null;
    errorMsg:string|null;
}

const Error:React.FC<Props> = (Props) => {
    return (
        <div className="error-container">
                Ooops! something went wrong...
                {Props.errorMsg && <p>{Props.errorMsg}</p>}
                {Props.errorCode && <p>error code:{Props.errorCode}</p>}
        </div>
    )

}


export default Error;