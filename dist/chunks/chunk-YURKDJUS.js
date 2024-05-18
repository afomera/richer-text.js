// src/editor/ActiveStorageUploader.js
import { DirectUpload } from "@rails/activestorage";
var ActiveStorageUploader = class {
  constructor(file, onProgress, onComplete, onFailure, onCancel) {
    this.upload = new DirectUpload(file, this.url, this);
    this.onProgress = onProgress;
    this.onComplete = onComplete;
    this.onFailure = onFailure;
    this.onCancel = onCancel;
  }
  start() {
    const promise = new Promise((resolve, reject) => {
      this.upload.create((error, blob) => {
        if (error)
          reject(error);
        else
          resolve(blob);
      });
    });
    return promise.then((blob) => this.onComplete({ signedId: blob.signed_id }, this.upload)).catch((error) => this.onFailure(error, this.upload));
  }
  cancel() {
    if (this.uploadRequest) {
      this.uploadRequest.abort();
      this.onCancel ? this.onCancel(this.upload) : null;
    }
  }
  directUploadWillStoreFileWithXHR(request) {
    this.uploadRequest = request;
    request.upload.addEventListener("progress", (progress) => {
      this.onProgress(progress, this.upload);
    });
  }
  // TODO: Fetch this URL from the Editor Element?
  get url() {
    return "/rails/active_storage/direct_uploads";
  }
};

export {
  ActiveStorageUploader
};
//# sourceMappingURL=chunk-YURKDJUS.js.map
