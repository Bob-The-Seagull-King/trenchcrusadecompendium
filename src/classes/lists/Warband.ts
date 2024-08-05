import { IWarbandMember, WarbandMember } from "./WarbandMember"
import { IPlayerFaction } from "../../classes/feature/factions/Faction"
import { IListEquipment, ListEquipment } from "./ListEquipment"
import { ITextBlock, TextBlock } from "../DescriptionItem"
import { FactionFactory } from "../../factories/features/FactionFactory"
import { IItemPartial } from "../feature/list/ListGroup"

/**
 * Structure of a Warband
 */
interface IWarband {
    id: string;
    ducat_total : number,
    glory_total : number,
    members : IWarbandMember[],
    armoury : IListEquipment[],
    locations? : IItemPartial[],
    modifiers? : IItemPartial[],
    name: string,
    faction: IPlayerFaction,
    flavour: ITextBlock[],
    notes: string,
    deeds: string[],
    image : string,
    ducat_lost: number,
    glory_lost: number,
    ducat_cost: number,
    glory_cost: number
}

/**
 * Warband class contianing information on a user's
 * warband for battle and campaign play.
 */
export class Warband {
    public ID;
    public Name;
    public Faction;
    public Image;
    public DucatTotal;
    public GloryTotal;
    public DucatLost;
    public GloryLost;
    public DucatCost;
    public GloryCost;
    public Members;
    public Armoury;
    public Deeds;
    public Flavour;
    public Notes;
    public Locations : IItemPartial[] = [];
    public Modifiers : IItemPartial[] = []

    public constructor(data: IWarband) {
        this.ID = data.id;
        this.DucatTotal = data.ducat_total;
        this.GloryTotal = data.glory_total;
        this.DucatLost = data.ducat_lost;
        this.GloryLost = data.glory_lost;

        this.Members = this.WarbandMemberMaker(data.members);
        this.Armoury = this.EquipmentMaker(data.armoury);
        if (data.locations) {
            this.Locations = data.locations
        } else {
            this.Locations = [];
        }
        if (data.modifiers) {
            this.Modifiers = data.modifiers
        } else {
            
            const _reroll : IItemPartial = {
                id: "em_lucky",
                type: "Location",
                source: "core",
                tags: [
                    {tag_name: "common", val: ""}
                    ],
                name: "Lucky",
                description: [
                    {
                        tags: [{tag_name: "desc_type", val: "desc"}],
                        content: "Roll an extra Exploration Die that is paired with one of your other dice. After you roll, choose one die in the pair to keep and one die in the pair to discard.",
                        glossary: []
                    }
                ]
            }
            this.Modifiers = [_reroll];
        }

        this.Name = data.name;
        this.Faction = FactionFactory.CreateFactory( data.faction);
        this.Image = data.image;

        this.Flavour = this.TextMaker(data.flavour);
        this.Notes = (data.notes);

        this.Deeds = data.deeds;

        this.DucatCost = 0;
        this.GloryCost = 0;
    }

    /**
     * Converts ListEquipment data into ListEquipment objects
     * @param data The warbands's equipment information
     * @returns Array of ListEquipment object type that represents this warband's equipment
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
     * Converts WarbandMember data into WarbandMember objects
     * @param data The warbands's member information
     * @returns Array of WarbandMember object type that represents this warband's members
     */
    private WarbandMemberMaker(data : IWarbandMember[]) {
        const tempList: WarbandMember[] = [];

        let i = 0;
        for (i = 0 ; i < data.length ; i ++) {
            const tempEquip = new WarbandMember(data[i]);
            tempList.push(tempEquip);
        }

        return tempList;
    }

    /**
     * Converts warband flavour data into textbox objects
     * @param data The warbands's flavour information
     * @returns Array of TextBlock object type that represents this warband's flavour.
     */
    private TextMaker(data : ITextBlock[]) {
        const tempList: TextBlock[] = [];

        let i = 0;
        for (i = 0 ; i < data.length ; i ++) {
            const tempEquip = new TextBlock(data[i]);
            tempList.push(tempEquip);
        }

        return tempList;
    }    
}

export {IWarband}