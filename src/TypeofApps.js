import React, { memo,useState} from "react";

import { Handle } from "react-flow-renderer";


export default memo(({ isConnectable }) => {
    const [sdata,setData]=useState();
    const id = [1,2,3]
   
    return (
        <div style={{ display: "flex",  flexDirection: "column" }}>
            {id.map((id,i) => {
                return <>
                    <div  style={{marginBottom: "1rem", textAlign: "left"}}>
                        <text>Data</text>
                        <div onSubmit={(e)=>e.preventDefault()} key={id} style={{display: "flex", position: "relative"}}>
                        <Handle
                            type="target"
                            position="left"
                        
                            id={`${i}-a`}
                            style={{ background: "#555" }}
                            onConnect={(params,data) => {
                                console.log("handle onConnect", params,data)}}
                            isConnectable={isConnectable}
                        />
                            <input id="text" onChange={(e)=>{
                            setData(e.target.value)}}/>
                       
                        
                        <Handle
                            type="source"
                            position="right"
                            id={`${i}-b`}
                        
                            style={{ top: "50%", background: "#555" }}
                            isConnectable={isConnectable}
                            onConnect={(params) => { console.log("handle on connect",params)}}

                        />
                        </div>
                        
                    </div>
                </>
            })}

        </div>
    );
});
