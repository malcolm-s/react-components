import React, { Component } from 'react';
import Rx from 'rxjs';

import './ActionBar.css';

export class ActionBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollDirection: 'up'
    };
  }

  componentDidMount() {
    this.setupScrollListeners();
  }

  componentWillUnmount() {
    this.teardownScrollListeners();
  }

  setupScrollListeners() {
    this.scrollListener = Rx.Observable.fromEvent(window, 'scroll')
      .map(() => this.props.scrollContainer.scrollY)
      // .do(scrollY => console.log('scrollY:', scrollY))
      .bufferTime(500)
      .filter(buffer => buffer.length > 0)
      // .do(bufferedScrollY => console.log('buffered scrollY', bufferedScrollY))
      .map(positions => positions[0] - positions[positions.length - 1])
      // .do(delta => console.log('delta', delta))
      .filter(delta => Math.abs(delta) > this.props.scrollChange)
      // .do(delta => console.log('delta over', delta))
      .map(delta => delta < 0 ? 'down' : 'up')
      // .do(direction => console.log('direction', direction))
      .subscribe(direction => {
        this.setState({ scrollDirection: direction  });
      });
  }

  teardownScrollListeners() {
    this.scrollListener.unsubscribe();
  }

  render() {
    return (
      <div className="action-bar__container">
        <div className={`action-bar action-bar--scrolling-${this.state.scrollDirection}`}>
          <div className="centered-content action-bar__content">Action bar content</div>
        </div>
      </div>
    );
  }
}
