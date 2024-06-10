import React, { useState, useRef } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ROUTES } from './resources/routes-constants'
import './resources/styles/_icon.scss'
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import { faMoon } from '@fortawesome/free-solid-svg-icons'

/* 
    Major routes are placed here.
    These routes have NO states, and are where the controllers/manager
    objects are created for Main routes.
*/
import HomeRoute from './display/superroutes/HomeRoute'
import CompendiumRoute from './display/superroutes/CompendiumRoute'
import SuperHeader from './display/headers/SuperHeader'
import ToolsRoute from './display/superroutes/ToolsRoute'

const RootComponent: React.FC = () => {

    const [theme, setTheme] = useState(InitTheme());

    function ChangeTheme() {
        
        if (theme == 'light') {
            
            localStorage.setItem('theme', 'dark');
            setTheme('dark')
        } else {
            
            localStorage.setItem('theme', 'light');
            setTheme('light')
        }
        
    }

    function InitTheme() {
        const theme = localStorage.getItem('theme');
        console.log(theme)
        if (theme != null) {
            return theme
        } else {
            return 'light'
        }
    }

    return (
        <div className="backgroundBaseColour" data-theme={theme}>

            <Router>
                <SuperHeader/>
                <div style={{position:"fixed",display:"flex",zIndex:"1000000000"}} >
                        <Fab variant="extended" aria-label="add" onClick={() => ChangeTheme()} style={{marginLeft:"0.5em"}} className="fabbutton">
                            {theme == 'light' &&
                            <FontAwesomeIcon icon={faSun} style={{fontSize:"2em",width:"1em"}}/>
                            }
                            {theme != "light" &&
                            <FontAwesomeIcon icon={faMoon} style={{fontSize:"2em",width:"1em"}}/>
                            }
                        </Fab>
                </div>
                <Routes>
                    <Route path={ROUTES.COMPENDIUM_ROUTE} element={<CompendiumRoute />} />
                    <Route path={ROUTES.TOOLS_ROUTE} element={<ToolsRoute />} />
                    <Route path={ROUTES.HOME_ROUTE} element={<HomeRoute />} />
                </Routes>
            </Router>
        </div>
    )
}

export default RootComponent
