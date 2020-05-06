import React, {Component} from 'react';

import axios from 'axios'

class Home extends Component {

  componentDidMount() {
    // const a = () => {
    axios
      .get('/api')
      .then(response => {
        console.log('response', response)
      });
    // };
  }


  render() {
    return <div>Hello, Home 2222</div>;
  }
}

export default Home;
