import React, { useState, useEffect, useCallback, useRef } from "react";
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  updateEdge,
  MiniMap,
  Controls
} from "react-flow-renderer";
import Sidebar from "./Sidebar";
import { v4 as uuidv4,v5 as uuidv5 } from 'uuid';


import TypeofApps from "./TypeofApps";

import "./index.css";
import "./App.css"


const connectionLineStyle = { stroke: "red" };
const snapGrid = [20, 20];

//node Type will tells about left and right hand apps according to handles
//by proto purpose the handles are present on both sides
const nodeTypes = {
  selectorNode: TypeofApps
};

 const getId = () => uuidv4();//id for nodes 

const DnDFlow = () => {

  const reactFlowWrapper = useRef(null);//this mainstains the internal state of react flow
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
 // const [edges, setEdges, onEdgesChange] = useEdgesState([]);
 const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);


  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id:getId(),
        type:'selectorNode', //this type is changed according to left and right hand apps
        position,
        data: { name:'Ajay',sirname:"bidhan"},//this will be used as props to typeofnodes for config.
      };

      setNodes((nds) => nds.concat(newNode));
      console.log("node id :" +`${getId()}`)
    },
    [reactFlowInstance]
  );

 
   let edgeId=edges.map((e)=>e.id);
 
  console.log(edgeId)//consoling the connections id i.e automatically generated
    // const edgeUpdateSuccessful = useRef(true);
     const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), []);
     //this onConnect will give update about edges or connections

    


    //to delete edge on click but we to go with  updateEdges bcoz on click all edges dissappears
    const onEdgeClick=useCallback((edge)=>setEdges(edges.filter((ed)=>ed.id !==edge.id)),[]);


// to delete node eon click(could be double) same problem with nodes on Click node
     const onNodeClick =useCallback((node)=>{
      setNodes(nodes.filter((x)=>x.id !==node.id))
      
      },[]);
    console.log(edges)
   console.log(nodes)
    return (
      <div className="dndflow">
        <ReactFlowProvider>
          <Sidebar />
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onDrop={onDrop}
              
              onEdgeClick={onEdgeClick}
              onNodeClick={onNodeClick}
              onDragOver={onDragOver}
              onInit={setReactFlowInstance}
              style={{ background: "blue" }}
              nodeTypes={nodeTypes}
              connectionLineStyle={connectionLineStyle}
              
              snapToGrid={true}
              snapGrid={snapGrid}
              defaultZoom={1.5}
              fitView
               attributionPosition="bottom-left"
            >
            {/* controls are present on bottom left-side */}
              <Controls />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      </div>
    );
  };

  export default DnDFlow;
