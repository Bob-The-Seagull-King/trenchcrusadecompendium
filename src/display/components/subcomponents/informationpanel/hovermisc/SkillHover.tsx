import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../resources/styles/_icon.scss'
import React, { useState } from 'react'

import { IItemPartial } from '../../../../../classes/feature/list/ListGroup'
import * as HoverCard from '@radix-ui/react-hover-card';
import EquipmentDisplay from '../../../../../display/components/features/equipment/EquipmentDisplay';
import Modal from 'react-bootstrap/Modal';
import { ModelDescription } from '../../../../../classes/feature/models/ModelDescription';
import ModelDescriptionItemDisplay from '../../description/ModelDescriptionItemDisplay';


import { useGlobalState } from './../../../../../utility/globalstate'

const SkillHover = (props: any) => {
    const ruleObject: IItemPartial = props.data
    const ruleName = props.titlename

    const [show, setShow] = useState(false);
    const [theme, setTheme] = useGlobalState('theme');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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