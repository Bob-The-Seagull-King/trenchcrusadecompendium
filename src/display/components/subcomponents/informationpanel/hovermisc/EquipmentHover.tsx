import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../resources/styles/_icon.scss'
import React, { useState } from 'react'

import { PlayerEquipment } from '../../../../../classes/feature/equipment/Equipment'
import * as HoverCard from '@radix-ui/react-hover-card';
import EquipmentDisplay from '../../../../../display/components/features/equipment/EquipmentDisplay';
import Modal from 'react-bootstrap/Modal';

import { useGlobalState } from './../../../../../utility/globalstate'

const GlossaryHover = (props: any) => {
    const ruleObject: PlayerEquipment = props.data
    const ruleName = props.titlename

    const [show, setShow] = useState(false);
    const [theme, setTheme] = useGlobalState('theme');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <>
          <span>
            <span className='glossaryPurple hovermouse' onClick={() => handleShow()}>{ruleName}</span>                
          </span>

          <Modal data-theme={theme} onEnterKeyDown={() => handleClose()} show={show} size="lg" contentClassName="overcomeBackground" dialogClassName=""  onHide={handleClose} keyboard={true}  centered>
              <Modal.Body > 
                  <EquipmentDisplay data={ruleObject}/> 
              </Modal.Body>
          </Modal>
      </>
    )
}

export default GlossaryHover;