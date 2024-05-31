var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useRef, useState } from 'react';
import axios from 'axios';
import UploadList from './uploadList';
import Dragger from './dragger';
/**
 * 通过点击或者拖拽上传文件
 * ### 引用方法
 *
 * ~~~js
 * import { Upload } from 'rosebush-react'
 * ~~~
 */
export var Upload = function (_a) {
    var action = _a.action, defaultFileList = _a.defaultFileList, children = _a.children, beforeUpload = _a.beforeUpload, onProgress = _a.onProgress, onSuccess = _a.onSuccess, onError = _a.onError, onChange = _a.onChange, onRemove = _a.onRemove, headers = _a.headers, _b = _a.name, name = _b === void 0 ? 'file' : _b, data = _a.data, withCredentials = _a.withCredentials, accept = _a.accept, multiple = _a.multiple, drag = _a.drag;
    var fileInput = useRef(null);
    var _c = useState(defaultFileList || []), fileList = _c[0], setFileList = _c[1];
    var updateFileList = function (updataFile, updateObj // 更新的内容
    ) {
        setFileList(function (prevList) {
            return prevList.map(function (file) {
                if (file.uid === updataFile.uid) {
                    return __assign(__assign({}, file), updateObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    var handleClick = function () {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };
    var handleChange = function (e) {
        var files = e.target.files;
        if (!files) {
            return;
        }
        uploadFiles(files);
        if (fileInput.current) {
            // 情况fileInput的内容
            fileInput.current.value = '';
        }
    };
    // 文件删除逻辑
    var handleRemove = function (file) {
        setFileList(function (prevList) {
            return prevList.filter(function (item) { return item.uid !== file.uid; });
        });
        if (onRemove) {
            onRemove(file);
        }
    };
    var uploadFiles = function (files, test) {
        var postFiles = Array.from(files);
        if (test) {
            console.log('drag', postFiles[0]);
        }
        postFiles.forEach(function (file) {
            // 上传文件前的逻辑
            if (!beforeUpload) {
                post(file);
            }
            else {
                var result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(function (processedFile) {
                        post(processedFile);
                    });
                }
                else if (result === false) {
                    post(file);
                }
            }
        });
    };
    var post = function (file) {
        var _file = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file,
        };
        // setFileList([_file, ...fileList])
        setFileList(function (prevList) {
            return __spreadArray([_file], prevList, true);
        });
        var formData = new FormData();
        formData.append(name || 'file', file);
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        axios
            .post(action, formData, {
            headers: __assign(__assign({}, headers), { 'Content-Type': 'mutipart/form-data' }),
            withCredentials: withCredentials,
            onUploadProgress: function (e) {
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    //  更新文件列表
                    updateFileList(_file, { percent: percentage, status: 'uploading' });
                    if (onProgress) {
                        onProgress(percentage, _file);
                    }
                }
            },
        })
            .then(function (resp) {
            console.log(resp);
            updateFileList(_file, { status: 'success', response: resp.data });
            if (onSuccess) {
                onSuccess(resp.data, _file);
            }
            if (onChange) {
                onChange(_file);
            }
        })
            .catch(function (err) {
            console.log(err);
            updateFileList(_file, { status: 'error', error: err });
            if (onError) {
                onError(err, _file);
            }
            if (onChange) {
                onChange(_file);
            }
        });
    };
    console.log(fileList);
    return (React.createElement("div", { className: "rose-upload-component" },
        React.createElement("div", { className: "rose-upload-input", style: { display: 'inline-block' }, onClick: handleClick },
            drag ? (React.createElement(Dragger, { onFile: function (files) { return uploadFiles(files); } }, children)) : (children),
            React.createElement("input", { className: "rose-file-input", style: { display: 'none' }, ref: fileInput, onChange: handleChange, type: "file", accept: accept, multiple: multiple })),
        React.createElement(UploadList, { fileList: fileList, onRemove: handleRemove })));
};
export default Upload;
