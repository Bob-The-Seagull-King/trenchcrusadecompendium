import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../../resources/styles/_icon.scss'
import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Warband } from '../../../../../../classes/lists/Warband';
import { WarbandManager } from '../../../../../../classes/lists/warbandmanager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { faPersonMilitaryRifle } from '@fortawesome/free-solid-svg-icons'
import { FactionModel } from '../../../../../../classes/feature/factions/FactionModel';
import { PlayerModel } from '../../../../../../classes/feature/models/Model';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const WarbandMembersDisplay = (props: any) => {
    const WarbandItem: Warband = props.data;
    const UpdateFunction = props.updater;
    const Manager : WarbandManager = props.manager;

    // Creation of New warband member ---------------------------

    const [_limitfaction, returnLimitFaction] = useState(true);

    let NewMemberName = "";
    let NewMemberModel = "";
    let NewMemberCost = "0";


    let isDucats = true;
    let isGlory = false;
    
    const nameRef = useRef<HTMLInputElement>(null);
    const modelRef = useRef<HTMLSelectElement>(null);
    const costRef = useRef<HTMLInputElement>(null);
    const costTypeDucatRef = useRef<HTMLInputElement>(null);
    const costTypeGloryRef = useRef<HTMLInputElement>(null);

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
                    isGlory = (false);
                    isDucats = (true);
                } else {
                    isGlory = (true);
                    isDucats = (false);
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
        console.log(isDucats);
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
            <div className="row"> {/* New Member Adder */}

                <div className="col-md-6 col-lg-6 col-12"> {/* Model Select */}
                    <InputGroup className="tagboxpad" style={{height:"4em"}}>
                        <Form.Control as="select" style={{height:"100%",textAlign:"center"}} ref={modelRef} aria-label="Default select example"  placeholder="Member Type" onChange={e => { updateModel(e.target.value)    } } >
                                <option key="modeloption" value="[No Model Selected]">[No Model Selected]</option>
                            {WarbandItem.Faction.Models.map((item) => (
                                <option key="modeloption" value={item.Object.ID}>{item.Object.Name}</option>
                            ))}
                        </Form.Control>
                    </InputGroup>
                </div>
                <div className="col-md-6 col-lg-6 col-12"> {/* Member Name */}
                    <InputGroup className="tagboxpad" style={{height:"4em"}}>
                        <Form.Control ref={nameRef} style={{ height:"100%",textAlign:"center"}} onChange={e => updateName(e.target.value)} aria-label="Text input" placeholder="Member Name"/>
                    </InputGroup>
                </div>
                <div className="col-md-9 col-lg-9 col-12"> {/* Edit Cost */}
                    <div className="row justify-content-center" style={{display:"flex"}}>
                        <div className="col-md-6 col-12">
                            <InputGroup className="tagboxpad" style={{height:"4em"}}>
                                <Form.Control ref={costRef} style={{ height:"100%",textAlign:"center"}} type="number" onChange={e => updateCost(e.target.value)} aria-label="Text input" defaultValue={"0"} placeholder="Member Cost"/>
                            </InputGroup>
                        </div>
                        <div className="col-md-6 col-12">
                            <InputGroup className="tagboxpad" style={{height:"4em"}}>
                                <Form.Check type="radio" ref={costTypeDucatRef} onClick={e => {updateDucatCostType("ducats")}} name="costtype" label="Ducats"/>
                                <Form.Check type="radio" ref={costTypeGloryRef} onClick={e => {updateGloryCostType("glory")}} name="costtype" label="Glory"/>
                            </InputGroup>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-lg-3 col-12"> {/* Add Member */}
                    <div className="generalbuttonbox" style={{width:"100%",alignItems:"center",height:"4em"}}>
                        <div style={{display:"flex",width:"fit-content",alignItems:"flex-end"}} onClick={() => NewMember()} className="hovermouse ">
                            <FontAwesomeIcon icon={faPersonMilitaryRifle} className="pageaccestext"/>
                            <h1 className="pageaccestext" style={{whiteSpace:"nowrap"}}>
                                Add
                            </h1>
                        </div>
                    </div>
                </div>

            </div>
            <div className="row"> {/* Elite Members */}
                {WarbandItem.Members.filter((item) => item.Elite == true).map((item) => (
                    <p  key="elite">{item.Name}</p>
                ))}
            </div>
            <div className="row"> {/* Non-Elite Members */}
                {WarbandItem.Members.filter((item) => item.Elite == false).map((item) => (
                    <p key="infantry">{item.Name}</p>
                ))}
            </div>
        </>
    )
}

export default WarbandMembersDisplay;