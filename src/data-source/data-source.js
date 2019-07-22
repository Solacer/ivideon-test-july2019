import {appConfig} from 'app-config/app-config.js';
import {testData} from 'data-source/test-data.js'

const CAMERA_SCRIPT_ID = 'get_cameras_loader';
const CAM_LIST_URL = 'https://api.ivideon.com/tv/cameras';

function setCamerasHandler(callback) {
    window.camerasHandler = (response) => {
        callback(response);
        const scriptElement = document.getElementById(CAMERA_SCRIPT_ID);
        scriptElement.parentNode.removeChild(scriptElement);
    };
}

let nextSeed = null;

const loadCameras = (callback) => {
    const jsonpCallback = 'camerasHandler';
    const limit = 10;

    const script = document.createElement('script');
    script.src = `${CAM_LIST_URL}?jsonp=${jsonpCallback}&limit=${limit}${nextSeed ? `&seed=${nextSeed}}` : ''}`;
    script.id = CAMERA_SCRIPT_ID;

    setCamerasHandler(callback);

    document.body.appendChild(script);
};

export const dataSource = {
    setSeed: (seedId) => (nextSeed = seedId),
    getCameras: (callback) => {
        if (appConfig.useMocks === false) {
            loadCameras(callback);
        } else {
            callback(testData.camerasList);
        }
    }
};

window.camerasHandler = ()=>null;
