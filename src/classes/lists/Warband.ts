import { IWarbandMember } from "./WarbandMember"
import { IListModel } from "./ListModel"
import { IListEquipment } from "./ListEquipment"
import { ITextBlock } from "../DescriptionItem"

interface IWarband {
    ducat_total : number,
    glory_total : number,
    members : IWarbandMember[],
    armoury : IListEquipment[],
    name: string,
    faction: string,
    flavour: ITextBlock[],
    notes: ITextBlock[],
    deeds: string[]
}

export {IWarband}