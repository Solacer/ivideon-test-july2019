import React from 'react';
import 'App.scss';
import Main from 'components/main/Main.js';

export default class App extends React.Component {
    render() {
        return (
            <div className="app-component">
                <Main />
            </div>
        );
    }
}
