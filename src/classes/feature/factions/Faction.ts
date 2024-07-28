import {ITrenchCrusadeItemData, TrenchCrusadeItem} from '../../TrenchCrusadeItem'
import {ItemType} from '../../Enum'
import { IEquipmentFactionList, FactionEquip } from './FactionEquip'
import { IFactionRuleset, FactionRule } from './FactionRule'
import { byPropertiesOf, DescriptionFactory } from "../../../utility/functions";
import { IModelFactionList, FactionModel } from './FactionModel'

interface IPlayerFaction extends ITrenchCrusadeItemData {
    name: string,
    flavour: [],
    rules: IFactionRuleset[],
    equipment: IEquipmentFactionList[],
    models: IModelFactionList[],
    team?: string
}

class PlayerFaction extends TrenchCrusadeItem {
    public readonly Name;
    public readonly Flavour;
    public readonly Rules;
    public readonly Equipment;
    public readonly Models : FactionModel[];
    public readonly InterfaceVal;
    public readonly Team;
    
    public constructor(data: IPlayerFaction)
    {
        super(data)
        this.ItemType = ItemType.Faction;

        this.InterfaceVal = data

        if (data.team) {
            this.Team = data.team;
        } else {
            this.Team = "none";
        }

        this.Name = data.name;
        this.Equipment = this.EquipmentFactory(data.equipment)
        this.Rules = this.RulesetFactory(data.rules);
        this.Flavour = DescriptionFactory(data.flavour);
        this.Models = this.ModelsFactory(data.models)
    }

    private ModelsFactory(data: IModelFactionList[]) {
        const ruleslist = [];
        
        data.sort(byPropertiesOf<IModelFactionList>(['id']))
        let i = 0;
        for (i = 0; i < data.length; i++) {
            
            const tempAD = new FactionModel(data[i]);
            ruleslist.push(tempAD);
        }
        return ruleslist;
    }

    private RulesetFactory(data: IFactionRuleset[]) {
        const ruleslist = [];
        let i = 0;
        for (i = 0; i < data.length; i++) {
            const tempAD = new FactionRule(data[i]);
            ruleslist.push(tempAD);
        }
        return ruleslist;
    }

    private EquipmentFactory(data: IEquipmentFactionList[]) {
        const ruleslist = [];
        data.sort(byPropertiesOf<IEquipmentFactionList>(['id']))
        let i = 0;
        for (i = 0; i < data.length; i++) {
            const tempAD = new FactionEquip(data[i]);
            ruleslist.push(tempAD);
        }
        return ruleslist;
    }
    
    /**
     * When destroyed, also delete all associated
     * addon objects.
     */
    destructor() {
        let i = 0;
        for (i = 0; i < this.Flavour.length; i++) {
            delete this.Flavour[i];
        }
    }

}

export {IPlayerFaction, PlayerFaction}

