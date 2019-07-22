import React from 'react';
import './CameraPreview.scss';

export default class CameraPreview extends React.Component {
    render() {
        return (
            <div className="CameraPreview">
                {this.props.id}
            </div>
        );
    }

    componentDidMount() {

    }
}
