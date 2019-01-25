import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import Components from './library/components'
const { One, Two, Render } = Components;

class App extends Component {
  render() {
    return (
      <div>
        App
        <One /> {/*Overridden by custom component*/}
        <Two />
        <Render componentName="Two" />
        <Render componentName="Two000" /> {/*Will ignore*/}
      </div>
    );
  }
}

export default hot(App);
