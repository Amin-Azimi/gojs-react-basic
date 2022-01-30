import * as React from "react";
import { saveAs } from "file-saver";
import { DiagramWrapper } from "./components/DiagramWrapper";
import { useAppDispatch, useAppSelector } from "./api/hooks";

import "./App.css";
import {
  selectedFlowData,
  setActiveFlow,
  setLoadedFile,
} from "./api/flow.slice";

export default function App() {
  const dispatch = useAppDispatch();
  const currentFlowData = useAppSelector(selectedFlowData);

  // saving diagram nodes to a json file
  //it must move to slice 
  const handleSaveClick = () => {
    saveAs(
      new Blob([JSON.stringify(currentFlowData.flowData)], {
        type: "application/json",
      }),
      `${Date.now()}.txt`
    );
  };

  //reading data form json file 
  const uploadFlowFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = Array.from(e.target.files as FileList);

    const reader = new FileReader();
    reader.onload = (e: any) => {
      dispatch(setLoadedFile(e.target.result));
    };
    await reader.readAsText(files[0]);
  };

  //applying loaded data to diagram
  const handleLoadClick=()=>{
      dispatch(setActiveFlow())
  }


  return (
    <div>
      <p>
        Here you can see flow chart representaion.
        For loading new file at first you must choose "flow json file" and then click on "Load" button
      </p>
      <p>
        Check out the{" "}
        <a
          href="https://gojs.net/latest/intro/react.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Intro page on using GoJS with React
        </a>{" "}
        for more information.
      </p>
      <button onClick={handleSaveClick}>Save</button>
      Flow json file :<input type="file" onChange={uploadFlowFile} />
      <button onClick={handleLoadClick}>Load</button>
      <DiagramWrapper
        nodeDataArray={currentFlowData.flowData.nodeDataArray}
        linkDataArray={currentFlowData.flowData.linkDataArray}
      />
    </div>
  );
}
