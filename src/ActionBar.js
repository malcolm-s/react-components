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
    this.unsubscribeSubscriptions();
  }

  setupScrollListeners() {
    const scrollChange$ =  Rx.Observable.fromEvent(window, 'scroll')
      .map(() => this.props.scrollContainer.scrollY)
      .bufferTime(500)
      .filter(buffer => buffer.length > 0)
      .map(positions => positions[0] - positions[positions.length - 1]);

    this.addSubscription(
      scrollChange$
      .filter(delta => delta > 0)
      .filter(delta => Math.abs(delta) > this.props.minimumUpScrollDistance)
      .subscribe(() => {
        this.setState({ scrollDirection: 'up' });
      })
    );

    this.addSubscription(
      scrollChange$
      .filter(delta => delta < 0)
      .subscribe(() => {
        this.setState({ scrollDirection: 'down' });
      })
    );
  }

  addSubscription(subscription) {
    this.subscriptions = (this.subscriptions || []).concat(subscription);
  }

  unsubscribeSubscriptions() {
    this.subscriptions.forEach(s => s.unsubscribe());
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
