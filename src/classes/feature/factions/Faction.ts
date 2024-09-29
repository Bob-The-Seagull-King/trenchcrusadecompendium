import { ITrenchCrusadeItemData, TrenchCrusadeItem } from '../../TrenchCrusadeItem'
import { ItemType } from '../../Enum'
import { IEquipmentFactionList, FactionEquip } from './FactionEquip'
import { IFactionRuleset, FactionRule } from './FactionRule'
import { byPropertiesOf, DescriptionFactory } from "../../../utility/functions";
import { IModelFactionList, FactionModel } from './FactionModel'
import { ViewTableItem } from '../../viewmodel/collections/ViewTableItem';
import { FactionVariantFactory } from '../../../factories/features/FactionVariantFactory';
import { Requester } from '../../../factories/Requester';
import { IPlayerFactionVariant } from './FactionVariant';

/**
 * Data structure of an available faction.
 */
interface IPlayerFaction extends ITrenchCrusadeItemData {
    name: string,
    flavour: [],
    rules: IFactionRuleset[],
    equipment: IEquipmentFactionList[],
    models: IModelFactionList[],
    team?: string
}

/**
 * Faction available to players. Includes information
 * on the faction as a whole and prescribes the available
 * models/equipment/upgrades and their relevant costs and
 * restrictions unique to that faction.
 */
class PlayerFaction extends TrenchCrusadeItem {
    public readonly Name;
    public readonly Flavour;
    public readonly Rules;
    public readonly Equipment;
    public readonly Models : FactionModel[];
    public readonly InterfaceVal;
    public readonly Team;
    public readonly ObjData;
    
    public constructor(data: IPlayerFaction)
    {
        super(data)
        this.ObjData = data;
        this.ItemType = ItemType.Faction;

        this.InterfaceVal = data

        if (data.team) {
            this.Team = data.team;
        } else { this.Team = "none"; }

        this.Name = data.name;
        this.Equipment = this.EquipmentFactory(data.equipment)
        this.Rules = this.RulesetFactory(data.rules);
        this.Flavour = DescriptionFactory(data.flavour);
        this.Models = this.ModelsFactory(data.models)
    }

    /**
     * Converts information into available faction models
     * @param data Array of faction models
     * @returns Array of FactionModel objects fully filled
     */
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

    /**
     * Converts information into the faction's special rules
     * @param data Array of faction rules
     * @returns Array of FactionRule objects fully filled
     */
    private RulesetFactory(data: IFactionRuleset[]) {
        const ruleslist = [];
        let i = 0;
        for (i = 0; i < data.length; i++) {
            const tempAD = new FactionRule(data[i]);
            ruleslist.push(tempAD);
        }
        return ruleslist;
    }

    /**
     * Converts information into the faction's equipment
     * @param data Array of faction equipment information
     * @returns Array of fully generated FactionEquipment objects
     */
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

    static GetVariants(faction : PlayerFaction, collection : any[]) {
        const variants : IPlayerFactionVariant[] = Requester.MakeRequest(
            {
                searchtype: "complex",
                searchparam: {
                    type: "variants",
                    request: {
                        operator: "and",
                        terms: [
                            {
                                item: "faction_id", // The string name of the key being checked
                                value: faction.ID, // The desired value of the key
                                equals: true, // true -> check if item == value, false -> check if item != value
                                strict: true, // true -> exact match of value, false -> item includes value
                                istag: false
                            }
                        ],
                        subparams: []
                    }
                }
            }); 
        
        let i = 0;
        for (i = 0; i < variants.length ; i++) {
            const variantfaction = FactionVariantFactory.CreateFactory(variants[i],faction.Name);
            const ItemNew = new ViewTableItem(variantfaction, variantfaction.Team);
            collection.push(ItemNew);
        }
    }
}

export {IPlayerFaction, PlayerFaction}

