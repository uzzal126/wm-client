import React from "react";
import { Button, Nav, Tab } from "react-bootstrap";
import Content from "./content";
import Settings from "./settings";

const ImageModal = ({ close, show, component, onChange }) => {
  //console.log('component', component)
  const handleOnChange = (key, value) => {
    let changed = {
      ...component,
      body: {
        ...component.body,
        content: {
          [key]: value,
        },
      },
    };
    onChange(changed);
  };
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <div className="drag-header handle">
        <div className="d-flex w-100 align-items-center justify-content-between">
          <Nav className="">
            <Nav.Item>
              <Nav.Link eventKey="first">Content</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Setting</Nav.Link>
            </Nav.Item>
          </Nav>
          <Button
            variant="light-danger"
            size="sm"
            className="btn-icon"
            onClick={() => close(!show)}>
            <i className="fas fa-times" />
          </Button>
        </div>
      </div>
      <div className="drag-body">
        <Tab.Content>
          <Tab.Pane eventKey="first">
            <Content
              content={component?.body?.content?.url}
              onChange={(v) => handleOnChange("url", v)}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="second">
            <Settings />
          </Tab.Pane>
        </Tab.Content>
      </div>
    </Tab.Container>
  );
};

export default ImageModal;
