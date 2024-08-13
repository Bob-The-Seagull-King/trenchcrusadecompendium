import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React from 'react'

import { ListItem } from '../../../../classes/feature/list/ListItem'

import AdvancedDescriptionItemDisplay from '../../subcomponents/description/AdvancedDescriptionItemDisplay';

const FullItemDisplay = (props: any) => {
    const ruleObject: ListItem = props.data
    const description = ruleObject.Description;

    return (
      <><div className='modelInternalStructure'>
        {
        <>{description.map((item) => ( 
            <AdvancedDescriptionItemDisplay key="modeloption" data={item} parent={ruleObject}/> 
        ))}</>
        } 
        </div>
      </>
    )
}

export default FullItemDisplay;