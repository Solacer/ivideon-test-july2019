export class CameraInstance {
    serverId = '';
    cameraId = '';
    cameraName = '';
    cameraDescription = '';
    views = 0;
    width = 0;
    height = 0;

    constructor(params) {
        if (!params.serverId || !params.cameraId || !params.width || !params.height) {
            console.error('cannot create new CameraInstance: not enough parameters to initialize');
        }
        this.serverId = params.serverId;
        this.cameraId = params.cameraId;
        this.cameraName = params.cameraName;
        this.cameraDescription = params.cameraDescription;
        this.views = params.views;
        this.width = params.width;
        this.height = params.height;
    }
}