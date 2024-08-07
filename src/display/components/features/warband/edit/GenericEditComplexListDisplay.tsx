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
import { ItemCost, EditListType, EditListDataDex } from './StaticEditComplexList';

const GenericEditListDisplay = (props: any) => {
    const Manager : WarbandManager = props.manager;
    const WarbandItem: Warband = props.warband;
    const WarbandMember : WarbandMember | null = props.member;
    const EditStaticType : EditListType = EditListDataDex[props.statictype]
    const UpdateFunction = props.updater;
    
    const [theme] = useGlobalState('theme');
    const listRef = useRef<HTMLSelectElement>(null);
    const restrictionRef = useRef<HTMLInputElement>(null);
    const costTypeRef = useRef<HTMLSelectElement>(null);
    const costValueRef = useRef<HTMLInputElement>(null);

    const [Filters, setFilters] = useState( EditStaticType.returnFilters());
    const List_Selection = "";
    let NewItemName : string = List_Selection;
    let NewItemCost : ItemCost = {type: 'ducats', value : 0}
    let NewItemComments = "";

    const [options, setOptions] = useState(EditStaticType.returnOptions(EditStaticType, Manager, WarbandItem, Filters, WarbandMember));
    const [showNameEdit, setShowNameEdit] = useState(false);
    const handleCloseItemEdit = () => setShowNameEdit(false); 
    const handleShowItemEdit = () => setShowNameEdit(true);

    function updateCostType(value : string) {
        NewItemCost.type = value;
    }

    function updateCostValue(value : string) {
        NewItemCost.value = parseInt(value);
    }

    function updateItem(value: string) {
        NewItemName = value;
        const DataObj = EditStaticType.returnItemData(EditStaticType, Manager, WarbandItem, value, Filters, WarbandMember)
        NewItemCost = EditStaticType.returnCost(EditStaticType, Manager, WarbandItem, DataObj, Filters, WarbandMember)
        NewItemComments = EditStaticType.returnComment(EditStaticType, Manager, WarbandItem, DataObj, Filters, WarbandMember);

        if (restrictionRef.current) { restrictionRef.current.value = NewItemComments; }
        if (costTypeRef.current) { costTypeRef.current.value = NewItemCost.type; }
        if (costValueRef.current) { costValueRef.current.value = NewItemCost.value.toString(); }
    }

    function updateModel() {
        if (restrictionRef.current) { restrictionRef.current.value = NewItemComments; }
        if (costTypeRef.current) { costTypeRef.current.value = NewItemCost.type; }
        if (costValueRef.current) { costValueRef.current.value = NewItemCost.value.toString(); }

        UpdateFunction(WarbandItem)
        setFilters( EditStaticType.returnFilters());
    }

    function updateFilter(_filter : string) {
        const FilterCopy = Filters
        FilterCopy[_filter] = !(Filters[_filter])
        setFilters(FilterCopy);
        setOptions(EditStaticType.returnOptions(EditStaticType, Manager, WarbandItem, Filters, WarbandMember))
    }

    function filter(_filter :  string) {
        return (
            <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="row">
                    <InputGroup className="tagboxpad squaredThree" style={{height:"2em"}}>
                        <Form.Check type="checkbox" onClick={(e) => {updateFilter(_filter)}} label={_filter} defaultChecked={Filters[_filter]}/>
                    </InputGroup>
                </div>
            </div>
        )
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
                            {Object.keys(Filters).map((item) => filter(item))}
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <InputGroup className="tagboxpad" style={{height:"2em"}}>
                                <Form.Control as="select" style={{height:"100%",textAlign:"center",fontSize:"0.85em",paddingTop:"0em",borderRadius:"0em"}} ref={listRef} aria-label="Default select example"  placeholder="Member Type" onChange={e => { updateItem(e.target.value)    } } >
                                    <option key="modeloption" value="[None Selected]">[None Selected]</option>
                                    {options.map((item : any) => (  EditStaticType.displayOptions(EditStaticType, Manager, WarbandItem, item, Filters, WarbandMember) ))}
                                </Form.Control>
                            </InputGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <InputGroup className="tagboxpad" style={{height:"2em"}}>
                                <Form.Control ref={costValueRef} style={{ height:"100%",textAlign:"center",borderRadius:"0em"}} type="number" aria-label="Text input" defaultValue={0} onChange={e => { updateCostValue(e.target.value) } } />
                            </InputGroup>
                        </div>
                        <div className="col-6">
                            <InputGroup className="tagboxpad" style={{height:"2em"}}>
                                <Form.Control as="select" style={{height:"100%",textAlign:"center",fontSize:"0.85em",paddingTop:"0em",borderRadius:"0em"}} ref={costTypeRef} aria-label="Default select example"  placeholder="" onChange={e => { updateCostType(e.target.value)    } } >
                                    <option key="costoptionducats" value="ducats">Ducats</option>
                                    <option key="costoptionducats" value="glory">Glory</option>
                                </Form.Control>
                            </InputGroup>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-12">
                            <InputGroup className="tagboxpad" style={{height:"2em"}}>
                                <Form.Control ref={restrictionRef} style={{ height:"100%",textAlign:"center",borderRadius:"0em"}} readOnly aria-label="Text input" defaultValue={"-"}/>
                            </InputGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <FontAwesomeIcon icon={faPlus} onClick={() => EditStaticType.addNewItem(Manager, WarbandItem, NewItemName, handleCloseItemEdit, updateModel, NewItemCost, WarbandMember)} className="pageaccestextsmall hovermouse" style={{fontSize:"3em"}}/>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            </>
        )
    }

    return (
        <div>
            {EditStaticType.returnShowSelector(WarbandItem, WarbandMember) == true &&
                <div className="row">
                    {addItem()}
                </div>
            }
            <div className="verticalspacer"/>
            <div className="row">
                {
                <>{EditStaticType.returnItemArray(WarbandItem, WarbandMember).map((item: any) => ( 
                    <div key="modeloption">{EditStaticType.returnItem(EditStaticType, Manager, WarbandItem, item, updateModel, WarbandMember)}</div> 
                ))}</>
                }
            </div>                
        </div>
    )
}

export default GenericEditListDisplay;