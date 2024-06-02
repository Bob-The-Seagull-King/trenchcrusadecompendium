import { IListModel, ListModel } from "./ListModel"
import { IListEquipment, ListEquipment } from "./ListEquipment"
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

class WarbandMember {
    public Name;
    public Model;
    public Equipment;
    public Elite;
    public Injuries;
    public Skills;
    public Experience;

    public constructor(data: IWarbandMember) {
        this.Name = data.name;
        this.Elite = data.elite;
        this.Experience = data.experience;

        this.Model = this.ModelMaker(data.model);
        this.Equipment = this.EquipmentMaker(data.equipment);
        this.Injuries = data.injuries;
        this.Skills = data.skills;
    }

    private ModelMaker(data : IListModel) {
        return new ListModel(data);
    }

    private EquipmentMaker(data : IListEquipment[]) {
        const tempList: ListEquipment[] = [];

        let i = 0;
        for (i = 0 ; i < data.length ; i ++) {
            const tempEquip = new ListEquipment(data[i]);
            tempList.push(tempEquip);
        }

        return tempList;
    }

}

export {IWarbandMember, WarbandMember}