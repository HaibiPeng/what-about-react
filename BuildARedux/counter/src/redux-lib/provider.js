import React from 'react';
import ReduxContext from './index';

const Provider = ({ store, children }) => (
    <ReduxContext.Provider value={store}>
        {children}
    </ReduxContext.Provider>
);

export default Provider;