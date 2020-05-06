const path = require('path');
const cors = require('cors');
const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config.dev');
const webpackCompiler = webpack(webpackConfig);
const api = require("./api");
const PORT = 3000;
const app = express();

app.use(cors('*'));

app.use("/api", api);

app.use(
    require('webpack-dev-middleware')(webpackCompiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath,
    }),
);

app.use(
    require('webpack-hot-middleware')(webpackCompiler, {
        log: false,
        path: '/__webpack_hmr',
    }),
);

app.set('views', path.join(__dirname, './views'));

app.set('view engine', 'pug');

app.use('/static', express.static('dev-dist'));

app.use('/', (req, res) => {
    res.render('index', {
        title: 'title',
    });
});

app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}.`);
});

