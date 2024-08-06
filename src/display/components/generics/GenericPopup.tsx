import 'bootstrap/dist/css/bootstrap.css'
import '../../../resources/styles/_icon.scss'
import React, { useState } from 'react'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { useGlobalState } from '../../../utility/globalstate'
import { PanelDataDex, PanelType } from '../subcomponents/informationpanel/InfoPanelStatic';
import { getColour } from '../../../utility/functions';

const GenericPopup = (prop: any) => {
    const DisplayColour : string = prop.d_colour;
    const DisplayType : string = prop.d_type;
    const panelid : Lowercase<string> = prop.panelname;
    const panelType : PanelType = PanelDataDex[panelid]
    const panelObj : any | null = prop.panelObj

    // State
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [theme] = useGlobalState('theme');

    
    // Return result -----------------------------
    return (
        <>
            <div style={{display:"flex"}}>
                {panelType.returnButton(handleShow)}
            </div>
            <Modal data-theme={theme}  show={show} size="lg" contentClassName="overcomeBackground" dialogClassName="" onHide={handleClose} keyboard={true}  centered>
                
                <Modal.Body >
                    <div className={'modelStructure borderstyler ' + DisplayType + 'border'+getColour(DisplayColour)}>
                        <h1 className={'titleShape titlestyler ' + DisplayType + 'background'+getColour(DisplayColour)}>
                            {panelType.returnTitle(panelObj)}
                            <div className="row float-end">
                                <div className='col-12 float-end'>
                                    <Button style={{padding:"0em"}} variant="" onClick={() => handleClose()}>
                                        <FontAwesomeIcon icon={faCircleXmark} style={{fontSize:"2em",color:"white",margin:"0em"}}/>
                                    </Button>
                                </div>
                            </div>
                        </h1>
                        {panelType.returnModal(panelObj)}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
    // -------------------------------------------
}

export default GenericPopup