import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';

import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

const ContentPackInformation = (prop: any) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    // Return result -----------------------------
    return (
        <>
            <div style={{display:"flex"}}>
                <FontAwesomeIcon icon={faCircleInfo} onClick={() => handleShow()} className="pageaccestext hovermouse" style={{fontSize:"3em"}}/>
            </div>
            <Modal onEnterKeyDown={() => handleClose()} show={show}  contentClassName="filterboxStructure" dialogClassName="" onHide={handleClose} keyboard={true}  centered>
                
                            <h1 className={'titleShape titlepurple'}>
                                Content Packs
                                <div className="row float-end">
                                    <div className='col-12 float-end'>
                                        <Button style={{padding:"0em"}} variant="" onClick={() => handleClose()}>
                                            <FontAwesomeIcon icon={faCircleXmark} style={{fontSize:"2em",color:"white",margin:"0em"}}/>
                                        </Button>
                                    </div>
                                </div>
                            </h1>
                            <Modal.Body >
                            <div className="row p-3 overflow-auto flex-grow-1">
                                <div style={{"maxHeight": "calc(70vh"}}>
                                    <div className="col-12">
                                
                                <div className="row textHolder">
                                    <p className="bodytext">
                                        Content packs are structured JSON files that allow people to make their ICON content accessable in
                                        ICONpendium. Here, you can add or delete content packs to include them in the ICONpendium. You can
                                        hold up to 5MB of content packs at any given time.
                                    </p>
                                    <p className="bodytext">
                                        Once uploaded you can activate or deactive a content pack. Deactivating it removes it from the ICONpendium,
                                        but still keeps the file stored on your browser and can be turned on again at any time.
                                    </p>
                                    <div className="separator"><p style={{fontSize:"0.8em"}}>Incompatability</p></div>
                                    <p className="bodytext">
                                        If two pieces of data across your uploaded content packs share the same ID value, this can cause issues
                                        when searching and constructing information. When this incompatability is detected, you will be notified.
                                        and are encouraged to remove the offending content pack.
                                    </p>
                                    <div className="separator"><p style={{fontSize:"0.8em"}}>Custom Packs</p></div>
                                    <p className="bodytext">
                                        Building your own content pack is easy. View the <a className='homelink' href='https://github.com/Bob-The-Seagull-King/icon-react/blob/main/README.md' rel="noreferrer" target='_blank'>README</a> documentation for the ICONconpendium to learn more
                                        about how to structure your content pack, then fill out the information as you need it. Once
                                        everything{"'"}s in order, you{"'"}re good to go!
                                    </p>
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

export default ContentPackInformation