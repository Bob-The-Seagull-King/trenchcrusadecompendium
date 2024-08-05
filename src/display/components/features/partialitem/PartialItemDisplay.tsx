import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../resources/styles/_icon.scss'
import React from 'react'

import { IItemPartial } from '../../../../classes/feature/list/ListGroup'

import AdvancedDescriptionItemDisplay from '../../subcomponents/description/AdvancedDescriptionItemDisplay';
import { DescriptionFactory } from '../../../../utility/functions';

const PartialItemDisplay = (props: any) => {
    const ruleObject: IItemPartial = props.data
    const description = DescriptionFactory(ruleObject.description);

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

export default PartialItemDisplay;