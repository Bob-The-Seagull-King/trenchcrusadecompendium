import 'bootstrap/dist/css/bootstrap.css'
import '../../../resources/styles/_icon.scss'
import React from 'react'

import {capitalizeString} from '../../../utility/functions'
import {ITrenchCrusadeItemTag} from '../../../classes/TrenchCrusadeItem'

const TagDisplay = (props: any) => {
    const tag: ITrenchCrusadeItemTag = props.data

    return (
        <div className="tagItem tagText">
            &#x2b9e; {capitalizeString(tag.tag_name.toString() || "")} {capitalizeString(tag.val.toString() || "")}
        </div>
    )
}

export default TagDisplay;