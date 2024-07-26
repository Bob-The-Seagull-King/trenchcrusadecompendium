import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../resources/styles/_icon.scss'
import React from 'react'

import { IItemPartial } from '../../../../../classes/feature/list/ListGroup'
import { ModelDescription } from '../../../../../classes/feature/models/ModelDescription';

import ModelDescriptionItemDisplay from '../../description/ModelDescriptionItemDisplay';

const SkillHover = (props: any) => {
    const ruleObject: IItemPartial = props.data
    const description = DescriptionFactory(ruleObject.description);
    
    /**
     * Translates the description JSON objects into a collection
     * of ModelDescription objects
     * @param data The array of description data objects
     * @returns Array of ModelDescription objects
     */
    function DescriptionFactory(data: []) {
      let i = 0;
        const array: ModelDescription[] = []
        try {
        for (i = 0; i < data.length; i++) {
            const tempAD = new ModelDescription(data[i])
            array.push(tempAD)
        }
        return array;
        } catch (e) {
            
            const emergencyarray: ModelDescription[] = []
            return emergencyarray;
        }
  }

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