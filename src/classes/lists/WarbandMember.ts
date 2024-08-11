import { IListModel, ListModel } from "./ListModel"
import { IListEquipment, ListEquipment } from "./ListEquipment"
import { IListItem, ListItem } from "../feature/list/ListItem"
import { IItemPartial } from "../feature/list/ListGroup"
import { IFactionUpgrade, FactionUpgrade } from "../feature/factions/FactionUpgrade"
import { getTagValue } from "../../utility/functions"
import { AddonFactory } from "../../factories/features/AddonFactory"
import { PlayerAddon } from "../feature/addons/Addon"
import { PlayerEquipment } from "../feature/equipment/Equipment"

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
    scars: number,
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
    public Scars;
    public Notes;

    public constructor(data: IWarbandMember) {
        this.Name = data.name;
        this.Elite = data.elite;
        this.Experience = data.experience;
        this.Scars = data.scars;

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

    public static returnModelBase(_member : WarbandMember) {
        let str = "";
        let i = 0;
        for (i = 0; i < _member.Model.Object.Base.length; i++) {
            if (i !== 0) { str += "x" }
            str += _member.Model.Object.Base[i]
        }
        str += "mm"
        return str;
    }

    public static returnModelMovement(_member : WarbandMember) {
        let str = "";
        let i = 0;
        for (i = 0; i < _member.Model.Object.Movement.length; i++) {
            if (i !== 0) {str += " "}
            str += _member.Model.Object.Movement[i] + "\""
        }
        if (_member.Model.Object.EventTags["flying"]) {
            str += " Flying"
        }
        return str;
    }

    public static returnModelArmour(_member : WarbandMember) {
        let str = "";
        let i = 0;

        const BaseCopy  = Object.assign([], _member.Model.Object.Armour);
        console.log(BaseCopy);

        const ArmourBaseSet = WarbandMember.addValuesToTag(_member, BaseCopy, 'armourset')
        const ArmourBase = WarbandMember.addValuesToTag(_member, ArmourBaseSet, 'armour')

        for (i = 0; i < ArmourBase.length; i++) {
            if (i !== 0) {str += ", "}
            str += ArmourBase[i]
        }
        return str;
    }

    public static returnModelMelee(_member : WarbandMember) {
        let str = "";
        let i = 0;
        for (i = 0; i < _member.Model.Object.Melee.length; i++) {
            if (i !== 0) {str += ", "}
            str += _member.Model.Object.Melee[i] + " Dice"
        }
        return str;
    }

    public static returnModelRanged(_member : WarbandMember) {
        let str = "";
        let i = 0;
        for (i = 0; i < _member.Model.Object.Ranged.length; i++) {
            if (i !== 0) {str += ", "}
            str += _member.Model.Object.Ranged[i] + " Dice"
        }
        return str;
    }

    public static addValuesToTag(_member : WarbandMember, _array : number[], _tag : string) {
        let i = 0;
        let j = 0;

        const Components = WarbandMember.returnComponentsWithTag(_member, _tag);
        const ArrayBase = _array

        for (i = 0; i < Components['addon'].length; i++) {
            for (j = 0; j < ArrayBase.length; j++) { ArrayBase[j] += Components['addon'][i].EventTags[_tag]; } 
        }
        
        for (i = 0; i < Components['upgrade'].length; i++) {
            for (j = 0; j < ArrayBase.length; j++) { ArrayBase[j] += Components['upgrade'][i].EventTags[_tag]; } 
        }
        
        for (i = 0; i < Components['equipment'].length; i++) {
            for (j = 0; j < ArrayBase.length; j++) { ArrayBase[j] += Components['equipment'][i].EventTags[_tag]; } 
        }

        return ArrayBase;
    }

    public static setValuesToTag(_member : WarbandMember, _array : number[], _tag : string) {
        let i = 0;
        let j = 0;

        const Components = WarbandMember.returnComponentsWithTag(_member, _tag);
        const ArrayBase = _array

        for (i = 0; i < Components['addon'].length; i++) {
            for (j = 0; j < ArrayBase.length; j++) { ArrayBase[j] = Components['addon'][i].EventTags[_tag]; } 
        }
        
        for (i = 0; i < Components['upgrade'].length; i++) {
            for (j = 0; j < ArrayBase.length; j++) { ArrayBase[j] = Components['upgrade'][i].EventTags[_tag]; } 
        }
        
        for (i = 0; i < Components['equipment'].length; i++) {
            for (j = 0; j < ArrayBase.length; j++) { ArrayBase[j] = Components['equipment'][i].EventTags[_tag]; } 
        }

        return ArrayBase;
    }

    public static returnComponentsWithTag(_member : WarbandMember, _tag : string) {
        const componentsReturn : {[_name : string] : any} = {}
        
        let i = 0

        const desc = _member.Model.Object.Abilities;

        const addons = []
        for (i = 0; i < desc.length; i ++) {
            if (getTagValue(desc[i].Tags, "desc_type") === 'addon') {
                const strID = desc[i].Content
                const item : PlayerAddon = AddonFactory.CreateNewAddon((typeof strID === 'string')? strID : "");
                if (item.EventTags[_tag]) { addons.push(item) }
            }
        }

        const upgrades = []
        for (i = 0; i < _member.Upgrades.length; i ++) {
            if (_member.Upgrades[i].EventTags[_tag]) { upgrades.push(_member.Upgrades[i]) }
        }

        const equipment = []
        for (i = 0; i < _member.Equipment.length; i ++) {
            if (_member.Equipment[i].Object.EventTags[_tag]) {
                equipment.push(_member.Equipment[i].Object) }
        }

        componentsReturn['addon'] = addons;
        componentsReturn['upgrade'] = upgrades;
        componentsReturn['equipment'] = equipment;
        
        return componentsReturn;
    }
}

export {IWarbandMember, WarbandMember}