import React from 'react';
import './Main.scss';
import {dataSource} from 'data-source/data-source.js';
import CameraPreview from 'components/main/camera-preview/CameraPreview.js';

export default class App extends React.Component {
    cameras = [1,2,3];

    render() {
        return (
            <div className="Main">
                {this.cameras.map(id => (
                    <CameraPreview id={id} />
                ))}
            </div>
        );
    }

    componentDidMount() {
        dataSource.getCameras((data) => {
            debugger;
            dataSource.setSeed(data.response.seeds.next);
        });
    }
}
