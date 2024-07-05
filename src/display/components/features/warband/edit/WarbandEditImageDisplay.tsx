import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../resources/styles/_icon.scss'
import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import { Warband } from '../../../../../classes/lists/Warband';
import { WarbandManager } from '../../../../../classes/lists/warbandmanager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { useGlobalState } from '../../../../../utility/globalstate'

const WarbandImageEditDisplay = (props: any) => {
    const WarbandItem: Warband = props.data;
    const UpdateFunction = props.updater;
    const Manager : WarbandManager = props.manager;

    const Warband_Image = ((WarbandItem? WarbandItem.Image : ""));
    let NewBandImage = Warband_Image;
    const [theme, setTheme] = useGlobalState('theme');

    const [showImageEdit, setShowImageEdit] = useState(false);
    const handleCloseImageEdit = () => setShowImageEdit(false); 
    const handleShowImageEdit = () => setShowImageEdit(true);

    const inputRefImageEdit = useRef<HTMLInputElement>(null);
    const imageDisplay = useRef<HTMLInputElement>(null);

    function updateImage(value: string) {
        NewBandImage = value;
    }
    
    const [showsize, setSize] = useState(false);
    const [heightimg, setHeight] = useState(defaultContentWidth());

    const img = new (window as any).Image();  

    img.src = Warband_Image;
    img.onload = () => {
        if (img.width > img.height) {
            setSize(true);
        } else {
            setSize(false);
        }
    }


    function EditWarbandImage() {
        if (WarbandItem != null) {
            WarbandItem.Image = NewBandImage;
        }
        UpdateFunction(WarbandItem)
        handleCloseImageEdit();
        img.src = NewBandImage;
    }

    function defaultContentWidth() {
        if(imageDisplay.current) {
            return ((imageDisplay.current.clientWidth).toString())+"px"
        } else {
            return "300px";
        }
    }
    
    useEffect(() => {
        const setContentPackWidth = () => {
            if(imageDisplay.current) {
                setHeight(((imageDisplay.current.clientWidth).toString())+"px");
            }
        }
        window.addEventListener("load", setContentPackWidth, false);
        window.addEventListener("resize", setContentPackWidth, false);
        setContentPackWidth();
    }, [setHeight])

    return (
        <>
            <div className="row">
                <div className="col" style={{width:"100%"}}>
                    <div ref={imageDisplay} className={(showsize? "image-wrapperwide" : "image-wrapper") + " hovermouse borderstyler bordertc"} onClick={() => handleShowImageEdit()} style={{paddingTop:heightimg}}>
                        <Image src={Warband_Image} />
                    </div>
                </div>
            </div>
            <Modal data-theme={theme} onEnterKeyDown={() => handleCloseImageEdit()} show={showImageEdit}  contentClassName="filterboxStructure" dialogClassName="" onHide={handleCloseImageEdit} keyboard={true}  centered>
                
                <h1 className={'titleShape titlestyler backgroundtc'}>
                    {"Update Warband Image Link"}
                </h1>
                <Modal.Body >
                    <div className="row">
                        <div className="col-10">
                            <InputGroup className="tagboxpad" >
                                <Form.Control size="lg" className="no-margins" ref={inputRefImageEdit} style={{fontSize:"1.5em", height:"0.5em", textAlign:"center"}} onChange={e => updateImage(e.target.value)} aria-label="Text input" defaultValue={Warband_Image} placeholder=""/>
                            </InputGroup>
                        </div>
                        <div className="col-2">
                            <FontAwesomeIcon icon={faSave} onClick={() => EditWarbandImage()} className="pageaccestextsmall hovermouse" style={{fontSize:"3em"}}/>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default WarbandImageEditDisplay;