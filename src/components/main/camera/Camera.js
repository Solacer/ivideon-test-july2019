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
        const c = this.props.camera;
        const cameraWidth = window.innerWidth;
        const cameraHeight = window.innerWidth * (c.height / c.width);
        return (
            <div className="camera-component">
                <span
                    role="img"
                    aria-label="Close"
                    className="camera-cross"
                    onClick={this.emitCloseCamera.bind(this)}
                >❌</span>
                <img
                    alt={c.cameraName}
                    src={this.state.imageSrc}
                    width={cameraWidth}
                    height={cameraHeight}
                />
                <div className="camera-info">
                    <div className="camera-titles">
                        <div className="camera-name">
                            {c.cameraName}
                        </div>
                        <div className="camera-description">
                            {c.cameraDescription}
                        </div>
                    </div>
                    <div className="camera-views">
                        Total views: {c.views}
                    </div>
                </div>
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
