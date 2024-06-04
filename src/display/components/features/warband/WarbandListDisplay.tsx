import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React, { useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { WarbandManager } from '../../../../classes/lists/warbandmanager';
import { Warband } from '../../../../classes/lists/Warband';
import WarbandDisplay from '../../../../display/components/features/warband/WarbandDisplay';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faPersonMilitaryRifle } from '@fortawesome/free-solid-svg-icons'

const WarbandListDisplay = (prop: any) => {
    const Manager : WarbandManager = prop.manager;
    const UpdaterMethod = prop.updater;

    let NewBandName = "";
    let NewBandFaction = "";
    const inputRef = useRef<HTMLInputElement>(null);
    let factionRef : any = null;

    const [_allwarbands, returnstate] = useState(Manager.GetWarbands());
    const [_key, updateKey] = useState(0);
    
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

    function NewWarband() {
        const Result = Manager.NewWarband(NewBandName, NewBandFaction);
        if (Result != "") {
            runToast(Result);
        } else {
            UpdaterMethod(Manager.GetWarbandByName(NewBandName))
        }
        ItemRecall();
        if (inputRef.current != null) {
            inputRef.current.value = "";
        }
        if (factionRef != null) {
            factionRef.value = "[No Faction Selected]";
        }
        
    }

    function ItemRecall() {
        returnstate(Manager.GetWarbands())
        updateKey(_key+1)
    }

    function updateName(value: string) {
        NewBandName = value;
    }

    function updateFaction(value: string) {
        NewBandFaction = value;
    }

    // Return result -----------------------------
    return (
        <div className="container" style={{width:"100%"}}>
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
                <div className="col-lg-10 col-md-12 col-sm-12 col-xs-12 col-12">

                    <div className="row justify-content-center">
                        <div className="col">
                            <div className="bordersubpurple" style={{padding:"1em"}}>
                                <div className="row justify-content-center" style={{display:"flex"}}>
                                    <div className="col-md-4 col-12">
                                        <InputGroup className="tagboxpad" style={{height:"3em"}}>
                                            <Form.Control ref={inputRef} style={{ height:"100%",textAlign:"center"}} onChange={e => updateName(e.target.value)} aria-label="Text input" defaultValue={NewBandName} placeholder="Warband Name"/>
                                        </InputGroup>
                                    </div>
                                    <div className="col-md-4 col-12">
                                        <InputGroup className="tagboxpad" style={{height:"3em"}}>
                                            <Form.Select style={{height:"100%",textAlign:"center"}} aria-label="Default select example" onChange={e => { updateFaction(e.target.value) 
                                                factionRef = e.target;
                                             } } >
                                                    <option key="factionoption">[No Faction Selected]</option>
                                                {Manager.Factions.map((item) => (
                                                    <option key="factionoption">{item.Name}</option>
                                                ))}
                                            </Form.Select>
                                        </InputGroup>
                                    </div>
                                    <div className="col-md-4 col-12">
                                        <div className="generalbuttonbox">
                                            <div style={{display:"flex",width:"fit-content",alignItems:"flex-end"}} onClick={() => NewWarband()} className="hovermouse ">
                                                <FontAwesomeIcon icon={faPersonMilitaryRifle} className="pageaccestext"/>
                                                <h1 className="pageaccestext" style={{whiteSpace:"nowrap"}}>
                                                    Create Warband
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <br/>
                        </div>
                    </div>

                    <div style={{padding:"0.5em"}}>
                        <div className='row row-cols-1 smallbordersubpurple'>
                                {_allwarbands.length < 1 &&
                                    <div className="col p-0" key={"packdisplaynone"}>
                                        <div className='contentpackcontainer smallbordersubpurple' style={{justifyContent:"center",alignItems:"center"}}>
                                            <h1 className="subtletext" style={{paddingTop:"1em", paddingBottom:"1em"}}>No Warbands Available</h1>
                                        </div>
                                    </div>
                                }
                                {_allwarbands.map((item: Warband) => (
                                    <div className="col p-0" key={"packdisplay"+item.ID}>
                                        <WarbandDisplay data={item} parent={Manager} statefunction={ItemRecall} updater={UpdaterMethod}/>
                                    </div>
                                ))}
                        </div>  
                    </div>
                </div>
            </div>

        </div>
    )
    // -------------------------------------------
}

export default WarbandListDisplay