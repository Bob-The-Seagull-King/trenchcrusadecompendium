import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../resources/styles/_icon.scss'
import React, { useState } from 'react'

import { PlayerModel } from '../../../../../classes/feature/models/Model'
import * as HoverCard from '@radix-ui/react-hover-card';
import ModelDisplay from '../../../../../display/components/features/models/ModelDisplay';
import Modal from 'react-bootstrap/Modal';

const ModelHover = (props: any) => {
    const ruleObject: PlayerModel = props.data
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
                  <ModelDisplay data={ruleObject}/>
              </Modal.Body>
          </Modal>
      </>
      
    )
}

export default ModelHover;