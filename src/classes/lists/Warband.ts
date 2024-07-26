import { IWarbandMember, WarbandMember } from "./WarbandMember"
import { IPlayerFaction } from "../../classes/feature/factions/Faction"
import { IListEquipment, ListEquipment } from "./ListEquipment"
import { ITextBlock, TextBlock } from "../DescriptionItem"
import { FactionFactory } from "../../factories/features/FactionFactory"

interface IWarband {
    id: string;
    ducat_total : number,
    glory_total : number,
    members : IWarbandMember[],
    armoury : IListEquipment[],
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

    public constructor(data: IWarband) {
        this.ID = data.id;
        this.DucatTotal = data.ducat_total;
        this.GloryTotal = data.glory_total;
        this.DucatLost = data.ducat_lost;
        this.GloryLost = data.glory_lost;

        this.Members = this.WarbandMemberMaker(data.members);
        this.Armoury = this.EquipmentMaker(data.armoury);

        this.Name = data.name;
        this.Faction = FactionFactory.CreateFactory( data.faction);
        this.Image = data.image;

        this.Flavour = this.TextMaker(data.flavour);
        this.Notes = (data.notes);

        this.Deeds = data.deeds;

        this.DucatCost = this.TotalCostDucats();
        this.GloryCost = this.TotalCostGlory();
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

    private WarbandMemberMaker(data : IWarbandMember[]) {
        const tempList: WarbandMember[] = [];

        let i = 0;
        for (i = 0 ; i < data.length ; i ++) {
            const tempEquip = new WarbandMember(data[i]);
            tempList.push(tempEquip);
        }

        return tempList;
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

    public TotalCostDucats() {
        let totalducats = this.DucatLost;

        let i = 0;
        
        for (i = 0; i < this.Armoury.length ; i++) {
            if (this.Armoury[i].CostType == "ducats") {
                totalducats += this.Armoury[i].Cost;
            }
        }

        for (i = 0; i < this.Members.length ; i++) {
            if (this.Members[i].Model.CostType == "ducats") {
                totalducats += this.Members[i].Model.Cost;
            }
            let j = 0;
            for (j = 0; j < this.Members[i].Equipment.length; j++ ) {
                if (this.Members[i].Equipment[j].CostType == "ducats") {
                    totalducats += this.Members[i].Equipment[j].Cost;
                }
            }
        }

        return totalducats;
    }

    public TotalCostGlory() {
        let totalglory = this.GloryLost;

        let i = 0;
        
        for (i = 0; i < this.Armoury.length ; i++) {
            if (this.Armoury[i].CostType == "glory") {
                totalglory += this.Armoury[i].Cost;
            }
        }

        for (i = 0; i < this.Members.length ; i++) {
            if (this.Members[i].Model.CostType == "glory") {
                totalglory += this.Members[i].Model.Cost;
            }
            let j = 0;
            for (j = 0; j < this.Members[i].Equipment.length; j++ ) {
                if (this.Members[i].Equipment[j].CostType == "glory") {
                    totalglory += this.Members[i].Equipment[j].Cost;
                }
            }
        }

        return totalglory;
    }

    
}

export {IWarband}