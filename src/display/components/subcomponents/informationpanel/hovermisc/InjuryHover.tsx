import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../resources/styles/_icon.scss'
import React, { useState } from 'react'

import { IItemPartial } from '../../../../../classes/feature/list/ListGroup'
import { ListItem } from '../../../../../classes/feature/list/ListItem'
import * as HoverCard from '@radix-ui/react-hover-card';
import EquipmentDisplay from '../../../../../display/components/features/equipment/EquipmentDisplay';
import Modal from 'react-bootstrap/Modal';
import { ModelDescription } from '../../../../../classes/feature/models/ModelDescription';
import ModelDescriptionItemDisplay from '../../description/ModelDescriptionItemDisplay';

import { useGlobalState } from './../../../../../utility/globalstate'

const InjuryHover = (props: any) => {
    const ruleObject: ListItem = props.data
    const ruleName = props.titlename

    const [show, setShow] = useState(false);
    const [theme, setTheme] = useGlobalState('theme');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
      <>
          <span>
            <span className='glossaryPurple hovermouse' style={{fontSize:"1.1em"}} onClick={() => handleShow()}>{ruleName}</span>                
          </span>

          <Modal data-theme={theme} onEnterKeyDown={() => handleClose()} show={show} size="lg" contentClassName="overcomeBackground" dialogClassName=""  onHide={handleClose} keyboard={true}  centered>
              <Modal.Body > 
                    {
                    <>{ruleObject.Description.map((item : any) => ( 
                        <ModelDescriptionItemDisplay key="modeloption" data={item} parent={ruleObject}/> 
                    ))}</>
                    } 
              </Modal.Body>
          </Modal>
      </>
    )
}

export default InjuryHover;