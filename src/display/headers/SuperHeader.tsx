import 'bootstrap/dist/css/bootstrap.css'
import '../../resources/styles/_icon.scss'
import React, { useEffect, useRef, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation  } from 'react-router-dom'
import { ROUTES } from '../../resources/routes-constants'

import { useGlobalState } from './../../utility/globalstate'

import PlayerTacticsHeader from './PlayerTacticsHeader'
import MenuHeader from './MenuHeader'

const SuperHeader: React.FC = () => {

    const [theme, setTheme] = useGlobalState('theme');

    if ((theme == "" ) || (theme == null)) {
        setTheme('light');
    }

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
        
        <div data-theme={theme}>
        <link rel="canonical" href="http://trench-companion.com/" />
        <div id="topbarbody" ref={ref} className="topbarStructure">
            <Routes>
                <Route path={ROUTES.COMPENDIUM_ROUTE} element={<PlayerTacticsHeader/>} />
                <Route path={ROUTES.TOOLS_ROUTE} element={<PlayerTacticsHeader/>} />
                <Route path={ROUTES.HOME_ROUTE} element={<MenuHeader/>} />
            </Routes>
        </div>
        <div style={{height:stateheight}} className="backgroundOffWhite"/>
        </div>
        </>
    )
    // -------------------------------------------
}

export default SuperHeader