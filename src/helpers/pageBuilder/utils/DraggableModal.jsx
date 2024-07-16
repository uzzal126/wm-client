import React from "react";
import Draggable from "react-draggable";
import EditorModal from "../components/editor/modal";
import ImageModal from "../components/image/modal";
import RowModal from "../components/row/modal";
import { layoutToComponent, layoutUpdateComponent } from "../helpers";

const DraggableModal = ({ close, show, item, components, setComponents }) => {
  let component = layoutToComponent(components, item.id);

  const handleOnChange = value => {
    setComponents(layoutUpdateComponent(components, item.id, value));
  };
  //console.log('component', item)
  return (
    show && (
      <Draggable handle=".handle">
        <div className="drag-container">
          {item.type === "editor" && (
            <EditorModal
              close={close}
              show={show}
              component={component}
              onChange={handleOnChange}
            />
          )}
          {item.type === "image" && (
            <ImageModal
              close={close}
              show={show}
              component={component}
              onChange={handleOnChange}
            />
          )}
          {item.type === "row" && (
            <RowModal
              close={close}
              show={show}
              component={item}
              onChange={e => console.log(e)}
            />
          )}
        </div>
      </Draggable>
    )
  );
};

export default DraggableModal;
