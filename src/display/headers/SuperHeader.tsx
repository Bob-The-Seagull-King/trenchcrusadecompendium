import 'bootstrap/dist/css/bootstrap.css'
import '../../resources/styles/_icon.scss'
import React, { useEffect, useRef, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation  } from 'react-router-dom'
import { ROUTES } from '../../resources/routes-constants'

import PlayerTacticsHeader from './PlayerTacticsHeader'

const SuperHeader: React.FC = () => {
    const [stateheight, setHeight] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const location = useLocation();
    
    useEffect(() => {
        const setNavHeight = () => {
            if(ref.current) {
                setHeight(ref.current.clientHeight+10);
            }
        }
        window.addEventListener("load", setNavHeight, false);
        window.addEventListener("resize", setNavHeight, false);
        setNavHeight();
    }, [location])

    // Return result -----------------------------
    return (
        <>
        <div id="topbarbody" ref={ref} className="topbarStructure">
            <Routes>
                <Route path={ROUTES.COMPENDIUM_ROUTE} element={<PlayerTacticsHeader/>} />
                <Route path={ROUTES.TOOLS_ROUTE} element={<PlayerTacticsHeader/>} />
            </Routes>
        </div>
        <div style={{height:stateheight}}/>
        </>
    )
    // -------------------------------------------
}

export default SuperHeader