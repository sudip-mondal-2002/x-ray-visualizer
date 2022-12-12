import React, { MouseEventHandler, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  FileDispatchType,
  fileActions,
  FileStateType
} from "../store/FileDataStore";
const FileUploader = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileDispatch = useDispatch<FileDispatchType>();
  const handleUpload: MouseEventHandler = async () => {
    if (!uploadedFile) {
      return fileDispatch(fileActions.disSelectFile());
    }
    const fileStream = (await uploadedFile.stream().getReader().read()).value;
    const fileName = uploadedFile.name;
    const fileType = fileName.substring(fileName.lastIndexOf(".") + 1);
    if (!fileStream) {
      return;
    }
    const payload = {
      fileStream,
      fileName,
      fileType
    } as FileStateType;
    fileDispatch(fileActions.selectFile(payload));
  };
  const selectFile: MouseEventHandler = () => {
    fileInputRef.current?.click();
  };
  return (
    <div className="file-uploader">
      <input
        ref={fileInputRef}
        type="file"
        accept=".fits,.hk,.sa"
        onChange={(event) =>
          setUploadedFile(event.target.files && event.target.files[0])
        }
      />
      <button className="select-btn" onClick={selectFile}>
        <span>{uploadedFile && uploadedFile.name}</span>
        <br />
        <br />
        Select <span> {uploadedFile && "Other"} </span> File
      </button>
      <button
        className="submit-btn"
        disabled={!uploadedFile}
        onClick={handleUpload}
      >
        Upload File
      </button>
    </div>
  );
};

export default FileUploader;
