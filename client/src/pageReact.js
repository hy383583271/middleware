import ReactDOM from 'react-dom';
import React from 'react';
import Routes from './root/index';

ReactDOM.render(
    <Routes/>,
    document.getElementById('page-react-app'),
);

if (module.hot) {
    module.hot.accept();
}
