import React from 'react';
import { createGlobalState } from 'react-hooks-global-state';

const initialState = { theme: InitTheme() };
const { useGlobalState } = createGlobalState(initialState);

function InitTheme() {
    const theme = localStorage.getItem('theme');
    if (theme != null) {
        return theme
    }
    return 'light'
}

export {useGlobalState, InitTheme};