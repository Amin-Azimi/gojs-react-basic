import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import FlowModel from "./appstate.model";
import { RootState } from "./store";

export interface AppState {
  status: "idle" | "loading" | "failed" | "success";
  flowData: FlowModel;
  error: any;
}
const initialState: AppState = {
  status: "idle",
  flowData: {
    flowData: {
      nodeDataArray: [
        { key: 0, text: "Alpha", color: "lightblue", loc: "0 0" },
        { key: 1, text: "Beta", color: "orange", loc: "150 0" },
        { key: 2, text: "Gamma", color: "lightgreen", loc: "0 150" },
        { key: 3, text: "Delta", color: "pink", loc: "150 150" },
      ],
      linkDataArray: [
        { key: -1, from: 0, to: 1 },
        { key: -2, from: 0, to: 2 },
        { key: -3, from: 1, to: 1 },
        { key: -4, from: 2, to: 3 },
        { key: -5, from: 3, to: 0 },
      ],
    },
    jsonText: "",
  },
  error: null,
};

const flowSlice = createSlice({
  name: "flow",
  initialState,
  reducers: {
    setActiveFlow: (state) => {
      const flow = JSON.parse(state.flowData.jsonText);
      state.flowData = {
        flowData: flow,
        jsonText: "",
      };
    },
    setLoadedFile: (state, action: PayloadAction<string>) => {
      state.flowData.jsonText = action.payload;
    },
  },
});

export const { setActiveFlow, setLoadedFile } = flowSlice.actions;
export const selectedFlowData = (state: RootState) => state.flow.flowData;
export default flowSlice.reducer;
