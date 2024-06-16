import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../../resources/styles/_icon.scss'
import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Warband } from '../../../../../../classes/lists/Warband';
import { WarbandManager } from '../../../../../../classes/lists/warbandmanager';
import { WarbandMember } from '../../../../../../classes/lists/WarbandMember';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { faPersonMilitaryRifle } from '@fortawesome/free-solid-svg-icons'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { ListEquipment } from '../../../../../../classes/lists/ListEquipment';
import { Requester } from '../../../../../../factories/Requester';
import { FactionUpgrade } from '../../../../../../classes/feature/factions/FactionUpgrade';

const MemberAddUpgradeDisplay = (props: any) => {
    const WarbandItem: Warband = props.data;
    const Member : WarbandMember = props.member;
    const UpdateFunction = props.updater;
    const Manager : WarbandManager = props.manager;

    // Creation of New warband member ---------------------------

    const [_limitfaction, returnLimitFaction] = useState(true);

    let NewMemberModel = "";
    let NewMemberCost = "0";

    let isDucats = true;
    let isGlory = false;
    
    const restrictionRef = useRef<HTMLInputElement>(null);
    const modelRef = useRef<HTMLSelectElement>(null);
    const costRef = useRef<HTMLInputElement>(null);
    const costTypeDucatRef = useRef<HTMLInputElement>(null);
    const costTypeGloryRef = useRef<HTMLInputElement>(null);

    
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
            let temp : any = null;
            let i = 0;
            for (i = 0; i < WarbandItem.Faction.Models.length; i++) {
                if (WarbandItem.Faction.Models[i].ID == Member.Model.ID) {
                    let j = 0;
                    for (j = 0; j < WarbandItem.Faction.Models[i].Upgrades.length; j++) {
                        temp = (WarbandItem.Faction.Models[i].Upgrades[j])
                        break;
                    }
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
                    isGlory = (false);
                    isDucats = (true);
                } else {
                    isGlory = (true);
                    isDucats = (false);
                }
                if (restrictionRef.current != null) {
                    restrictionRef.current.value = "Restrictions : " + getRestrictionList(temp);
                }

            }
        }
    }

    function updateCost(value: string) {
        NewMemberCost = value;
    }

    function updateGloryCostType(value: string) {
        isGlory = (true);
        isDucats = (false);
    }

    function updateDucatCostType(value: string) {
        isGlory = (false);
        isDucats = (true);
    }

    function NewMember() {
        const NewMemberCostType = isDucats? "ducats" : "glory";
        const Result = Manager.NewUpgradeForMember(Member, NewMemberModel, NewMemberCost, NewMemberCostType);
        if (Result != "") {
            runToast(Result);
        } else {
            UpdateFunction(Manager.GetWarbandByName(WarbandItem.Name))
        }
        ItemRecall();
        if (restrictionRef.current != null) {
            restrictionRef.current.value = "";
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

    function ReturnUpgradeList() {
        const upgradeList: FactionUpgrade[] = [];
        let i = 0;
        for (i = 0; i < WarbandItem.Faction.Models.length; i++) {
            if (WarbandItem.Faction.Models[i].ID == Member.Model.ID) {
                let j = 0;
                for (j = 0; j < WarbandItem.Faction.Models[i].Upgrades.length; j++) {
                    upgradeList.push(WarbandItem.Faction.Models[i].Upgrades[j])
                }
            }
        }

        return upgradeList;
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
                        <div style={{marginRight:"0.5em",textAlign:"center",width:"fit-content"}} className="">Add New Upgrade</div>
                        <FontAwesomeIcon icon={faUserPlus} className="" style={{fontSize:"0.75em"}}/>
                    </div>
                </div>
            </div>
            
            <Modal onEnterKeyDown={() => handleCloseNewModel()} show={showNewModel} size="lg" contentClassName="filterboxStructure" dialogClassName="" onHide={handleCloseNewModel} keyboard={true}  centered>
                
                <h1 className={'titleShape titlepurple'}>
                    {"Add New Upgrade"}
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
                                <div className="col-md-12 col-12">
                                    <InputGroup className="tagboxpad" style={{height:"2em"}}>
                                        <Form.Control as="select" style={{height:"100%",textAlign:"center",fontSize:"0.85em",paddingTop:"0em",borderRadius:"0em"}} ref={modelRef} aria-label="Default select example"  placeholder="Member Type" onChange={e => { updateModel(e.target.value)    } } >
                                            <option key="modeloption" value="[No Model Selected]">[No Item Selected]</option>
                                            
                                            <>{ReturnUpgradeList().map((item) => ( <option key="modeloption" value={item.ID}>{item.Name}</option> ))}</>
                                            
                                        </Form.Control>
                                    </InputGroup>
                                </div>
                            </div>

                            <div className="verticalspacer"/>

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
                            
                            <div className="verticalspacer"/>

                            <div className="row">
                                <div className="col-md-8 col-lg-8 col-6"> {/* Add Member */}
                                    
                                    <InputGroup className="tagboxpad" style={{height:"2em"}}>
                                        <Form.Control ref={restrictionRef} style={{ height:"100%",textAlign:"center",borderRadius:"0em"}} readOnly aria-label="Text input" defaultValue={"Restrictions : -"}/>
                                    </InputGroup>
                                </div>
                                <div className="col-md-4 col-lg-4 col-6"> {/* Add Member */}
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

export default MemberAddUpgradeDisplay;