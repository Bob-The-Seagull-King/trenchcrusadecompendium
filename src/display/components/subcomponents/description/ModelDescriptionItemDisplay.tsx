import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React from 'react'

import { getTagValue} from '../../../../utility/functions'
import {ConvertContentWithGlossary} from '../../../../utility/util'
import { ModelDescription} from '../../../../classes/feature/models/ModelDescription'
import { PlayerModel } from '../../../../classes/feature/models/Model'
import AddonDisplay from '../../features/addons/AddonDisplay'


const ModelDescriptionItemDisplay = (props: any) => {
    const description: ModelDescription = props.data
    const parentItem: PlayerModel = props.parent

    function returnFullItem(item: ModelDescription) {
        switch (getTagValue(item.Tags, "desc_type")) {
            case "effect": {
                return (
                    <div>
                        <span><b>{ConvertContentWithGlossary((item.Glossary), item.Content?.toString() || "")} </b></span>
                        <span>
                            {item.SubContent?.map((subitem) => (
                               <ModelDescriptionItemDisplay key="descriptionsubitem" data={subitem} parent={parentItem}/>
                            ))}
                        </span>
                    </div>
                )
            }
            case "subeffect": {
                return (
                    <span>
                        <span><i>{ConvertContentWithGlossary((item.Glossary), item.Content?.toString() || "")} </i></span>
                        <span>
                            {item.SubContent?.map((subitem) => (
                               <ModelDescriptionItemDisplay key="descriptionsubitem" data={subitem} parent={parentItem}/>
                            ))}
                        </span>
                        <span>{" "}</span>
                    </span>
                )
            }
            case "desc": {
                return (
                    <span>
                        <span>{ConvertContentWithGlossary((item.Glossary), item.Content?.toString() || "")} </span>
                        <span>
                            {item.SubContent?.map((subitem) => (
                               <ModelDescriptionItemDisplay key="descriptionsubitem" data={subitem} parent={parentItem}/>
                            ))}
                        </span>
                        <span>{" "}</span>
                    </span>
                )
            }
            case "addon": {
                return (
                    <div>
                        <div className='addonbox'>{findAddon(item.Content?.toString() || "")}</div>
                        <span>
                            {item.SubContent?.map((subitem) => (
                               <ModelDescriptionItemDisplay key="descriptionsubitem" data={subitem} parent={parentItem}/>
                            ))}
                        </span>
                        <span>{" "}</span>
                    </div>
                )
            }
            default: {
                return (
                    <span>
                    <span>{ConvertContentWithGlossary((item.Glossary), item.Content?.toString() || "")}</span>
                    <span>
                        {item.SubContent?.map((subitem) => (
                               <ModelDescriptionItemDisplay key="descriptionsubitem" data={subitem} parent={parentItem}/>
                        ))}
                    </span>
                    </span>
                )
            }
        }
    }

    function findAddon(id: string) {
        let AddonFound = null;

        console.log(id);
        console.log(parentItem.Addons)

        let i = 0;
        for (i = 0; i < parentItem.Addons.length; i++) {
            if (parentItem.Addons[i].ID == id) {
                AddonFound = parentItem.Addons[i];
            }
        }

        if (AddonFound != null) {
            return (
                <AddonDisplay data={AddonFound}/>
            )
        } else {
            return (
                <span>ERROR: ADDON NOT FOUND</span>
            )
        }
    }

    return (
        <span>
            {returnFullItem(description)}
        </span>
    )
}

export default ModelDescriptionItemDisplay;