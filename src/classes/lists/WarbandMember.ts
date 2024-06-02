import { IListModel } from "./ListModel"
import { IListEquipment } from "./ListEquipment"
import { IListItem } from "../feature/list/ListItem"
import { IItemPartial } from "../feature/list/ListGroup"

interface IWarbandMember {
    name: string,
    model: IListModel,
    equipment: IListEquipment[],
    elite: boolean,
    injuries: IListItem[],
    skills: IItemPartial[],
    experience: number
}

export {IWarbandMember}