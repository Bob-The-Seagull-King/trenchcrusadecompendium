import 'bootstrap/dist/css/bootstrap.css'
import '../../resources/styles/_icon.scss'
import React, { useState } from 'react'

import { ScenarioGenerator } from '../../classes/feature/scenarios/ScenarioGenerator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDice } from '@fortawesome/free-solid-svg-icons'

import ScenarioDisplay from '../../display/components/features/scenario/ScenarioDisplay'
import GenericDisplay from '../../display/components/generics/GenericDisplay'

const ToolsScenarioGenerator = (prop: any) => {
    const Manager : ScenarioGenerator = prop.manager;
    
    const [_currenscenario, returnScen] = useState(Manager.ReturnScenario());

    const [_keyval, returnkey] = useState(1);

    function UpdateScenario() {
        Manager.UpdateScenario();
        returnScen(Manager.ReturnScenario());
        returnkey(_keyval + 1);
    }

    // Return result -----------------------------
    return (
        <div className="container" style={{width:"100%"}}>
            
            <div className="row row-cols-lg-1 row-cols-1">
                
                <div className="col">
                    <div className="subfonttext" style={{display:"flex",alignItems:"center"}}>
                        <div className="subfonttext hovermouse generalbuttonbox" style={{display:"flex",alignItems:"center",fontSize:"1em",width:"100%",padding:"0.5em",margin:"0em"}}   onClick={() => UpdateScenario()}>
                            <FontAwesomeIcon icon={faDice} className="pageaccestextsmall" style={{paddingTop:"0.25em"}}/>
                            <div style={{marginRight:"0.5em",textAlign:"center",width:"fit-content"}} className="">Generate New Scenario</div>
                        </div>
                    </div>
                </div>

            </div>
            <br/>
            <br/>
            {_currenscenario != null &&
                <div>
                    
                    <GenericDisplay  d_colour={"tc"} d_name={_currenscenario.Name} d_type={""} d_method={() => <ScenarioDisplay data={_currenscenario}/>}/>
                </div>
            }
        </div>
    )
    // -------------------------------------------
}

export default ToolsScenarioGenerator