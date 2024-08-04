import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../../resources/styles/_icon.scss'
import React, { useRef, useState } from 'react'

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Warband } from '../../../../../../classes/lists/Warband';
import { WarbandManager } from '../../../../../../classes/lists/warbandmanager';
import { WarbandMember } from '../../../../../../classes/lists/WarbandMember';
import { ListEquipment } from '../../../../../../classes/lists/ListEquipment';
import { Requester } from '../../../../../../factories/Requester';
import { useGlobalState } from '../../../../../../utility/globalstate'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { faPersonMilitaryRifle } from '@fortawesome/free-solid-svg-icons'

const MemberAddEquipDisplay = (props: any) => {
    const WarbandItem: Warband = props.data;
    const Member : WarbandMember = props.member;
    const UpdateFunction = props.updater;
    const Manager : WarbandManager = props.manager;
    
    const [theme] = useGlobalState('theme');

    // Creation of New warband member ---------------------------

    const [_limitfaction, returnLimitFaction] = useState(true);
    const [_limitranged, returnLimitRanged] = useState(true);
    const [_limitmelee, returnLimitMelee] = useState(true);
    const [_limitarmour, returnLimitArmour] = useState(true);
    const [_limitequipment, returnLimitEquipment] = useState(true);
    const [_limitglory, returnLimitGlory] = useState(true);
    const [_limitducat, returnLimitDucat] = useState(true);

    let NewMemberModel = "";
    let NewMemberCost = "0";

    let isDucats = true;
    
    const restrictionRef = useRef<HTMLInputElement>(null);
    const featureRef = useRef<HTMLInputElement>(null);
    const modelRef = useRef<HTMLSelectElement>(null);
    const costRef = useRef<HTMLInputElement>(null);
    const costTypeDucatRef = useRef<HTMLInputElement>(null);
    const costTypeGloryRef = useRef<HTMLInputElement>(null);
    const factionlimitcheck = useRef<HTMLInputElement>(null);

    const filterListRanged = useRef<HTMLInputElement>(null);
    const filterListMelee = useRef<HTMLInputElement>(null);
    const filterListArmour = useRef<HTMLInputElement>(null);
    const filterListEquipment = useRef<HTMLInputElement>(null);
    const filterListGlory = useRef<HTMLInputElement>(null);
    const filterListDucat = useRef<HTMLInputElement>(null);

    function getFeatureList(model : ListEquipment) {
        let ftrlst = "";

        let i = 0;

        let ModelEquip : any = null;
        
        for (i = 0; i < WarbandItem.Faction.Equipment.length ; i++) {
            if (WarbandItem.Faction.Equipment[i].ID == model.ID) {
                ModelEquip = WarbandItem.Faction.Equipment[i]
            }
        }

        if (ModelEquip != null) {

                let i = 0;
                for (i = 0; i < ModelEquip.Features.length; i++) {
                    if ( i > 0) {
                        ftrlst += ", "
                    }
                    ftrlst += ModelEquip.Features[i].toString().toUpperCase();
                }
            }

        if (ftrlst == "") {
            ftrlst = "-"
        }
            

        return ftrlst;

    }
    
    function getRestrictionList(model : ListEquipment) {
        let rstrctnlst = "";

        let i = 0;

        let ModelEquip : any = null;
        
        for (i = 0; i < WarbandItem.Faction.Equipment.length ; i++) {
            if (WarbandItem.Faction.Equipment[i].ID == model.ID) {
                ModelEquip = WarbandItem.Faction.Equipment[i]
            }
        }

        if (ModelEquip != null) {
        if (ModelEquip.Limit > 0) {
            rstrctnlst += "LIMIT: " + ModelEquip.Limit;
            if (ModelEquip.Restrictions.length > 0) {
                rstrctnlst += ", "
            }
        }

        let i = 0;
        for (i = 0; i < ModelEquip.Restrictions.length; i++) {
            if ( i > 0) {
                rstrctnlst += ", "
            }
            if (ModelEquip.Restrictions[i].type == "keyword") {
                rstrctnlst += ModelEquip.Restrictions[i].val.toString().toUpperCase();
            } else if (ModelEquip.Restrictions[i].type == "purchase") {
                rstrctnlst += (ModelEquip.Restrictions[i].val === 'explore')? "Exploration Only" : "";
            } else if (ModelEquip.Restrictions[i].type == "model") {
                rstrctnlst += getModelName(ModelEquip.Restrictions[i].val.toString());
            } else {
                rstrctnlst += ModelEquip.Restrictions[i].val.toString()
            }
        }
    }

        if (rstrctnlst == "") {
            rstrctnlst = "-"
        }

        return rstrctnlst;
    }
    
    function getModelName(md : string) {
        const modelFound = (Requester.MakeRequest({searchtype: "id", searchparam: {type: 'models', id: md}}));
        return modelFound.name;
    }

    function updateModel(value: string) {
        NewMemberModel = value;
        if (_limitfaction) {
            const tempModel = Manager.GetEquipmentByID(value)
            let temp : any = null;
            let i = 0;
            for (i = 0 ; i < WarbandItem.Faction.Equipment.length ; i++) {
                if (WarbandItem.Faction.Equipment[i].ID == (tempModel? tempModel.ID : "")) {
                    temp = WarbandItem.Faction.Equipment[i]
                    break;
                }
            }
            if (temp != null) {
                if (costRef.current != null) {
                    costRef.current.value = temp.Cost.toString();
                    updateCost(temp.Cost.toString())
                }
                if (costTypeDucatRef.current != null) {
                    costTypeDucatRef.current.checked = (temp.CostID == "ducats")? true : false;
                }
                if (costTypeGloryRef.current != null) {
                    costTypeGloryRef.current.checked = (temp.CostID == "ducats")? false : true;
                }
                if (temp.CostID == "ducats") {
                    isDucats = (true);
                } else {
                    isDucats = (false);
                }
                if (restrictionRef.current != null) {
                    restrictionRef.current.value = "Restrictions : " + getRestrictionList(temp);
                }
                if (featureRef.current != null) {
                    featureRef.current.value = "Features : " + getFeatureList(temp);
                }

            }
        }
    }

    function updateCost(value: string) {
        NewMemberCost = value;
    }

    function updateGloryCostType(value: string) {
        isDucats = (false);
    }

    function updateDucatCostType(value: string) {
        isDucats = (true);
    }

    function updateFactionLimit() {
        returnLimitFaction(!_limitfaction)
    }
    function updateFactionRanged() {
        returnLimitRanged(!_limitranged)
    }
    function updateFactionMelee() {
        returnLimitMelee(!_limitmelee)
    }
    function updateFactionArmour() {
        returnLimitArmour(!_limitarmour)
    }
    function updateFactionEquipment() {
        returnLimitEquipment(!_limitequipment)
    }
    function updateFactionGlory() {
        returnLimitGlory(!_limitglory)
    }
    function updateFactionDucat() {
        returnLimitDucat(!_limitducat)
    }

    function NewMember() {
        const NewMemberCostType = isDucats? "ducats" : "glory";
        const Result = Manager.NewEquipmentForMember(Member, NewMemberModel, NewMemberCost, NewMemberCostType);
        if (Result != "") {
            runToast(Result);
        } else {
            UpdateFunction(Manager.GetWarbandByName(WarbandItem.Name))
        }
        ItemRecall();
        if (restrictionRef.current != null) {
            restrictionRef.current.value = "";
        }
        if (featureRef.current != null) {
            featureRef.current.value = "";
        }
        if (costRef.current != null) {
            costRef.current.value = "0";
        }
        if (modelRef.current != null) {
            modelRef.current.value = "[No Item Selected]";
        }
        if (costTypeDucatRef.current != null) {
            costTypeDucatRef.current.value = "on";
        }
        if (costTypeGloryRef.current != null) {
            costTypeGloryRef.current.value = "off";
        }
        if (factionlimitcheck.current != null) {
            factionlimitcheck.current.checked = true;
        }
        if (filterListRanged.current != null) {
            filterListRanged.current.checked = true;
        }
        if (filterListMelee.current != null) {
            filterListMelee.current.checked = true;
        }
        if (filterListArmour.current != null) {
            filterListArmour.current.checked = true;
        }
        if (filterListEquipment.current != null) {
            filterListEquipment.current.checked = true;
        }
        if (filterListGlory.current != null) {
            filterListGlory.current.checked = true;
        }
        if (filterListDucat.current != null) {
            filterListDucat.current.checked = true;
        }
        handleCloseNewModel()
        UpdateFunction(Manager.GetWarbandByName(WarbandItem.Name))
    }

    /**
     * Activates a toast error message with
     * a provided message
     * @param text The warning to be displayed
     */
    function runToast(text: string) 
    {
        toast.error(text, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }

    const [showNewModel, setShowNewModel] = useState(false);
    const handleCloseNewModel = () => setShowNewModel(false); 
    const handleShowNewModel = () => setShowNewModel(true);

    // ----------------------------------------------------------

    // List of Warband Members ----------------------------------

    const [_allwarbands, returnstate] = useState(WarbandItem.Members);
    const [_key, updateKey] = useState(0);

    function ItemRecall() {
        returnstate(WarbandItem.Members)
        updateKey(_key+1)
    }

    function FilterByEquipType(value : string) {
        
        if (value == "ranged") {
            return _limitranged;
        }
        if (value == "melee") {
            return _limitmelee;
        }
        if (value == "armour") {
            return _limitarmour;
        }
        if (value == "equipment") {
            return _limitequipment;
        }
        return true;
    }

    function FilterByCostType(value : string) {
        
        if (value == "ducats") {
            return _limitducat;
        }
        if (value == "glory") {
            return _limitglory;
        }
        return true;
    }

    function FilterByModelType(value : string) {
        let i = 0;
        let HasModel = false;
        let ModelMatch = false;
        let HasAntiKeyword = false;
        let AntiKeywordMatch = false;
        for (i = 0; i < WarbandItem.Faction.Equipment.length ; i++) {
            if (value == WarbandItem.Faction.Equipment[i].ID) {  
                let j = 0;
                for (j = 0; j < WarbandItem.Faction.Equipment[i].Restrictions.length ; j++) {
                    if (WarbandItem.Faction.Equipment[i].Restrictions[j].type == "model") {
                        
                        HasModel = true;
                        if (WarbandItem.Faction.Equipment[i].Restrictions[j].val == Member.Model.ID) {
                            ModelMatch = true;
                        }
                    }
                    if (WarbandItem.Faction.Equipment[i].Restrictions[j].type == "keyword") {
                        HasModel = true;
                        let k = 0;
                        if ((Member.Model.Object.Tags != undefined) && (Member.Model.Object.Tags != null)){
                            for (k = 0; k < (Member.Model.Object.Tags? Member.Model.Object.Tags.length : 0); k++) {
                                const tag: any = Member.Model.Object.Tags[k]
                                if ((tag.tag_name.toUpperCase()) == WarbandItem.Faction.Equipment[i].Restrictions[j].val.toString().toUpperCase()) {
                                    ModelMatch = true;
                                }
                            }
                        }
                    }
                    if (WarbandItem.Faction.Equipment[i].Restrictions[j].type == "antikeyword") {
                        HasAntiKeyword = true;
                        let k = 0;
                        if ((Member.Model.Object.Tags != undefined) && (Member.Model.Object.Tags != null)){
                            for (k = 0; k < (Member.Model.Object.Tags? Member.Model.Object.Tags.length : 0); k++) {
                                const tag: any = Member.Model.Object.Tags[k]
                                
                                if ((tag.tag_name.toUpperCase()) == WarbandItem.Faction.Equipment[i].Restrictions[j].val.toString().toUpperCase()) {
                                    AntiKeywordMatch = true;
                                }
                            }
                        }
                    }
                }
            }
        }

        if (HasAntiKeyword) {
            if (HasModel) {
                return ModelMatch && !AntiKeywordMatch;
            } else {
                return !AntiKeywordMatch;
            }
        }
        if (HasModel) {
            return ModelMatch;
        }
        return true;
    }

    // ----------------------------------------------------------

    return (
        <>
        <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" 
        />       
            
            <div className="justify-content-center">
                <div className="col-12">
                    <div className="subfonttext hovermouse generalbuttonbox" style={{display:"flex",alignItems:"center",fontSize:"1em",width:"100%",padding:"0.5em",margin:"0em"}}   onClick={() => handleShowNewModel()}>
                        <div style={{marginRight:"0.5em",textAlign:"center",width:"fit-content"}} className="">Add New Equipment</div>
                        <FontAwesomeIcon icon={faUserPlus} className="" style={{fontSize:"0.75em"}}/>
                    </div>
                </div>
            </div>
            
            <Modal data-theme={theme} onEnterKeyDown={() => handleCloseNewModel()} show={showNewModel} size="lg" contentClassName="filterboxStructure" dialogClassName="" onHide={handleCloseNewModel} keyboard={true}  centered>
                
                <h1 className={'titleShape titlestyler backgroundtc'}>
                    {"Equip New Item"}
                    <div className="row float-end">
                        <div className='col-12 float-end'>
                            <Button style={{padding:"0em"}} variant="" onClick={() => handleCloseNewModel()}>
                                <FontAwesomeIcon icon={faCircleXmark} className="setWhite" style={{fontSize:"2em",margin:"0em"}}/>
                            </Button>
                        </div>
                    </div>
                </h1>
                <Modal.Body >
                    
                    <div className="row"> {/* New Member Adder */}
                        <div className="col-12" >

                            <div className="row">
                                <div className="col-md-3 col-sm-4 col-6">
                                    <InputGroup className="tagboxpad squaredThree" style={{height:"2em"}}>
                                        <Form.Check type="checkbox" ref={filterListRanged} onClick={e => {updateFactionRanged()}} label="Ranged" defaultChecked={_limitranged}/>
                                    </InputGroup>
                                </div>
                                <div className="col-md-3 col-sm-4 col-6">
                                    <InputGroup className="tagboxpad squaredThree" style={{height:"2em"}}>
                                        <Form.Check type="checkbox" ref={filterListMelee} onClick={e => {updateFactionMelee()}} label="Melee" defaultChecked={_limitmelee}/>
                                    </InputGroup>
                                </div>
                                <div className="col-md-3 col-sm-4 col-6">
                                    <InputGroup className="tagboxpad squaredThree" style={{height:"2em"}}>
                                        <Form.Check type="checkbox" ref={filterListArmour} onClick={e => {updateFactionArmour()}} label="Armour" defaultChecked={_limitarmour}/>
                                    </InputGroup>
                                </div>
                                <div className="col-md-3 col-sm-4 col-6">
                                    <InputGroup className="tagboxpad squaredThree" style={{height:"2em"}}>
                                        <Form.Check type="checkbox" ref={filterListEquipment} onClick={e => {updateFactionEquipment()}} label="Equipment" defaultChecked={_limitequipment}/>
                                    </InputGroup>
                                </div>
                                <div className="col-md-4 col-sm-12 col-12">
                                    <InputGroup className="tagboxpad squaredThree" style={{height:"2em"}}>
                                        <Form.Check type="checkbox" ref={factionlimitcheck} onClick={e => {updateFactionLimit()}} label="Faction Only" defaultChecked={_limitfaction}/>
                                    </InputGroup>
                                </div>
                                <div className="col-md-4 col-sm-6 col-6">
                                    <InputGroup className="tagboxpad squaredThree" style={{height:"2em"}}>
                                        <Form.Check type="checkbox" ref={filterListDucat} onClick={e => {updateFactionDucat()}} label="Ducat Cost" defaultChecked={_limitducat}/>
                                    </InputGroup>
                                </div>
                                <div className="col-md-4 col-sm-6 col-6">
                                    <InputGroup className="tagboxpad squaredThree" style={{height:"2em"}}>
                                        <Form.Check type="checkbox" ref={filterListGlory} onClick={e => {updateFactionGlory()}} label="Glory Cost" defaultChecked={_limitglory}/>
                                    </InputGroup>
                                </div>
                            </div>

                            <div className="verticalspacerbig"/>
                            <div>
                                <div className="separator"></div>
                            </div> 
                            <div className="verticalspacerbig"/>

                            <div className="row">
                                <div className="col-md-12 col-12">
                                    <InputGroup className="tagboxpad" style={{height:"2em"}}>
                                        <Form.Control as="select" style={{height:"100%",textAlign:"center",fontSize:"0.85em",paddingTop:"0em",borderRadius:"0em"}} ref={modelRef} aria-label="Default select example"  placeholder="Member Type" onChange={e => { updateModel(e.target.value)    } } >
                                            <option key="modeloption" value="[No Model Selected]">[No Item Selected]</option>
                                            {_limitfaction &&
                                            <>{WarbandItem.Faction.Equipment.filter(value => FilterByModelType(value.ID)).filter(value => FilterByCostType(value.CostID)).filter(value => {
                                                if (value.Object.Category) {
                                                    return FilterByEquipType(value.Object.Category)
                                                } else {
                                                    return FilterByEquipType("")
                                                }}).map((item) => ( <option key="modeloption" value={item.Object.ID}>{item.Object.Name}</option> ))}</>
                                            }
                                            {!_limitfaction &&
                                            <>{Manager.Equipment.filter(value => {
                                                if (value.Category) {
                                                    return FilterByEquipType(value.Category)
                                                } else {
                                                    return FilterByEquipType("")
                                                }
                                            }).map((item) => ( <option key="modeloption" value={item.ID}>{item.Name}</option> ))}</>
                                            }
                                        </Form.Control>
                                    </InputGroup>
                                </div>
                            </div>
                            
                            <div className="verticalspacer"/>

                            <div className="row">
                                <div className="col-md-6 col-lg-6 col-12"> {/* Add Member */}
                                    
                                    <InputGroup className="tagboxpad" style={{height:"2em"}}>
                                        <Form.Control ref={restrictionRef} style={{ height:"100%",textAlign:"center",borderRadius:"0em"}} readOnly aria-label="Text input" defaultValue={"Restrictions : -"}/>
                                    </InputGroup>
                                </div>
                                <div className="col-md-6 col-lg-6 col-12"> {/* Add Member */}
                                    
                                    <InputGroup className="tagboxpad" style={{height:"2em"}}>
                                        <Form.Control ref={featureRef} style={{ height:"100%",textAlign:"center",borderRadius:"0em"}} readOnly aria-label="Text input" defaultValue={"Features : -"}/>
                                    </InputGroup>
                                </div>
                            </div>
                            
                            <div className="verticalspacerbig"/>
                            <div>
                                <div className="separator"></div>
                            </div> 
                            <div className="verticalspacerbig"/>

                            <div className="row">
                                <div className="col-6">
                                    <InputGroup className="tagboxpad" style={{height:"2em"}}>
                                        <Form.Control ref={costRef} style={{ height:"100%",textAlign:"center",borderRadius:"0em"}} type="number" onChange={e => updateCost(e.target.value)} aria-label="Text input" defaultValue={"0"} placeholder="Member Cost"/>
                                    </InputGroup>
                                </div>
                                <div className="col-6">
                                    <div className="row  justify-content-center">
                                        <div className="col-6 justify-content-center">
                                            <InputGroup className="tagboxpad squaredThree" style={{height:"2em",width:"fit-content"}}>
                                                <Form.Check type="radio" ref={costTypeDucatRef} onClick={e => {updateDucatCostType("ducats")}} name="costtype" label="Ducats" style={{width:"fit-content"}} defaultChecked={true}/>
                                            </InputGroup>
                                        </div>
                                        <div className="col-6 justify-content-center">
                                            <InputGroup className="tagboxpad squaredThree" style={{height:"2em",width:"fit-content"}}>
                                                <Form.Check type="radio" ref={costTypeGloryRef} onClick={e => {updateGloryCostType("glory")}} name="costtype" label="Glory" style={{width:"fit-content"}} defaultChecked={false}/>
                                            </InputGroup>
                                        </div>
                                    </div>
                                </div>                        
                            </div>

                            <div className="verticalspacerbig"/>

                            <div className="row">
                                <div className="col-md-12 col-lg-12 col-12"> {/* Add Member */}
                                    <div className="generalbuttonbox hovermouse" onClick={() => NewMember()} style={{width:"100%",alignItems:"center",height:"2em",borderRadius:"0em"}}>
                                        <div style={{display:"flex",width:"fit-content",alignItems:"flex-end"}}  className=" ">
                                            <FontAwesomeIcon icon={faPersonMilitaryRifle} className="pageaccestext" style={{fontSize:"1.25em"}}/>
                                            <h1 className="pageaccestext" style={{whiteSpace:"nowrap",fontSize:"1.25em"}}>
                                                Add
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default MemberAddEquipDisplay;