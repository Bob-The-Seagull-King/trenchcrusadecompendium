import React, { useState, useRef } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './store/reducers/store'
import { useContentPackStore } from './store/contentpacks'
import { ControllerController } from './classes/_high_level_controllers/ControllerController'
import { ToolsController } from './classes/_high_level_controllers/ToolsController'
import SuperHeader from './display/headers/SuperHeader'
import CompendiumRoute from './display/superroutes/CompendiumRoute'
import HomeRoute from './display/superroutes/HomeRoute'
import ToolsRoute from './display/superroutes/ToolsRoute'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ROUTES } from './resources/routes-constants'

const App: React.FC = () => {

    const InitializeContentState = useContentPackStore((state) => state.SetFromCookies)
    InitializeContentState();

    const [theme] = useState(InitTheme());
    
    const mastercontroller = new ControllerController();
    const toolcontroller = new ToolsController();

    function InitTheme() {
        const theme = localStorage.getItem('theme');
        if (theme != null) {
            return theme
        } else {
            return 'light'
        }
    }

    return (
        <div data-theme={theme}>
            <link rel="canonical" href="http://trench-companion.com/" />
            <Provider store={store} >
                <PersistGate loading={null} persistor={persistor}>      
                    <Router>
                        <SuperHeader/>
                        <Routes>
                            <Route path={ROUTES.COMPENDIUM_ROUTE} element={<CompendiumRoute controller={mastercontroller} />} />
                            <Route path={ROUTES.TOOLS_ROUTE} element={<ToolsRoute controller={toolcontroller} />} />
                            <Route path={ROUTES.HOME_ROUTE} element={<HomeRoute />} />
                        </Routes>
                    </Router>
                </PersistGate>
            </Provider>
        </div>
    )
}

export default App
