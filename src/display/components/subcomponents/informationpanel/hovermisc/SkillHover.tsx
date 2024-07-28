import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../resources/styles/_icon.scss'
import React from 'react'

import { IItemPartial } from '../../../../../classes/feature/list/ListGroup'

import ModelDescriptionItemDisplay from '../../description/ModelDescriptionItemDisplay';
import { DescriptionFactory } from '../../../../../utility/functions';

const SkillHover = (props: any) => {
    const ruleObject: IItemPartial = props.data
    const description = DescriptionFactory(ruleObject.description);

    return (
      <><div className='modelInternalStructure'>
        {
        <>{description.map((item) => ( 
            <ModelDescriptionItemDisplay key="modeloption" data={item} parent={ruleObject}/> 
        ))}</>
        } 
        </div>
      </>
    )
}

export default SkillHover;