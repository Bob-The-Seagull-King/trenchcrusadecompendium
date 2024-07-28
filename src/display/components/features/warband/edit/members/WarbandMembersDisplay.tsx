import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../../resources/styles/_icon.scss'
import React, { useRef, useState } from 'react'

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { Warband } from '../../../../../../classes/lists/Warband';
import { WarbandManager } from '../../../../../../classes/lists/warbandmanager';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import WarbandMemberDisplay from './WarbandMemberDisplay';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { faPersonMilitaryRifle } from '@fortawesome/free-solid-svg-icons'

import { useGlobalState } from './../../../../../../utility/globalstate'

const WarbandMembersDisplay = (props: any) => {
    const WarbandItem: Warband = props.data;
    const UpdateFunction = props.updater;
    const Manager : WarbandManager = props.manager;

    // Creation of New warband member ---------------------------

    const [_limitfaction, returnLimitFaction] = useState(true);
    const [theme] = useGlobalState('theme');

    let NewMemberName = "";
    let NewMemberModel = "";
    let NewMemberCost = "0";

    let isDucats = true;
    
    const nameRef = useRef<HTMLInputElement>(null);
    const modelRef = useRef<HTMLSelectElement>(null);
    const costRef = useRef<HTMLInputElement>(null);
    const costTypeDucatRef = useRef<HTMLInputElement>(null);
    const costTypeGloryRef = useRef<HTMLInputElement>(null);
    const factionlimitcheck = useRef<HTMLInputElement>(null);

    function updateName(value: string) {
        NewMemberName = value;
    }

    function updateModel(value: string) {
        NewMemberModel = value;
        if (_limitfaction) {
            const tempModel = Manager.GetModelByID(value)
            let temp : any = null;
            let i = 0;
            for (i = 0 ; i < WarbandItem.Faction.Models.length ; i++) {
                if (WarbandItem.Faction.Models[i].ID == (tempModel? tempModel.ID : "")) {
                    temp = WarbandItem.Faction.Models[i]
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

    function NewMember() {
        const NewMemberCostType = isDucats? "ducats" : "glory";
        const Result = Manager.NewMember(WarbandItem, NewMemberName, NewMemberModel, NewMemberCost, NewMemberCostType);
        if (Result != "") {
            runToast(Result);
        } else {
            UpdateFunction(Manager.GetWarbandByName(WarbandItem.Name))
        }
        ItemRecall();
        if (nameRef.current != null) {
            nameRef.current.value = "";
        }
        if (costRef.current != null) {
            costRef.current.value = "0";
        }
        if (modelRef.current != null) {
            modelRef.current.value = "[No Faction Selected]";
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
        handleCloseNewModel()
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
            <div className="row justify-content-center">
                <div className="mediumfonttext" style={{width:"fit-content"}}>
                    Squadron Members
                </div>
                <div className="verticalspacerbig"/>
            </div>
            
            <div className="row justify-content-center">
                    <div className="subfonttext hovermouse generalbuttonbox" style={{display:"flex",alignItems:"center",fontSize:"1.75em",width:"fit-content",padding:"0.5em"}}   onClick={() => handleShowNewModel()}>
                        <div style={{marginRight:"0.5em",textAlign:"center",width:"fit-content"}} className="">Add New Warband Member</div>
                        <FontAwesomeIcon icon={faUserPlus} className="" style={{fontSize:"0.75em"}}/>
                    </div>
            </div>
            
            <Modal data-theme={theme} onEnterKeyDown={() => handleCloseNewModel()} show={showNewModel} size="lg" contentClassName="filterboxStructure" dialogClassName="" onHide={handleCloseNewModel} keyboard={true}  centered>
                
                <h1 className={'titleShape titlestyler backgroundtc'}>
                    {"Add New Member"}
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
                                <div className="col-md-8 col-6">
                                    <InputGroup className="tagboxpad" style={{height:"2em"}}>
                                        <Form.Control as="select" style={{height:"100%",textAlign:"center",fontSize:"0.85em",paddingTop:"0em",borderRadius:"0em"}} ref={modelRef} aria-label="Default select example"  placeholder="Member Type" onChange={e => { updateModel(e.target.value)    } } >
                                            <option key="modeloption" value="[No Model Selected]">[No Model Selected]</option>
                                            {_limitfaction &&
                                            <>{WarbandItem.Faction.Models.map((item) => ( <option key="modeloption" value={item.Object.ID}>{item.Object.Name}</option> ))}</>
                                            }
                                            {!_limitfaction &&
                                            <>{Manager.Models.map((item) => ( <option key="modeloption" value={item.ID}>{item.Name}</option> ))}</>
                                            }
                                        </Form.Control>
                                    </InputGroup>
                                </div>
                                <div className="col-md-4 col-6">
                                    <InputGroup className="tagboxpad squaredThree" style={{height:"2em"}}>
                                        <Form.Check type="checkbox" ref={factionlimitcheck} onClick={e => {updateFactionLimit()}} label="Faction Only" defaultChecked={true}/>
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
                                <div className="col-md-8 col-lg-8 col-6"> {/* Member Name */}
                                    <InputGroup className="tagboxpad" style={{height:"2em"}}>
                                        <Form.Control ref={nameRef} style={{ height:"100%",textAlign:"center",borderRadius:"0em"}} onChange={e => updateName(e.target.value)} aria-label="Text input" placeholder="Member Name"/>
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
            
            <div className="verticalspacerbig"/>
            {WarbandItem.Members.filter((item) => item.Elite == true).length > 0 &&
                <>
            <div>
                <div className="separator">Elites</div>
            </div>

            <div className="row"> {/* Elite Members */}
                {WarbandItem.Members.filter((item) => item.Elite == true).map((item) => (
                    <div key={item.Model.ID + item.Name} >
                        <WarbandMemberDisplay warband={WarbandItem} member={item} updater={UpdateFunction} manager={Manager} />
                        <br></br>
                    </div>
                ))}
            </div>
            </>
            }
            
            <div className="verticalspacerbig"/>

            {WarbandItem.Members.filter((item) => item.Elite == false).length > 0 &&
                <>
            <div>
                <div className="separator">Infantry</div>
            </div>

            <div className="row"> {/* Non-Elite Members */}
                {WarbandItem.Members.filter((item) => item.Elite == false).map((item) => (
                    <div key={item.Model.ID + item.Name} >
                        <WarbandMemberDisplay warband={WarbandItem} member={item} updater={UpdateFunction} manager={Manager} />
                        <br></br>
                    </div>
                ))}
            </div></>
            }
        </>
    )
}

export default WarbandMembersDisplay;