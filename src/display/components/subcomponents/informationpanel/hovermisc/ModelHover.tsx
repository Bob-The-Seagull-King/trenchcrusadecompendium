import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../resources/styles/_icon.scss'
import React from 'react'

import { PlayerModel } from '../../../../../classes/feature/models/Model'
import * as HoverCard from '@radix-ui/react-hover-card';
import ModelDisplay from '../../../../../display/components/features/models/ModelDisplay';

const ModelHover = (props: any) => {
    const ruleObject: PlayerModel = props.data
    const ruleName = props.titlename

    return (
      <HoverCard.Root>
        <HoverCard.Trigger asChild>
          <span className='glossaryPurple hovermouse'>{ruleName}</span>
        </HoverCard.Trigger>
        <HoverCard.Portal>
          <HoverCard.Content className="HoverCardContent" sideOffset={5}>
              <div  className='popupItemBody'>
                <ModelDisplay data={ruleObject}/>
              </div>
            <HoverCard.Arrow className="HoverCardArrow" />
          </HoverCard.Content>
        </HoverCard.Portal>
      </HoverCard.Root>
    )
}

export default ModelHover;