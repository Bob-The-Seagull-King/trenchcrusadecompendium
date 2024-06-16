import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../resources/styles/_icon.scss'
import React, { useState } from 'react'

import { FactionUpgrade } from '../../../../../classes/feature/factions/FactionUpgrade'
import * as HoverCard from '@radix-ui/react-hover-card';
import EquipmentDisplay from '../../../../../display/components/features/equipment/EquipmentDisplay';
import Modal from 'react-bootstrap/Modal';

const UpgradeHover = (props: any) => {
    const ruleObject: FactionUpgrade = props.data
    const ruleName = props.titlename

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <>
          <span>
            <span className='glossaryPurple hovermouse' onClick={() => handleShow()}>{ruleName}</span>                
          </span>

          <Modal onEnterKeyDown={() => handleClose()} show={show} size="lg" contentClassName="" dialogClassName=""  onHide={handleClose} keyboard={true}  centered>
              <Modal.Body > 
                  <EquipmentDisplay data={ruleObject}/> 
              </Modal.Body>
          </Modal>
      </>
    )
}

export default UpgradeHover;