import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import RootComponent from './RootComponent'
import { persistor, store } from './store/reducers/store'
import { useContentPackStore } from './store/contentpacks'

const App: React.FC = () => {

    const InitializeContentState = useContentPackStore((state) => state.SetFromCookies)
    InitializeContentState();

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <RootComponent />
            </PersistGate>
        </Provider>
    )
}

export default App
