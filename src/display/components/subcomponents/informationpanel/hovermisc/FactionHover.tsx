import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../resources/styles/_icon.scss'
import React, { useState } from 'react'

import { PlayerFaction } from '../../../../../classes/feature/factions/Faction'
import * as HoverCard from '@radix-ui/react-hover-card';
import FactionDisplay from '../../../../../display/components/features/faction/FactionDisplay';
import Modal from 'react-bootstrap/Modal';

import { useGlobalState } from './../../../../../utility/globalstate'

const FactionHover = (props: any) => {
    const ruleObject: PlayerFaction = props.data
    const ruleName = props.titlename

    const [show, setShow] = useState(false);
    const [theme, setTheme] = useGlobalState('theme');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <>
          <span>
            <div style={{marginRight:"0.5em",textAlign:"center",width:"fit-content"}} className="hovermouse" onClick={() => handleShow()}>{ruleName}</div>              
          </span>

          <Modal data-theme={theme} onEnterKeyDown={() => handleClose()} show={show} size="lg" contentClassName="overcomeBackground" dialogClassName=""  onHide={handleClose} keyboard={true}  centered>
              <Modal.Body > 
                  <FactionDisplay data={ruleObject}/>
              </Modal.Body>
          </Modal>
      </>
      
    )
}

export default FactionHover;