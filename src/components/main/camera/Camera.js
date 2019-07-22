import React from 'react';
import './Camera.scss';

export default class Camera extends React.Component {
    timeoutId = null;

    constructor() {
        super();
        this.state = {
            imageSrc: ''
        };
    }

    emitCloseCamera() {
        this.props.onclick();
    }

    getImageUrl() {
        const c = this.props.camera;
        const randomPart = (new Date()).getTime();
        return `https://streaming.ivideon.com/preview/live?server=${c.serverId}&camera=${c.cameraId}&${randomPart}`;
    }

    render() {
        return (
            <div className="camera-component">
                <img
                    alt={this.props.camera.cameraName}
                    src={this.state.imageSrc}
                />
                <span
                    role="img"
                    aria-label="Close"
                    className="camera-cross"
                    onClick={this.emitCloseCamera.bind(this)}
                >
                    ❌
                </span>
            </div>
        );
    }

    reloadView() {
        this.setState({
            imageSrc: this.getImageUrl()
        });
    }

    componentDidMount() {
        this.reloadView();
        this.timeoutId = setTimeout((function scheduled() {
            this.reloadView();
            setTimeout(scheduled.bind(this), 5000);
        }).bind(this), 5000);
    }

    componentWillUnmount() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }
}
