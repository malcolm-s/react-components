import React, { Component } from 'react';
import './drawer-layout.css';

export class DrawerLayout extends Component {
    render() {
        return (
            <div className={"drawer-layout drawer-layout--" + (this.props.open ? "open" : "closed")}>
                <div className="drawer-layout__drawer">
                    <div className="drawer-layout__drawer-content">
                        {this.props.drawer}
                    </div>
                </div>
                <div className="drawer-layout__content">
                    {this.props.content}
                </div>
            </div>
        );
    }
}