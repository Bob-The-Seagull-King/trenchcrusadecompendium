import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React, { useState } from 'react'

import { ViewTableItem } from '../../../../classes/viewmodel/collections/ViewTableItem'


const ViewTableItemDisplay = (props: any) => {
    const tableItem: ViewTableItem = props.data
    const parentView = props.parent;
    const updateHost = props.statefunction;
    const position = props.positionid;
    const [_activestate, checkstate] = useState(tableItem.IsActive);

    /**
     * Updates the current state of the component
     * and triggers an update of the selected list
     * items and re-renders the ability display.
     */
    function UpdateComponent() {
        tableItem.SwitchStates();
        parentView.UpdateList();
        updateHost();
        checkstate(tableItem.IsActive);
    }

    return (
        <div style={{width: "100%", marginBottom: "0px", position: "relative"}} className='hovermouse' onClick={() => UpdateComponent()}>
            {position() % 2 == 0 &&
                <div className="colourOverlay"/>
            }
            {_activestate && 
                <h1 className={"title" + tableItem.Colour + " no-padding itemlisttext softpad"}>
                {tableItem.HeldItem.Name}
                </h1>
            }
            {!_activestate &&
                <h1 className={"subtitle" + tableItem.Colour + " no-padding itemlisttext softpad"}>
                {tableItem.HeldItem.Name}
                </h1>
            }
        </div>
    )
}

export default ViewTableItemDisplay;