/*
*  Copyright (C) 1998-2021 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from 'gojs';
import * as React from 'react';
import { saveAs } from 'file-saver';
import { DiagramWrapper } from './components/DiagramWrapper';

import './App.css';

/**
 * Use a linkDataArray since we'll be using a GraphLinksModel,
 * and modelData for demonstration purposes. Note, though, that
 * both are optional props in ReactDiagram.
 */
interface AppState {
  flowData:{
    nodeDataArray: Array<go.ObjectData>;
    linkDataArray: Array<go.ObjectData>;
  };
  jsonText:string;
}

class App extends React.Component<{}, AppState> {
  // Maps to store key -> arr index for quick lookups
  private mapNodeKeyIdx: Map<go.Key, number>;
  private mapLinkKeyIdx: Map<go.Key, number>;

  constructor(props: object) {
    super(props);
    this.state = {
      flowData:{
        nodeDataArray: [
          { key: 0, text: 'Alpha', color: 'lightblue', loc: '0 0' },
          { key: 1, text: 'Beta', color: 'orange', loc: '150 0' },
          { key: 2, text: 'Gamma', color: 'lightgreen', loc: '0 150' },
          { key: 3, text: 'Delta', color: 'pink', loc: '150 150' }
        ],
        linkDataArray: [
          { key: -1, from: 0, to: 1 },
          { key: -2, from: 0, to: 2 },
          { key: -3, from: 1, to: 1 },
          { key: -4, from: 2, to: 3 },
          { key: -5, from: 3, to: 0 }
        ]},
      jsonText:''
    };
    // init maps
    this.mapNodeKeyIdx = new Map<go.Key, number>();
    this.mapLinkKeyIdx = new Map<go.Key, number>();
    this.refreshNodeIndex(this.state.flowData.nodeDataArray);
    this.refreshLinkIndex(this.state.flowData.linkDataArray);
    // bind handler methods
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleUploadClick = this.handleUploadClick.bind(this);
    this.uploadFlowFile = this.uploadFlowFile.bind(this);
  }

  /**
   * Update map of node keys to their index in the array.
   */
  private refreshNodeIndex(nodeArr: Array<go.ObjectData>) {
    this.mapNodeKeyIdx.clear();
    nodeArr.forEach((n: go.ObjectData, idx: number) => {
      this.mapNodeKeyIdx.set(n.key, idx);
    });
  }

  /**
   * Update map of link keys to their index in the array.
   */
  private refreshLinkIndex(linkArr: Array<go.ObjectData>) {
    this.mapLinkKeyIdx.clear();
    linkArr.forEach((l: go.ObjectData, idx: number) => {
      this.mapLinkKeyIdx.set(l.key, idx);
    });
  }


  public handleSaveClick(){
    console.log(this.state);  
    saveAs(new Blob([JSON.stringify(this.state.flowData)], {type: "application/json"}),`${Date.now()}.txt`)
  }

  public handleUploadClick(){
    const flow =JSON.parse(this.state.jsonText);
    this.setState({
      flowData :flow,
      jsonText:''
    }) 
  }
  public async uploadFlowFile(e:React.ChangeEvent<HTMLInputElement>)  {
    e.preventDefault()
    const files = Array.from(e.target.files as FileList)
    // console.log("files:", files)    
    const reader = new FileReader()
    let text:string='';
    reader.onload =  (e:any) => { 
      text = e.target.result
      this.setState({...this.state,
        jsonText:text});
      };
    await reader.readAsText(files[0]);
    
  }

  public render() {

    return (
      <div>
        <p>
          Try moving around nodes, editing text, relinking, undoing (Ctrl-Z), etc. within the diagram
          and you'll notice the changes are reflected in the inspector area. You'll also notice that changes
          made in the inspector are reflected in the diagram. If you use the React dev tools,
          you can inspect the React state and see it updated as changes happen.
        </p>
        <p>
          Check out the <a href='https://gojs.net/latest/intro/react.html' target='_blank' rel='noopener noreferrer'>Intro page on using GoJS with React</a> for more information.
        </p>
        <DiagramWrapper
          nodeDataArray={this.state.flowData.nodeDataArray}
          linkDataArray={this.state.flowData.linkDataArray}
        />
        <button onClick={this.handleSaveClick}>Save</button>
        <input type="file" onChange={this.uploadFlowFile} />
        <button onClick={this.handleUploadClick}>Load</button>
      </div>
    );
  }
}

export default App;
