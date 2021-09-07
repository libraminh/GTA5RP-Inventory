import React from "react";
import PropTypes from "prop-types";

import {
  Draggable,
  Droppable,
  DragComponent,
  DragState,
} from "react-dragtastic";

const orangeCircleStyles = {
  width: 30,
  height: 30,
  borderRadius: "100%",
  boxShadow: "0px 6px 15px rgba(0,0,0,.4)",
  background: "orange",
  position: "fixed",
  pointerEvents: "none", //This is important for now. Mouseup events can't trigger if the pointer is on top of your DragComponent
};

class DraggableZone extends React.Component {
  render() {
    return (
      <>
        <Draggable id="unique-id" type="apple">
          {(dragState) => (
            <div {...dragState.events} className="bg-gray-600 h-20 text-black">
              I'm a draggable zone
            </div>
          )}
        </Draggable>

        <DragComponent for="unique-id">
          {(dragState) => (
            <div
              style={{
                ...orangeCircleStyles,
                left: dragState.x - 15,
                top: dragState.y - 15,
              }}
            />
          )}
        </DragComponent>
      </>
    );
  }
}

const DroppableZone = () => {
  const onOrangeDrop = () => {
    console.log("onOrangeDrop");
  };

  return (
    <Droppable accepts="apple" onDrop={onOrangeDrop}>
      {(dragState) => (
        <div {...dragState.events} className="bg-red-600 h-20 text-black">
          I'm a droppable zone
        </div>
      )}
    </Droppable>
  );
};

const ReactDrag = (props) => {
  return (
    <div>
      <DraggableZone />
      <DroppableZone />
    </div>
  );
};

ReactDrag.propTypes = {};

export default ReactDrag;
