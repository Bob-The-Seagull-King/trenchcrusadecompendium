import { IListModel, ListModel } from "./ListModel"
import { IListEquipment, ListEquipment } from "./ListEquipment"
import { IListItem, ListItem } from "../feature/list/ListItem"
import { IItemPartial } from "../feature/list/ListGroup"
import { IFactionUpgrade, FactionUpgrade } from "../feature/factions/FactionUpgrade"

/**
 * Interface describing a member of a warband
 */
interface IWarbandMember {
    name: string,
    model: IListModel,
    equipment: IListEquipment[],
    elite: boolean,
    injuries: IListItem[],
    skills: IItemPartial[],
    experience: number,
    notes : string,
    upgrades : IFactionUpgrade[]
}

/**
 * Object class describing a member of a warband
 * for use in gameplay and during a campaign.
 */
class WarbandMember {
    public Name;
    public Elite;
    public Model;
    public Equipment;
    public Injuries;
    public Skills;
    public Upgrades;
    public Experience;
    public Notes;

    public constructor(data: IWarbandMember) {
        this.Name = data.name;
        this.Elite = data.elite;
        this.Experience = data.experience;

        this.Model = this.ModelMaker(data.model);
        this.Equipment = this.EquipmentMaker(data.equipment);
        this.Injuries = this.InjuryMaker(data.injuries);
        this.Upgrades = this.UpgradeMaker(data.upgrades);
        this.Skills = data.skills;
        this.Notes = data.notes
    }

    /**
     * Converts ListModel data into a ListModel object
     * @param data The model information
     * @returns ListModel object type that represents this warband member
     */
    private ModelMaker(data : IListModel) {
        return new ListModel(data);
    }

    /**
     * Converts ListEquipment data into ListEquipment objects
     * @param data The model's equipment information
     * @returns Array of ListEquipment object type that represents this member's equipment
     */
    private EquipmentMaker(data : IListEquipment[]) {
        const tempList: ListEquipment[] = [];

        let i = 0;
        for (i = 0 ; i < data.length ; i ++) {
            const tempEquip = new ListEquipment(data[i]);
            tempList.push(tempEquip);
        }

        return tempList;
    }

    /**
     * Converts ListItem data into ListItem objects
     * @param data The model's injury information
     * @returns Array of ListItem object type that represents this member's injuries
     */
    private InjuryMaker(_data : IListItem[]) {
        const InjuryList : ListItem[] = [];
        let i = 0

        for (i = 0; i < _data.length ; i ++) {
            const injurytemp = new ListItem(_data[i])
            InjuryList.push(injurytemp)
        }

        return InjuryList;
    }

    /**
     * Converts FactionUpgrade data into FactionUpgrade objects
     * @param data The model's upgrade information
     * @returns Array of FactionUpgrade object type that represents this member's upgrades
     */
    private UpgradeMaker(_data : IFactionUpgrade[]) {
        const upgradelist : FactionUpgrade[] = [];
        let i = 0

        for (i = 0; i < _data.length ; i ++) {
            const upgradetemp = new FactionUpgrade(_data[i])
            upgradelist.push(upgradetemp)
        }

        return upgradelist;
    }

    public GetBase() {
        return this.Model.Object.Base;
    }

    public GetMovement() {
        return this.Model.Object.Movement;
    }

    public GetArmour() {
        return this.Model.Object.Armour;
    }

    public GetMelee() {
        return this.Model.Object.Melee;
    }

    public GetRanged() {
        return this.Model.Object.Ranged;
    }

}

export {IWarbandMember, WarbandMember}