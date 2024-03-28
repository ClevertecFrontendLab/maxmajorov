/* eslint-disable simple-import-sort/imports */
import React from 'react';
import { createRoot } from 'react-dom/client';

import 'normalize.css';
import '@styles/index.less';

import { App } from './app';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
