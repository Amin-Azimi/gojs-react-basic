export default interface FlowModel {
    flowData:{
      nodeDataArray: Array<go.ObjectData>;
      linkDataArray: Array<go.ObjectData>;
    };
    jsonText:string;
  }