import { createSlice, configureStore } from "@reduxjs/toolkit";
export type FileStateType = {
  fileStream: Uint8Array | Uint16Array | Uint32Array | null;
  fileType: ".fits" | ".hk" | ".sa" | null;
  fileName: string | null;
};
const initialFileState: FileStateType = {
  fileStream: null,
  fileType: null,
  fileName: null
};

const fileSlice = createSlice({
  name: "fileSlice",
  initialState: initialFileState,
  reducers: {
    selectFile(state: FileStateType, action: { payload: FileStateType }) {
      state.fileStream = action.payload.fileStream;
      state.fileType = action.payload.fileType;
      state.fileName = action.payload.fileName;
    },
    disSelectFile(state: FileStateType) {
      state.fileStream = null;
      state.fileType = null;
      state.fileName = null;
    }
  }
});

export const fileStore = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  reducer: fileSlice.reducer
});

export const fileActions = fileSlice.actions;

export const getFile = (state: FileStateType) : FileStateType => {
  return {
    fileStream: state.fileStream,
    fileType: state.fileType,
    fileName: state.fileName
  };
};
export type FileDispatchType = typeof fileStore.dispatch;

export default fileSlice.reducer;
