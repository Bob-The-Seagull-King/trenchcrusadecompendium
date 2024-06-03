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
    const inputRef = useRef<HTMLInputElement>(null);

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
        const Result = Manager.NewWarband(NewBandName);
        if (Result != "") {
            runToast(Result);
        } else {
            UpdaterMethod(Manager.GetWarbandByName(NewBandName))
        }
        ItemRecall();
        if (inputRef.current != null) {
            inputRef.current.value = "";
        }
        
    }

    function ItemRecall() {
        returnstate(Manager.GetWarbands())
        updateKey(_key+1)
    }

    function updateName(value: string) {
        NewBandName = value;
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

                    <div className="row">
                        <div className="col-12 justify-content-center" style={{display:"flex"}}>
                            <label htmlFor="pack-upload" className="generalbuttonbox bordersubpurple">
                                <FontAwesomeIcon icon={faPersonMilitaryRifle} className="pageaccestext"/>
                                <h1 className="pageaccestext" style={{whiteSpace:"nowrap"}}>
                                    New Warband
                                </h1>
                                <InputGroup className="tagboxpad" >
                                    <Form.Control size="lg" className="no-margins" ref={inputRef} style={{fontSize:"1em", height:"0.5em", margin:"1em", textAlign:"center"}} onChange={e => updateName(e.target.value)} aria-label="Text input" defaultValue={NewBandName} placeholder=""/>
                                </InputGroup>
                                <FontAwesomeIcon icon={faCirclePlus} onClick={() => NewWarband()} className="pageaccestext hovermouse" style={{fontSize:"3em"}}/>
                            </label>
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