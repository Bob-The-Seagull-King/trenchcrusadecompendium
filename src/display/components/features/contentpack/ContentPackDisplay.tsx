import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { ContentPack } from '../../../../classes/contentpacks/contentpack'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { faUnlock } from '@fortawesome/free-solid-svg-icons'
import { makestringpresentable } from '../../../../utility/functions'

const ContentPackDisplay = (props: any) => {
    const PackItem: ContentPack = props.data;
    const parentView = props.parent;
    const updateHost = props.statefunction;
    
    const [stateWidth, setWidth] = useState(window.innerWidth);
    const ref = useRef<HTMLDivElement>(null);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function removeContentPack() {
        parentView.DeletePack(PackItem);
        updateHost();
    }

    function switchContentPackState() {
        PackItem.IsActive = !PackItem.IsActive;
        parentView.SetStorage();
        updateHost();
    }
    
    useEffect(() => {
        const setContentPackWidth = () => {
            if(ref.current) {
                setWidth(ref.current.clientWidth);
            }
        }
        window.addEventListener("load", setContentPackWidth, false);
        window.addEventListener("resize", setContentPackWidth, false);
        setContentPackWidth();
    }, [stateWidth])

    return (
        <>
            <div className='' ref={ref}>
                {stateWidth > 700 &&
                    <div className="contentpackcontainer smallbordersubpurple" >
                        <span className="packvrbox">
                            <Button style={{padding:"0em"}} variant="" onClick={() => handleShow()}>
                                <FontAwesomeIcon icon={faBookOpen} className="purpleIcon" style={{fontSize:"2em",margin:"0em"}}/>
                            </Button>
                            <div className="vr packvr"></div>
                            <Button style={{padding:"0em"}} variant="" onClick={() => switchContentPackState()}>
                                {PackItem.IsActive &&
                                    <FontAwesomeIcon icon={faUnlock} className="greenIcon" style={{fontSize:"2em",margin:"0em"}}/>
                                }
                                {!PackItem.IsActive &&
                                    <FontAwesomeIcon icon={faLock} className="redIcon" style={{fontSize:"2em",margin:"0em"}}/>
                                }
                            </Button>
                            <div className="vr packvr"></div>
                        </span>
                        <span className="contentsubnamecontainer">
                            <span/>
                            <h1 className="packtitle">
                                {PackItem.Name}
                            </h1>
                            <div className="vr packvr"></div>
                            <h3 className="packsubtitle">
                                {PackItem.Author}
                            </h3>
                            <span/>
                        </span>
                        <span className="packvrbox">
                            <div className="vr packvr"></div>
                            <Button style={{padding:"0em"}} variant="" onClick={() => removeContentPack()}>
                                <FontAwesomeIcon icon={faTrash} className="redIcon" style={{fontSize:"2em",margin:"0em"}}/>
                            </Button>
                        </span>
                    </div>
                }
                {stateWidth <= 700 &&
                    <div className="contentpacksmallcontainer smallbordersubpurple" >
                        
                        <div className="row" style={{width:"100%"}}>
                            <div className="col-12 smallcontentpackrow" style={{display: "flex", justifyContent:"space-between"}}>
                                <span/>
                                <h1 className="packtitle" style={{width:"fit-content"}}>
                                    {PackItem.Name}
                                </h1>
                                <span/>
                            </div>
                        </div>
                        <div className="row" style={{width:"100%"}}>
                            <div className="col-12 smallcontentpackrow" style={{display: "flex", justifyContent:"space-between"}}>
                                <span/>
                                <h3 className="packsubtitle" style={{width:"fit-content"}}>
                                    {PackItem.Author}
                                </h3>
                                <span/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 smallcontentpackrow" style={{display: "flex", justifyContent:"space-between"}}>
                                <span/>
                                <Button style={{padding:"0em"}} variant="" onClick={() => handleShow()}>
                                    <FontAwesomeIcon icon={faBookOpen} className="purpleIcon" style={{fontSize:"2em",margin:"0em"}}/>
                                </Button>
                                <div className="vr packvr"></div>
                                <Button style={{padding:"0em"}} variant="" onClick={() => switchContentPackState()}>
                                    {PackItem.IsActive &&
                                        <FontAwesomeIcon icon={faUnlock} className="greenIcon" style={{fontSize:"2em",margin:"0em"}}/>
                                    }
                                    {!PackItem.IsActive &&
                                        <FontAwesomeIcon icon={faLock} className="redIcon" style={{fontSize:"2em",margin:"0em"}}/>
                                    }
                                </Button>
                                <div className="vr packvr"></div>
                                <Button style={{padding:"0em"}} variant="" onClick={() => removeContentPack()}>
                                    <FontAwesomeIcon icon={faTrash} className="redIcon" style={{fontSize:"2em",margin:"0em"}}/>
                                </Button>
                                <span/>
                            </div>
                        </div>
                    </div>
                }
            </div>

            <Modal size="lg" onEnterKeyDown={() => handleClose()} show={show}  contentClassName="filterboxStructure" dialogClassName="" onHide={handleClose} keyboard={true}  centered>    
                <h1 className={'titleShape titlepurple'}>
                    {PackItem.Name}
                    <div className="row float-end">
                        <div className='col-12 float-end'>
                            <Button style={{padding:"0em"}} variant="" onClick={() => handleClose()}>
                                <FontAwesomeIcon icon={faCircleXmark} style={{fontSize:"2em",color:"white",margin:"0em"}}/>
                            </Button>
                        </div>
                    </div>
                </h1>
                <Modal.Body >
                    <div className="row overflow-auto flex-grow-1 m-0 p-0">
                        <div style={{"maxHeight": "calc(70vh"}}>
                            <div className="separator" style={{marginTop:"0em"}}><h5>By {PackItem.Author}</h5></div>
                            <div className="col-12" style={{fontSize:"0.95em"}}>
                                {PackItem.Description}
                            </div>
                            <div className="separator" style={{marginTop:"0em"}}><h5>Content</h5></div>
                            <div style={{display:"flex",flexWrap:"wrap"}}>
                                {PackItem.Tags.map((item: any) => (
                                    <div className="filterobjectdisplay" key={"packdisplay"}>
                                        {makestringpresentable(item.name)} - {item.count.toString()}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ContentPackDisplay;