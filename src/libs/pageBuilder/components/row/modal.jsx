import React from 'react'
import {Button, Nav, Tab} from 'react-bootstrap'
import Settings from './settings'

const RowModal = ({close, show, component, onChange}) => {
  const handleOnChange = (key, value) => {
    let changed = {
      ...component,
      body: {
        ...component.body,
        content: {
          [key]: value,
        },
      },
    }
    onChange(changed)
  }
  return (
    <Tab.Container id='left-tabs-example' defaultActiveKey='second'>
      <div className='drag-header handle'>
        <div className='d-flex w-100 align-items-center justify-content-between'>
          <Nav className=''>
            <Nav.Item>
              <Nav.Link eventKey='second'>Setting</Nav.Link>
            </Nav.Item>
          </Nav>
          <Button
            variant='light-danger'
            size='sm'
            className='btn-icon'
            onClick={() => close(!show)}
          >
            <i className='fas fa-times' />
          </Button>
        </div>
      </div>
      <div className='drag-body'>
        <Tab.Content>
          <Tab.Pane eventKey='second'>
            <Settings />
          </Tab.Pane>
        </Tab.Content>
      </div>
    </Tab.Container>
  )
}

export default RowModal
