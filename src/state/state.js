import {BehaviorSubject} from 'rxjs';
import {CameraInstance} from 'objects/CameraInstance.js';

const state_ = {
    camerasList: new BehaviorSubject([]),
    nextSeed: null
};

export const state = {
    setCamerasList: (camerasArray) => {
        try {
            const hasWrongType = camerasArray.some(element => !(element instanceof CameraInstance));
            if (!hasWrongType) {
                state_.camerasList.next(camerasArray);
            } else {
                throw new Error('incompatible input type');
            }
        } catch (e) {
            console.error(`cannot set list of cameras: ${e.message}}`);
        }
    },
    addCamerasList: (camerasArray) => {
        try {
            const hasWrongType = camerasArray.some(element => !(element instanceof CameraInstance));
            if (!hasWrongType) {
                const currentList = state_.camerasList.getValue();
                state_.camerasList.next(currentList.concat(camerasArray));
            } else {
                throw new Error('incompatible input type');
            }
        } catch (e) {
            console.error(`cannot add list of cameras: ${e.message}}`);
        }
    },
    getCamerasList$: () => state_.camerasList.asObservable(),

    setNextSeed: (seed) => (state_.nextSeed = seed),
    getNextSeed: () => state_.nextSeed
};