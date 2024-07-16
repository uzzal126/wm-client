import React from 'react'
import {Accordion} from 'react-bootstrap'

const Settings = () => {
  return (
    <div>
      <Accordion defaultActiveKey='0'>
        <Accordion.Item eventKey='0'>
          <Accordion.Header>Container</Accordion.Header>
          <Accordion.Body>
            <label className='form-check justify-content-between form-switch form-check-custom form-check-solid'>
              <span className='form-check-label'>Container Fluid</span>
              <input className='form-check-input' type='checkbox' value='' />
            </label>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='1'>
          <Accordion.Header>Layout</Accordion.Header>
          <Accordion.Body>
            <ul className='list-layout'>
              <li className='list-layout-item' data-tooltip='Full column'>
                <div className='list-layout-item-cpm'></div>
              </li>
              <li className='list-layout-item' data-tooltip='1/2 column'>
                <div className='list-layout-item-cpm'></div>
                <div className='list-layout-item-cpm'></div>
              </li>
              <li className='list-layout-item' data-tooltip='1/3 column'>
                <div className='list-layout-item-cpm'></div>
                <div className='list-layout-item-cpm'></div>
                <div className='list-layout-item-cpm'></div>
              </li>
              <li className='list-layout-item' data-tooltip='1/4 column'>
                <div className='list-layout-item-cpm'></div>
                <div className='list-layout-item-cpm'></div>
                <div className='list-layout-item-cpm'></div>
                <div className='list-layout-item-cpm'></div>
              </li>
              <li className='list-layout-item' data-tooltip='1/5 column'>
                <div className='list-layout-item-cpm'></div>
                <div className='list-layout-item-cpm'></div>
                <div className='list-layout-item-cpm'></div>
                <div className='list-layout-item-cpm'></div>
                <div className='list-layout-item-cpm'></div>
              </li>
              <li className='list-layout-item' data-tooltip='1/6 column'>
                <div className='list-layout-item-cpm'></div>
                <div className='list-layout-item-cpm'></div>
                <div className='list-layout-item-cpm'></div>
                <div className='list-layout-item-cpm'></div>
                <div className='list-layout-item-cpm'></div>
                <div className='list-layout-item-cpm'></div>
              </li>
              <li className='list-layout-item' data-tooltip='5/7 column'>
                <div className='list-layout-item-cpm cl-5'></div>
                <div className='list-layout-item-cpm cl-7'></div>
              </li>
              <li className='list-layout-item' data-tooltip='7/5 column'>
                <div className='list-layout-item-cpm cl-7'></div>
                <div className='list-layout-item-cpm cl-5'></div>
              </li>
              <li className='list-layout-item' data-tooltip='4/8 column'>
                <div className='list-layout-item-cpm cl-4'></div>
                <div className='list-layout-item-cpm cl-8'></div>
              </li>
              <li className='list-layout-item' data-tooltip='8/4 column'>
                <div className='list-layout-item-cpm cl-8'></div>
                <div className='list-layout-item-cpm cl-4'></div>
              </li>
              <li className='list-layout-item' data-tooltip='3/9 column'>
                <div className='list-layout-item-cpm cl-3'></div>
                <div className='list-layout-item-cpm cl-9'></div>
              </li>
              <li className='list-layout-item' data-tooltip='9/3 column'>
                <div className='list-layout-item-cpm cl-9'></div>
                <div className='list-layout-item-cpm cl-3'></div>
              </li>
              <li className='list-layout-item' data-tooltip='3/6/3 column'>
                <div className='list-layout-item-cpm cl-3'></div>
                <div className='list-layout-item-cpm cl-6'></div>
                <div className='list-layout-item-cpm cl-3'></div>
              </li>
              <li className='list-layout-item' data-tooltip='2/8/2 column'>
                <div className='list-layout-item-cpm cl-2'></div>
                <div className='list-layout-item-cpm cl-8'></div>
                <div className='list-layout-item-cpm cl-2'></div>
              </li>
              <li className='list-layout-item' data-tooltip='3/3/6 column'>
                <div className='list-layout-item-cpm cl-3'></div>
                <div className='list-layout-item-cpm cl-3'></div>
                <div className='list-layout-item-cpm cl-6'></div>
              </li>
              <li className='list-layout-item' data-tooltip='2/2/8 column'>
                <div className='list-layout-item-cpm cl-2'></div>
                <div className='list-layout-item-cpm cl-2'></div>
                <div className='list-layout-item-cpm cl-8'></div>
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}

export default Settings
