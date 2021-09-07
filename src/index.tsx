import React from 'react';
import ReactDOM from 'react-dom';
import {StoriesList} from "./components/StoriesList/StoriesList";
import {GoToTopButton} from "./components/GoToTopButton/GoToTopButton";

import './assets/styles/main.scss';


const App = () => (
    <div className={'stories-wrapper'}>
        <h1>Random Hacker News</h1>
        <StoriesList />
        <div className={'stories-wrapper__go-to-top-btn'}>
            <GoToTopButton/>
        </div>
    </div>
);


ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);