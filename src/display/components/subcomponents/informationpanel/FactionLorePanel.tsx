import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';

import Modal from 'react-bootstrap/Modal';
import ModelDescriptionItemDisplay from '../../subcomponents/description/ModelDescriptionItemDisplay';
import { PlayerFaction } from '../../../../classes/feature/factions/Faction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

const FactionLorePanel = (props: any) => {
    const ModelObject : PlayerFaction = props.data

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    

    function returnFlavour() {
        return (
            <div>
                {ModelObject.Flavour.map((item) => (
                    <div key={"flavourFaction"+(ModelObject.Flavour.indexOf(item))}>
                        <ModelDescriptionItemDisplay data={item} parent={ModelObject}/>
                    </div>
                ))}
            </div>
        )
    }

    
    // Return result -----------------------------
    return (
        <>
            <div>

                <div className="pageaccessbox hovermouse" onClick={() => handleShow()}>
                    <p className="loreaccesstext">
                        Click to Expand Assorted Historical Accounts and Information
                    </p>
                </div>
                
            </div>
            <Modal onEnterKeyDown={() => handleClose()} show={show} size="lg" contentClassName="filterboxStructure" dialogClassName=""  onHide={handleClose} keyboard={true}  centered>
                
                            <h1 className={'titleShape titlepurple'}>
                                {ModelObject.Name}
                                <div className="row float-end">
                                    <div className='col-12 float-end'>
                                        <Button style={{padding:"0em"}} variant="" onClick={() => handleClose()}>
                                            <FontAwesomeIcon icon={faCircleXmark} className="setWhite" style={{fontSize:"2em",margin:"0em"}}/>
                                        </Button>
                                    </div>
                                </div>
                            </h1>
                            <Modal.Body >
                            <div className="row p-3 overflow-auto flex-grow-1">
                                <div style={{"maxHeight": "calc(70vh"}}>
                                    <div className="col-12">
                                
                                <div className="row textHolder">
                                    {returnFlavour()}
                                </div>
                        </div>
                    </div>
                </div>
                
                </Modal.Body>
            </Modal>
        </>
    )
    // -------------------------------------------
}

export default FactionLorePanel