import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../resources/styles/_icon.scss'
import React from 'react'

import { PlayerEquipment } from '../../../../../classes/feature/equipment/Equipment'
import * as HoverCard from '@radix-ui/react-hover-card';
import EquipmentDisplay from '../../../../../display/components/features/equipment/EquipmentDisplay';

const GlossaryHover = (props: any) => {
    const ruleObject: PlayerEquipment = props.data
    const ruleName = props.titlename

    return (
      <HoverCard.Root>
        <HoverCard.Trigger asChild>
          <span className='glossaryPurple hovermouse'>{ruleName}</span>
        </HoverCard.Trigger>
        <HoverCard.Portal>
          <HoverCard.Content className="HoverCardContent" sideOffset={5}>
              <div  className='popupItemBody'>
                <EquipmentDisplay data={ruleObject}/>
              </div>
            <HoverCard.Arrow className="HoverCardArrow" />
          </HoverCard.Content>
        </HoverCard.Portal>
      </HoverCard.Root>
    )
}

export default GlossaryHover;