import React from 'react';
import "./App.css"
//used for apps 
export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">You can drag these nodes</div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event)} draggable>
        App1
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event)} draggable>
        App2
      </div>
      
    </aside>
  );
};
