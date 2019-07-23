import {appConfig} from 'app-config/app-config.js';
import {testData} from 'data-source/test-data.js'
import {state} from 'state/state.js';

const CAMERA_SCRIPT_ID = 'get_cameras_loader';
const CAM_LIST_URL = 'https://api.ivideon.com/tv/cameras';
const DEFAULT_REQUESTED_NUMBER = 7;

function setCamerasHandler(callback) {
    window.camerasHandler = (response) => {
        callback(response);
        const scriptElement = document.getElementById(CAMERA_SCRIPT_ID);
        scriptElement.parentNode.removeChild(scriptElement);
    };
}

const loadCameras = (callback, requestedNumber, nextSeed) => {
    const jsonpCallback = 'camerasHandler';
    const limit = requestedNumber ? requestedNumber : DEFAULT_REQUESTED_NUMBER;

    const script = document.createElement('script');
    script.src = `${CAM_LIST_URL}?jsonp=${jsonpCallback}&limit=${limit}${nextSeed ? `&seed=${nextSeed}` : ''}`;
    script.id = CAMERA_SCRIPT_ID;

    setCamerasHandler(callback);

    document.body.appendChild(script);
};

export const dataSource = {
    getCameras: (callback, requestedNumber) => {
        if (appConfig.useMocks === false) {
            loadCameras(callback, requestedNumber);
        } else {
            callback(testData.camerasList);
        }
    },
    getMoreCameras: (callback, requestedNumber) => {
        if (appConfig.useMocks === false) {
            const nextSeed = state.getNextSeed();
            loadCameras(callback, requestedNumber, nextSeed);
        } else {
            callback(testData.camerasList);
        }
    }
};

window.camerasHandler = ()=>null;