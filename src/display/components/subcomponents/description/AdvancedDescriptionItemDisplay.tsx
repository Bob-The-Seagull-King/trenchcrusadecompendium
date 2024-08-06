import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React from 'react'

import { getTagValue} from '../../../../utility/functions'
import {ConvertContentWithGlossary} from '../../../../utility/util'
import { AdvancedDescription} from '../../../../classes/AdvancedDescription'
import { PlayerModel } from '../../../../classes/feature/models/Model'

import AddonDisplay from '../../features/addons/AddonDisplay'
import GenericDisplay from '../../generics/GenericDisplay'
import { AddonFactory } from '../../../../factories/features/AddonFactory'
import { PlayerAddon } from '../../../../classes/feature/addons/Addon'


const AdvancedDescriptionItemDisplay = (props: any) => {
    const description: AdvancedDescription = props.data
    const parentItem: PlayerModel = props.parent

    function returnFullItem(item: AdvancedDescription) {
        switch (getTagValue(item.Tags, "desc_type")) {
            case "effect": {
                return (
                    <div>
                        <span><b>{ConvertContentWithGlossary((item.Glossary), item.Content?.toString() || "")} </b></span>
                        <span>
                            {item.SubContent?.map((subitem) => (
                               <AdvancedDescriptionItemDisplay key="descriptionsubitem" data={subitem} parent={parentItem}/>
                            ))}
                        </span>
                    </div>
                )
            }
            case "list": {
                return (
                    <div>
                        <span>{ConvertContentWithGlossary((item.Glossary), item.Content?.toString() || "")} </span>
                        <span>
                            <ul>
                                {item.SubContent?.map((subitem) => (
                                    <li  key="descriptionsubitem">
                                        <AdvancedDescriptionItemDisplay data={subitem} parent={parentItem}/>
                                    </li>
                                ))}
                            </ul>
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
                               <AdvancedDescriptionItemDisplay key="descriptionsubitem" data={subitem} parent={parentItem}/>
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
                               <AdvancedDescriptionItemDisplay key="descriptionsubitem" data={subitem} parent={parentItem}/>
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
                               <AdvancedDescriptionItemDisplay key="descriptionsubitem" data={subitem} parent={parentItem}/>
                            ))}
                        </span>
                        <span>{" "}</span>
                    </div>
                )
            }
            case "gap": {
                return (
                    <div>
                        <div><br/></div>
                        <span>
                            {item.SubContent?.map((subitem) => (
                               <AdvancedDescriptionItemDisplay key="descriptionsubitem" data={subitem} parent={parentItem}/>
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
                               <AdvancedDescriptionItemDisplay key="descriptionsubitem" data={subitem} parent={parentItem}/>
                        ))}
                    </span>
                    </span>
                )
            }
        }
    }

    function findAddon(id: string) {
        let addon: PlayerAddon | null = null;

        addon = AddonFactory.CreateNewAddon(id)

        return (
            <GenericDisplay d_colour={parentItem.Team} d_name={addon.Name} d_type={"sub"} d_method={() => <AddonDisplay data={addon} />}/>
        )
    }

    return (
        <span>
            {returnFullItem(description)}
        </span>
    )
}

export default AdvancedDescriptionItemDisplay;