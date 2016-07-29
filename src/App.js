import React, { Component } from 'react';
import { ActionBar } from './ActionBar';
import { DrawerLayout } from './DrawerLayout';
import logo from './logo.svg';
import './App.css';

const AppHeader = () =>
  <div className="app-header">
    <img src={logo} className="app-header__logo" alt="logo" />
    <h2>Welcome to React</h2>
  </div>;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true
    };
  }

  render() {
    const renderActionBar = false;

    if (renderActionBar) {
      this.renderActionBar();
    }

    return (
      <div className="App">
        <div className="drawer-layout__drawer-toggle">
          <button onClick={this.handleToggleClick.bind(this) }>Toggle</button>
        </div>
        <DrawerLayout open={this.state.open} drawer={this.renderNavigation() } content={this.renderContent() } />
      </div>
    );
  }
  
  handleToggleClick() {
    this.setState({ open: !this.state.open });
  }

  renderNavigation() {
    return (
      <div className="full-height-content navigation">
        <AppHeader />
        <ul className="navigation__links">
          <li className="x-padded-content y-padded-content">Intro</li>
          <li className="x-padded-content y-padded-content">About</li>
          <li className="x-padded-content y-padded-content">Contact</li>
        </ul>
      </div>
    );
  }

  renderContent() {
    const longContent = 'Some long content '.repeat(1000);

    return <div>{longContent}</div>
  }

  renderActionBar() {
    return (
      <div>
        <div className="centered-content y-padded-content">
          <div className="card">
            {this.renderContent() }
          </div>
        </div>
        <ActionBar scrollContainer={window} minimumUpScrollDistance={50} />
      </div>
    );
  }
}

export default App;
