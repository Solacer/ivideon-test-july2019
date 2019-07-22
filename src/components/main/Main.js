import React from 'react';
import './Main.scss';
import {dataSource} from 'data-source/data-source.js';
import {state} from 'state/state.js';
import CameraPreview from 'components/main/camera-preview/CameraPreview.js';
import {CameraInstance} from 'objects/CameraInstance.js';

export default class App extends React.Component {
    cameras = [1,2,3];

    render() {
        return (
            <div className="Main">
                {this.cameras.map(id => (
                    <CameraPreview id={id} key={id} />
                ))}
            </div>
        );
    }

    camerasConverter(rawCamObj) {
        return new CameraInstance({
            serverId: rawCamObj.server,
            cameraId: rawCamObj.camera,
            cameraName: rawCamObj.camera_name,
            cameraDescription: rawCamObj.misc.description,
            views: rawCamObj.total_views,
            width: rawCamObj.width,
            height: rawCamObj.height
        });
    }

    componentDidMount() {
        dataSource.getCameras((data) => {
            if (data && data.response && data.response.cameras && data.response.seeds) {
                state.setCamerasList(data.response.cameras.map(this.camerasConverter));
                state.setNextSeed(data.response.seeds.next);
            }
        });
    }
}
