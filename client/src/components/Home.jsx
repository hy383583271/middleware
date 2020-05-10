import React, {Component} from 'react';

import axios from 'axios'

import math from '../wasm/math.wasm';

class Home extends Component {
    componentDidMount() {
        new math({
            'global': {},
            'env': {
                'memory': new WebAssembly.Memory({initial: 100, limit: 1000}),
                'table': new WebAssembly.Table({initial: 0, element: 'anyfunc'})
            }
        }).then(response => {
            console.log('math', response.instance.exports.add(1, 2))
        });

        axios
            .get('/api')
            .then(response => {
                console.log('response', response)
            });
    }

    render() {
        return <div>Hello, Home 2222</div>;
    }
}

export default Home;

