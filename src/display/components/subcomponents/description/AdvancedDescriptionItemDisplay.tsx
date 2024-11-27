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
import { FactionUpgrade } from '../../../../classes/feature/factions/FactionUpgrade'
import { Requester } from '../../../../factories/Requester'
import { IFactionUpgrade } from '../../../../classes/feature/factions/FactionUpgrade'
import GenericPanel from '../../generics/GenericPanel'
import UpgradeDisplay from '../../features/equipment/UpgradeDisplay'
import { EquipmentFactory } from '../../../../factories/features/EquipmentFactory'
import { IPlayerEquipment } from '../../../../classes/feature/equipment/Equipment'
import EquipmentDisplay from '../../features/equipment/EquipmentDisplay'
import { PlayerEquipment } from '../../../../classes/feature/equipment/Equipment'


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
            case "upgradeclick": {
                return (
                    <span>
                        <span className=''>{findUpgrade(item.Content?.toString() || "")}</span>
                        <span>
                            {item.SubContent?.map((subitem) => (
                               <AdvancedDescriptionItemDisplay key="descriptionsubitem" data={subitem} parent={parentItem}/>
                            ))}
                        </span>
                        <span>{" "}</span>
                    </span>
                )
            }
            case "equipmentclick": {
                return (
                    <span>
                        <span className=''>{findEquipment(item.Content?.toString() || "")}</span>
                        <span>
                            {item.SubContent?.map((subitem) => (
                               <AdvancedDescriptionItemDisplay key="descriptionsubitem" data={subitem} parent={parentItem}/>
                            ))}
                        </span>
                        <span>{" "}</span>
                    </span>
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

        addon = AddonFactory.CreateNewAddon(id, parentItem.Team)

        return (
            <GenericDisplay d_colour={parentItem.Team} d_name={addon.Name} d_type={"sub"} d_method={() => <AddonDisplay data={addon} />}/>
        )
    }

    function findEquipment(id: string) {
        const addondata = Requester.MakeRequest({searchtype: "id", searchparam: {type: "equipment", id: id}}) as IPlayerEquipment
        const addonNew = new PlayerEquipment(addondata)

        return (
            <GenericPanel titlename={addonNew.Name} d_colour={parentItem.Team} d_name={addonNew.Name} d_type={""} d_method={() => <EquipmentDisplay data={addonNew} />}/>
        )
    }

    function findUpgrade(id: string) {
        const addondata = Requester.MakeRequest({searchtype: "id", searchparam: {type: "upgrade", id: id}}) as IFactionUpgrade
        const addonNew = new FactionUpgrade(addondata)
        return (
            <GenericPanel titlename={addonNew.Name} d_colour={parentItem.Team} d_name={addonNew.Name} d_type={""} d_method={() => <UpgradeDisplay data={addonNew} />}/>
        )
    }

    return (
        <span>
            {returnFullItem(description)}
        </span>
    )
}

export default AdvancedDescriptionItemDisplay;