import React, { Component } from 'react';
import { ActionBar } from './ActionBar';
import logo from './logo.svg';
import './App.css';
import './drawer-layout.css';

const AppHeader = () =>
  <div className="app-header">
    <img src={logo} className="app-header__logo" alt="logo" />
    <h2>Welcome to React</h2>
  </div>;

class App extends Component {
  render() {
    const longContent = 'Some long content '.repeat(10000);

    return (
      <div className="App">
        <div className="drawer-layout">
          <div className="drawer-layout__drawer">
            <div className="full-height-content navigation">
              <AppHeader />
              <ul className="navigation__links">
                <li className="x-padded-content y-padded-content">Intro</li>
                <li className="x-padded-content y-padded-content">About</li>
                <li className="x-padded-content y-padded-content">Contact</li>
              </ul>
            </div>
          </div>
          <div className="drawer-layout__content">
            <div className="centered-content y-padded-content">
              <div className="card">
                {longContent}
              </div>
            </div>
            <ActionBar scrollContainer={window} minimumUpScrollDistance={50} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
