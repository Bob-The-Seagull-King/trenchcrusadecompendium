import { IListModel, ListModel } from "./ListModel"
import { IListEquipment, ListEquipment } from "./ListEquipment"
import { IListItem } from "../feature/list/ListItem"
import { IItemPartial } from "../feature/list/ListGroup"
import { ITextBlock, TextBlock } from "../DescriptionItem"

interface IWarbandMember {
    name: string,
    model: IListModel,
    equipment: IListEquipment[],
    elite: boolean,
    injuries: IListItem[],
    skills: IItemPartial[],
    experience: number,
    notes : string
}

class WarbandMember {
    public Name;

    public Elite;
    public Model;

    public Equipment;
    public Injuries;
    public Skills;

    public Experience;
    
    public Notes;

    public constructor(data: IWarbandMember) {
        this.Name = data.name;
        this.Elite = data.elite;
        this.Experience = data.experience;

        this.Model = this.ModelMaker(data.model);
        this.Equipment = this.EquipmentMaker(data.equipment);
        this.Injuries = data.injuries;
        this.Skills = data.skills;
        this.Notes = data.notes
    }

    public GetDucatCost() {
        let totalCost = 0;

        if (this.Model.CostType == "ducats") {
            totalCost += this.Model.Cost;
        }

        let i = 0;
        for (i = 0; i < this.Equipment.length; i++) {
            if (this.Equipment[i].CostType == "ducats") {
                totalCost += this.Equipment[i].Cost;
            }
        }

        return totalCost.toString()
    }

    public GetGloryCost() {
        let totalCost = 0;

        if (this.Model.CostType == "glory") {
            totalCost += this.Model.Cost;
        }

        let i = 0;
        for (i = 0; i < this.Equipment.length; i++) {
            if (this.Equipment[i].CostType == "glory") {
                totalCost += this.Equipment[i].Cost;
            }
        }

        return totalCost.toString()
    }

    private ModelMaker(data : IListModel) {
        return new ListModel(data);
    }

    private TextMaker(data : ITextBlock[]) {
        const tempList: TextBlock[] = [];

        let i = 0;
        for (i = 0 ; i < data.length ; i ++) {
            const tempEquip = new TextBlock(data[i]);
            tempList.push(tempEquip);
        }

        return tempList;
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