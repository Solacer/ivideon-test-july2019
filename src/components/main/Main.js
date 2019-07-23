import React from 'react';
import './Main.scss';
import {dataSource} from 'data-source/data-source.js';
import {state} from 'state/state.js';
import CameraPreview from 'components/main/camera-preview/CameraPreview.js';
import Camera from 'components/main/camera/Camera.js';
import {CameraInstance} from 'objects/CameraInstance.js';

export default class App extends React.Component {

    mounted_ = false;
    camerasSubscription = null;
    selectedCamera = null;
    requestedCamerasNumber = 7;

    constructor() {
        super();

        this.state = {
            cameras: [],
            inFullscreenMode: false
        };

        this.subscribeToCameras();
    }

    fireCamerasLoad() {
        dataSource.getCameras((data) => {
            if (data && data.response && data.response.cameras && data.response.seeds) {
                state.setCamerasList(data.response.cameras.map(this.camerasConverter));
                state.setNextSeed(data.response.seeds.next);
            }
        }, this.requestedCamerasNumber);
    }

    fireLoadMoreCameras() {
        dataSource.getMoreCameras((data) => {
            if (data && data.response && data.response.cameras && data.response.seeds) {
                state.addCamerasList(data.response.cameras.map(this.camerasConverter));
                state.setNextSeed(data.response.seeds.next);
            }
        }, this.requestedCamerasNumber);
    }

    subscribeToCameras() {
        this.camerasSubscription = state.getCamerasList$()
            .subscribe((camerasArray) => {
                if (!this.mounted_) {return;}
                this.setState({
                    cameras: camerasArray
                });
            });
    }

    handleCameraSelection(camera) {
        this.selectedCamera = camera;
        this.setState({
            inFullscreenMode: true
        });
    }
    handleCameraDeselection() {
        this.selectedCamera = null;
        this.setState({
            inFullscreenMode: false
        });
    }

    onRequestedNumberChange(event) {
        const input = event.target;
        const newValue = input.value;
        if (!isNaN(newValue)) {
            setTimeout(() => {
                input.value = this.requestedCamerasNumber = newValue;
            }, 50);
        }
    }

    render() {
        return (
            <div className="main-wrapper">
                <div className="main-component">
                    <div className="main-header">
                        Favorite Cameras
                    </div>
                    {this.state.cameras.map(camera => (
                        <div key={`${camera.serverId}_${camera.cameraId}`} className="camera-preview">
                            <CameraPreview
                                key={`${camera.serverId}_${camera.cameraId}`}
                                camera={camera}
                                onclick={this.handleCameraSelection.bind(this)}
                                />
                        </div>
                    ))}
                    <div className="main-footer">
                        <div
                            className="button top"
                            onClick={this.scrollToTop.bind(this)}
                        >
                            <span>↑ Top</span>
                        </div>
                        <div className="number-input">
                            More:
                            <input
                                type="number"
                                value={this.requestedCamerasNumber}
                                onChange={this.onRequestedNumberChange.bind(this)}
                                />
                        </div>
                        <div
                            className="button next"
                            onClick={this.fireLoadMoreCameras.bind(this)}
                        >
                            <span>Next</span>
                        </div>
                    </div>
                </div>
                {this.state.inFullscreenMode ? (
                    <div className="fullscreen-wrapper">
                        <div className="fullscreen-overlay"></div>
                        <div className="camera-wrapper">
                            <Camera
                                camera={this.selectedCamera}
                                onclick={this.handleCameraDeselection.bind(this)}
                                />
                        </div>
                    </div>
                ) : ''}
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

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    componentDidMount() {
        this.mounted_ = true;
        this.fireCamerasLoad();
    }

    componentWillUnmount() {
        this.mounted_ = false;
        if (this.camerasSubscription && this.camerasSubscription.unsubscribe) {
            this.camerasSubscription.unsubscribe();
        }
    }
}
