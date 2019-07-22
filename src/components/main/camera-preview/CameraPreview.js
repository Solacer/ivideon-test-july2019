import React from 'react';
import './CameraPreview.scss';

export default class CameraPreview extends React.Component {

    emitCamera() {
        this.props.onclick(this.props.camera);
    }

    render() {
        const c = this.props.camera;
        return (
            <div onClick={this.emitCamera.bind(this)} className="camera-preview-component">
                <div className="camera-picture">
                    <img
                        alt={c.cameraName}
                        src={`https://streaming.ivideon.com/preview/live?server=${c.serverId}&camera=${c.cameraId}`}
                    />
                </div>
                <div className="camera-info">
                    <div className="camera-name">
                        {c.cameraName}
                    </div>
                    <div className="camera-views">
                        Total views: {c.views}
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {

    }
}
