import React from 'react';
import './Camera.scss';

export default class Camera extends React.Component {
    timeoutId = null;

    constructor() {
        super();
        this.state = {
            imageSrc: '',
            hasError: false
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

    handleError() {
        this.setState({
            hasError: true
        });
    }

    handleLoad() {
        this.setState({
            hasError: false
        });
    }

    render() {
        const c = this.props.camera;
        const innerWidth = (window.innerWidth <= 600) ? window.innerWidth : 600;
        const cameraWidth = innerWidth;
        const cameraHeight = innerWidth * (c.height / c.width);
        return (
            <div className="camera-component">
                <span
                    role="img"
                    aria-label="Close"
                    className="camera-cross"
                    onClick={this.emitCloseCamera.bind(this)}
                >❌</span>
                <div className="picture-wrapper">
                    <img
                        alt={c.cameraName}
                        src={this.state.imageSrc}
                        width={cameraWidth}
                        height={cameraHeight}
                        onError={this.handleError.bind(this)}
                        onLoad={this.handleLoad.bind(this)}
                    />

                    {this.state.hasError ? (
                        <div className="errorBlock">
                            <div>Camera is offline.</div>
                            <div
                                className="refresh-button"
                                onClick={this.rerunImageLoading.bind(this)}
                            >
                                Refresh
                            </div>
                        </div>
                    ) : ''}
                </div>
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

    runImageLoading() {
        this.reloadView();
        this.timeoutId = setTimeout((function scheduled() {
            this.reloadView();
            setTimeout(scheduled.bind(this), 5000);
        }).bind(this), 5000);
    }

    stopImageLoading() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }

    rerunImageLoading() {
        this.stopImageLoading();
        this.runImageLoading();
    }

    componentDidMount() {
        this.runImageLoading();
    }

    componentWillUnmount() {
        this.stopImageLoading();
    }
}
