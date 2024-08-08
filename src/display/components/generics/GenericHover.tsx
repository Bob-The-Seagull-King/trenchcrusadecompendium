import 'bootstrap/dist/css/bootstrap.css'
import '../../../resources/styles/_icon.scss'
import React from 'react'

import * as HoverCard from '@radix-ui/react-hover-card';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

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
        <OverlayTrigger overlay={
          <Tooltip style={{ width: "30vw" }} className="overcomeTooltip" id="tooltip">
            <div style={{ width: "30vw" }} className='popupBody'>
              <div className={'modelStructure borderstyler ' + DisplayType + 'border'+getColour(DisplayColour)}>
                  <h1 className={'titleShape titlebody titlestyler ' + DisplayType + 'background'+getColour(DisplayColour)}>
                      {ruleName || ""}
                  </h1>
                  {displayMethod()}
              </div>
            </div>
          </Tooltip>
          }>
          <span className='glossaryPurple hovermouse'>{DisplayName}</span>
        </OverlayTrigger>
      </>
    )
}

export default GenericHover;