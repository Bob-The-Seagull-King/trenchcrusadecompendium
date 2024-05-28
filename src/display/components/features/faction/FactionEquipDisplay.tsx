import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React from 'react'

import { FactionEquip } from '../../../../classes/feature/factions/FactionEquip'

const FactionEquipDisplay = (props: any) => {

    const ModelEquip: FactionEquip = props.data;

    return (
        <div>
        {ModelEquip.Object.Name}
        </div>
    )
}


export default FactionEquipDisplay;