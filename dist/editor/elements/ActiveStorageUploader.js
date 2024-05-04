"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActiveStorageUploader = void 0;
var _activestorage = require("@rails/activestorage");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var ActiveStorageUploader = /*#__PURE__*/function () {
  function ActiveStorageUploader(file, onProgress, onComplete, onFailure, onCancel) {
    _classCallCheck(this, ActiveStorageUploader);
    this.upload = new _activestorage.DirectUpload(file, this.url, this);
    this.onProgress = onProgress;
    this.onComplete = onComplete;
    this.onFailure = onFailure;
    this.onCancel = onCancel;

    // this.upload.file.preview = URL.createObjectURL(file);
  }
  _createClass(ActiveStorageUploader, [{
    key: "start",
    value: function start() {
      var _this = this;
      var promise = new Promise(function (resolve, reject) {
        _this.upload.create(function (error, blob) {
          if (error) reject(error);else resolve(blob);
        });
      });
      return promise.then(function (blob) {
        return _this.onComplete({
          signedId: blob.signed_id
        }, _this.upload);
      })["catch"](function (error) {
        return _this.onFailure(error, _this.upload);
      });
    }
  }, {
    key: "cancel",
    value: function cancel() {
      if (this.uploadRequest) {
        this.uploadRequest.abort();
        this.onCancel ? this.onCancel(this.upload) : null;
      }
    }
  }, {
    key: "directUploadWillStoreFileWithXHR",
    value: function directUploadWillStoreFileWithXHR(request) {
      var _this2 = this;
      this.uploadRequest = request;
      request.upload.addEventListener("progress", function (progress) {
        _this2.onProgress(progress, _this2.upload);
      });
    }

    // TODO: Fetch this URL from the Editor Element?
  }, {
    key: "url",
    get: function get() {
      return "/rails/active_storage/direct_uploads";
    }
  }]);
  return ActiveStorageUploader;
}();
exports.ActiveStorageUploader = ActiveStorageUploader;