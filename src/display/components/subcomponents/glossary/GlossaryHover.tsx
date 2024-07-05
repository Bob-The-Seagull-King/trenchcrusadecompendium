import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React from 'react'

import { GlossaryRule } from '../../../../classes/feature/glossary/Glossary'
import * as HoverCard from '@radix-ui/react-hover-card';
import GlossaryDisplay from './GlossaryDisplay'

import { useGlobalState } from './../../../../utility/globalstate'

const GlossaryHover = (props: any) => {
    const ruleObject: GlossaryRule = props.data
    const ruleName = props.titlename
    const [theme, setTheme] = useGlobalState('theme');

    return (
      <HoverCard.Root data-theme={theme}>
        <HoverCard.Trigger asChild>
          <span className='glossaryPurple hovermouse'>{ruleName}</span>
        </HoverCard.Trigger>
        <HoverCard.Portal>
          <HoverCard.Content data-theme={theme} className="HoverCardContent" sideOffset={5}>
              <div  className='popupBody'>
                <GlossaryDisplay data={ruleObject}/>
              </div>
            <HoverCard.Arrow className="HoverCardArrow" />
          </HoverCard.Content>
        </HoverCard.Portal>
      </HoverCard.Root>
    )
}

export default GlossaryHover;