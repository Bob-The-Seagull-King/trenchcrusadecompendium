import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../resources/styles/_icon.scss'
import React, { useRef, useState } from 'react'

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { Warband } from '../../../../../classes/lists/Warband';
import { WarbandManager } from '../../../../../classes/lists/warbandmanager';
import { WarbandMember } from '../../../../../classes/lists/WarbandMember';
import { useGlobalState } from '../../../../../utility/globalstate'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { EditItemType, EditItemDataDex } from './WarbandEditStatic';

const WarbandItemAppendListDisplay = (props: any) => {
    const Manager : WarbandManager = props.manager;
    const WarbandItem: Warband = props.warband;
    const WarbandMember : WarbandMember | null = props.member;
    const EditStaticType : EditItemType = EditItemDataDex[props.statictype]
    const UpdateFunction = props.updater;
    
    const [theme] = useGlobalState('theme');
    const listRef = useRef<HTMLSelectElement>(null);

    const List_Selection = "";
    let NewItemName = List_Selection;

    const [showNameEdit, setShowNameEdit] = useState(false);
    const handleCloseItemEdit = () => setShowNameEdit(false); 
    const handleShowItemEdit = () => setShowNameEdit(true);

    function updateItem(value: string) {
        NewItemName = value;
    }

    function updateModel() {
        UpdateFunction(WarbandItem)
    }

    function addItem() {
        return (
            <>
            <div className="subfonttext" style={{display:"flex",alignItems:"center"}}>
                <div className="subfonttext hovermouse generalbuttonbox" style={{display:"flex",alignItems:"center",fontSize:"0.5em",width:"100%",padding:"0.5em",margin:"0em"}}   onClick={() => handleShowItemEdit()}>
                    <div style={{marginRight:"0.5em",textAlign:"center",width:"fit-content"}} className="">{EditStaticType.title}</div>
                    <FontAwesomeIcon icon={faPlus} className="" style={{fontSize:"0.75em"}}/>
                </div>
            </div>
            <Modal data-theme={theme} onEnterKeyDown={() => handleCloseItemEdit()} show={showNameEdit}  contentClassName="filterboxStructure" dialogClassName="" onHide={handleCloseItemEdit} keyboard={true}  centered>
                <h1 className={'titleShape titlestyler backgroundtc'}>
                    {EditStaticType.title}
                </h1>
                <Modal.Body >
                    <div className="row">
                        <div className="col-10">
                            <InputGroup className="tagboxpad" style={{height:"2em"}}>
                                <Form.Control as="select" style={{height:"100%",textAlign:"center",fontSize:"0.85em",paddingTop:"0em",borderRadius:"0em"}} ref={listRef} aria-label="Default select example"  placeholder="Member Type" onChange={e => { updateItem(e.target.value)    } } >
                                    <option key="modeloption" value="[No Model Selected]">[None Selected]</option>
                                    { EditStaticType.returnOptions(Manager, WarbandItem, WarbandMember) }
                                </Form.Control>
                            </InputGroup>
                        </div>
                        <div className="col-2">
                            <FontAwesomeIcon icon={faPlus} onClick={() => EditStaticType.addNewItem(Manager, WarbandItem, NewItemName, updateModel, handleCloseItemEdit, WarbandMember)} className="pageaccestextsmall hovermouse" style={{fontSize:"3em"}}/>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            </>
        )
    }

    return (
        <>
            <div>
                <div className="row">
                    {
                    <>{EditStaticType.returnItemArray(WarbandItem, WarbandMember).map((item: any) => ( 
                        <div key="modeloption">{EditStaticType.returnItem(EditStaticType, Manager, WarbandItem, item, updateModel, WarbandMember)}</div> 
                    ))}</>
                    }
                </div>
                <div className="verticalspacer"/>
                {EditStaticType.returnShowSelector(WarbandItem, WarbandMember) == true &&
                    <div className="row">
                        {addItem()}
                    </div>
                }
            </div>
        </>
    )
}

export default WarbandItemAppendListDisplay;