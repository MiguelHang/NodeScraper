import React, { Component } from 'react';
import AppContainer from './common/AppContainer';
import Header from './header/header';
import MotosContainer from './motosContainer/motosContainer';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <AppContainer>
          <MotosContainer/>
        </AppContainer>
      </div>
    )
  }
}

export default App