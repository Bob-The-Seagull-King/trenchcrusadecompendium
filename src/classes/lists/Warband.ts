import { IWarbandMember, WarbandMember } from "./WarbandMember"
import { IListModel, ListModel } from "./ListModel"
import { IListEquipment, ListEquipment } from "./ListEquipment"
import { ITextBlock, TextBlock } from "../DescriptionItem"

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


class Warband {
    public DucatTotal;
    public GloryTotal;
    public Members;
    public Armoury;
    public Name;
    public Faction;
    public Flavour;
    public Notes;
    public Deeds;

    public constructor(data: IWarband) {
        this.DucatTotal = data.ducat_total;
        this.GloryTotal = data.glory_total;

        this.Members = this.WarbandMemberMaker(data.members);
        this.Armoury = this.EquipmentMaker(data.armoury);

        this.Name = data.name;
        this.Faction = data.faction;

        this.Flavour = this.TextMaker(data.flavour);
        this.Notes = this.TextMaker(data.notes);

        this.Deeds = data.deeds;
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

}

export {IWarband, Warband}