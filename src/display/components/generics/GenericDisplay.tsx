import 'bootstrap/dist/css/bootstrap.css'
import '../../../resources/styles/_icon.scss'
import React from 'react'

import { getColour } from '../../../utility/functions';

const GenericDisplay = (props: any) => {
    const DisplayColour : string = props.d_colour;
    const DisplayName : string = props.d_name;
    const DisplayType : string = props.d_type;
    const displayMethod = props.d_method

    return (
        <div className={'modelStructure borderstyler ' + DisplayType + 'border'+getColour(DisplayColour)}>
            <h1 className={'titleShape titlestyler ' + DisplayType + 'background'+getColour(DisplayColour)}>{DisplayName || ""}</h1>
                {displayMethod()}
        </div>
    )
}

export default GenericDisplay;