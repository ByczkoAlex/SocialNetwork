import React from "react";
import PreloaderGif from "../../assets/images/Preloader.gif"

let Preloader = (props: any) => {

    return (
        <div>
            <img src={PreloaderGif}/>
        </div>
    )
}

export default Preloader