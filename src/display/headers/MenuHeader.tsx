import 'bootstrap/dist/css/bootstrap.css'
import '../../resources/styles/_icon.scss'
import React from 'react'

import PalleteSwap from './components/PalleteSwap';

const MenuHeader = () => {


    // Return result -----------------------------
    return (
        <>
        <div className={"floatingButton backgroundtc"}>
            <PalleteSwap/>
        </div>
        </>

    )
    // -------------------------------------------
}

export default MenuHeader