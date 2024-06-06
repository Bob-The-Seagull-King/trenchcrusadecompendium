import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../resources/styles/_icon.scss'
import React, { useState } from 'react'

import { PlayerFaction } from '../../../../../classes/feature/factions/Faction'
import * as HoverCard from '@radix-ui/react-hover-card';
import FactionDisplay from '../../../../../display/components/features/faction/FactionDisplay';
import Modal from 'react-bootstrap/Modal';

const FactionHover = (props: any) => {
    const ruleObject: PlayerFaction = props.data
    const ruleName = props.titlename

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <>
          <span>
            <div style={{marginRight:"0.5em",textAlign:"center",width:"fit-content"}} className="hovermouse" onClick={() => handleShow()}>{ruleName}</div>              
          </span>

          <Modal onEnterKeyDown={() => handleClose()} show={show} size="lg" contentClassName="" dialogClassName=""  onHide={handleClose} keyboard={true}  centered>
              <Modal.Body > 
                  <FactionDisplay data={ruleObject}/>
              </Modal.Body>
          </Modal>
      </>
      
    )
}

export default FactionHover;