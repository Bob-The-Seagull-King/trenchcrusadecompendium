import 'bootstrap/dist/css/bootstrap.css'
import '../../../resources/styles/_icon.scss'
import React from 'react'

import * as HoverCard from '@radix-ui/react-hover-card';

// Classes
import { useGlobalState } from '../../../utility/globalstate'
import { getColour } from '../../../utility/functions';

const GenericHover = (props: any) => {
    const DisplayColour : string = props.d_colour;
    const DisplayName : string = props.d_name;
    const DisplayType : string = props.d_type;
    const displayMethod = props.d_method

    const ruleName = props.titlename

    // State
    const [theme] = useGlobalState('theme');

    return (
      <>
      <HoverCard.Root data-theme={theme} >
        <HoverCard.Trigger asChild>
          <span className='glossaryPurple hovermouse'>{DisplayName}</span>
        </HoverCard.Trigger>
        <HoverCard.Portal>
          <HoverCard.Content data-theme={theme} className="HoverCardContent" sideOffset={5}>
              <div  className='popupBody'>
                <div className={'modelStructure borderstyler ' + DisplayType + 'border'+getColour(DisplayColour)}>
                    <h1 className={'titleShape titlebody titlestyler ' + DisplayType + 'background'+getColour(DisplayColour)}>
                        {ruleName || ""}
                    </h1>
                    {displayMethod()}
                </div>
              </div>
            <HoverCard.Arrow className="HoverCardArrow" />
          </HoverCard.Content>
        </HoverCard.Portal>
      </HoverCard.Root>
      </>
    )
}

export default GenericHover;