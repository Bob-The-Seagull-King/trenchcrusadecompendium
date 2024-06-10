import React, { useState, useRef } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import RootComponent from './RootComponent'
import { persistor, store } from './store/reducers/store'
import { useContentPackStore } from './store/contentpacks'

const App: React.FC = () => {

    const InitializeContentState = useContentPackStore((state) => state.SetFromCookies)
    InitializeContentState();

    const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
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
        if (theme != null) {
            return theme
        } else {
            return 'light'
        }
    }

    return (
        <div data-theme={theme}>
            <Provider store={store} >
                <PersistGate loading={null} persistor={persistor}>
                    <RootComponent />
                </PersistGate>
            </Provider>
        </div>
    )
}

export default App
