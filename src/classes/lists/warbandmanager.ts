import { IWarband, Warband } from './Warband';
import Cookies from 'js-cookie'
import { useWarbandStore } from '../../store/warbands';
import { GrabWarband } from '../../store/warbands';
import { IPlayerFaction, PlayerFaction } from "../../classes/feature/factions/Faction";
import { IPlayerModel, PlayerModel } from '../../classes/feature/models/Model';
import { IPlayerEquipment, PlayerEquipment } from '../../classes/feature/equipment/Equipment';
import { ModelFactory } from '../../factories/features/ModelFactory';
import { EquipmentFactory } from '../../factories/features/EquipmentFactory';
import { IPlayerFactionVariant } from "../../classes/feature/factions/FactionVariant";
import { FactionFactory } from "../../factories/features/FactionFactory";
import { FactionVariantFactory } from "../../factories/features/FactionVariantFactory";
import { byPropertiesOf, getColour, sort } from "../../utility/functions";
import { Requester } from "../../factories/Requester";
import noimage from '../../resources/images/no_image.jpg'
import { IWarbandMember, WarbandMember } from './WarbandMember';
import { containsTag } from '../../utility/functions';
import { IListModel } from './ListModel';
import { IListEquipment, ListEquipment } from './ListEquipment';
import { IItemPartial } from '../../classes/feature/list/ListGroup';
import { IListItem, ListItem } from '../../classes/feature/list/ListItem';
import { FactionUpgrade, IFactionUpgrade, IUpgradeData } from '../../classes/feature/factions/FactionUpgrade';

class WarbandManager {
    WarbandList: Warband[] = [];
    Factions: PlayerFaction[] = [];
    Models: PlayerModel[] = [];
    Equipment: PlayerEquipment[] = [];
    Skills: IItemPartial[] = [];
    Injuries: ListItem[] = [];
    Upgrades : FactionUpgrade[] = [];

    constructor() {
        const ReturnData = GrabWarband();
        this.FindFactions();
        this.FindModels();
        this.FindEquipment();
        this.FindSkills();
        this.FindInjuries();
        this.FindUpgrades();
        this.WarbandList = this.UpdateWarbands(ReturnData);
    }

    UpdateWarbands(data: Warband[]) {
        const listofbands: Warband[] = [];

        let i = 0;
        for (i = 0; i < data.length; i ++) {
            const factionid = data[i].Faction.ID;
            let j = 0;
            for (j = 0; j < this.Factions.length; j ++) {
                if (this.Factions[j].ID == factionid) {
                    data[i].Faction = this.Factions[j];
                    break;
                }
            }
            for (j = 0; j < data[i].Members.length; j++) {
                const modelid = data[i].Members[j].Model.ID;
                let k = 0;
                let modelval = null;
                for (k = 0; k < this.Models.length; k++) {
                    if (this.Models[k].ID == modelid) {
                        modelval = this.Models[k]
                        break;
                    }
                }
                if (modelval != null) {
                    data[i].Members[j].Model.Object = modelval;
                } else {
                    this.DeleteModelFromWarband(data[i].Members[j], data[i]);
                }
            }
            for (j = 0; j < data[i].Armoury.length; j++) {
                const modelid = data[i].Armoury[j].Object.ID;
                let k = 0;
                let modelval = null;
                for (k = 0; k < this.Equipment.length; k++) {
                    if (this.Equipment[k].ID == modelid) {
                        modelval = this.Equipment[k]
                        break;
                    }
                }
                if (modelval != null) {
                    data[i].Armoury[j].Object = modelval;
                } else {
                    this.DeleteEquipmentFromWarband(data[i].Armoury[j], data[i]);
                }
            }
            listofbands.push(data[i]);
        }


        return listofbands;
    }

    /**
    * For each entry in the data results, create an Model object
    * and add it to the internal list.
    */
    FindFactions() {
       this.Factions = [];
       const dataresults = Requester.MakeRequest({searchtype: "file", searchparam: {type: "faction"}});
       let i = 0;
       dataresults.sort(byPropertiesOf<IPlayerFaction>(['name']))
       for (i = 0; i < dataresults.length; i++) {
           const modelNew = FactionFactory.CreateFactory(dataresults[i]);
           this.Factions.push(modelNew);
           this.GetVariants(modelNew);
       }
   }

   /**
    * For each entry in the data results, create an Model object
    * and add it to the internal list.
    */
   FindModels() {
       this.Models = [];
       const dataresults = Requester.MakeRequest({searchtype: "file", searchparam: {type: "models"}});
       let i = 0;
       dataresults.sort(byPropertiesOf<IPlayerModel>(['name']))
       for (i = 0; i < dataresults.length; i++) {
           const modelNew = ModelFactory.CreateModel(dataresults[i]);
           this.Models.push(modelNew);
       }
   }

   /**
    * For each entry in the data results, create an Model object
    * and add it to the internal list.
    */
   FindUpgrades() {
       this.Upgrades = [];
       const dataresults = Requester.MakeRequest({searchtype: "file", searchparam: {type: "upgrade"}});
       let i = 0;
       dataresults.sort(byPropertiesOf<IUpgradeData>(['name']))
       for (i = 0; i < dataresults.length; i++) {
           const modelNew = new FactionUpgrade(dataresults[i]);
           this.Upgrades.push(modelNew);
       }
   }

   /**
    * For each entry in the data results, create an Model object
    * and add it to the internal list.
    */
   FindSkills() {
       this.Skills = [];
       const dataresults = Requester.MakeRequest({searchtype: "file", searchparam: {type: "skills"}});
       let i = 0;
       dataresults.sort(byPropertiesOf<IItemPartial>(['name',"id"]))
       for (i = 0; i < dataresults.length; i++) {
           const modelNew = (dataresults[i]);
           this.Skills.push(modelNew);
       }
   }

   /**
    * For each entry in the data results, create an Model object
    * and add it to the internal list.
    */
   FindInjuries() {
       this.Injuries = [];
       const dataresults = Requester.MakeRequest({searchtype: "file", searchparam: {type: "injuries"}});
       let i = 0;
       dataresults.sort(byPropertiesOf<IListItem>(['name']))
       for (i = 0; i < dataresults.length; i++) {
           const modelNew = new ListItem(dataresults[i]);
           this.Injuries.push(modelNew);
       }
   }

    /**
     * For each entry in the data results, create an Model object
     * and add it to the internal list.
     */
    FindEquipment() {
        this.Equipment = [];
        const dataresults = Requester.MakeRequest({searchtype: "file", searchparam: {type: "equipment"}});
        let i = 0;
        dataresults.sort(byPropertiesOf<IPlayerEquipment>(['name']))
        for (i = 0; i < dataresults.length; i++) {
            const modelNew = EquipmentFactory.CreateFactory(dataresults[i]);
            this.Equipment.push(modelNew);
        }
    }

    GetVariants(faction : PlayerFaction) {
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
            this.Factions.push(variantfaction)
        }
    }

    public SetStorage() {
        localStorage.setItem('warbandstorage', JSON.stringify(this.WarbandList));
    }

    public DuplicateMember(_warband : Warband, _member : WarbandMember) {
        const NewMember : WarbandMember = JSON.parse(JSON.stringify(_member));
        NewMember.Name = _member.Name + " - Copy"
        _warband.Members.push(NewMember);
    }

    public NewMember(_warband : Warband, _name : string, _model : string, _cost : string, _costtype : string){
        let ReturnMsg = "";
        try {
            if (_model == "" || _model == "[No Model Selected]") {
                ReturnMsg = "Your Member must be a model."
            }
            if (_cost == "" || parseInt(_cost) < 0) {
                ReturnMsg = "Your Member must cost at least 0."
            }
            let i = 0;
            if (ReturnMsg == "") {
                let modelVal : any = null;
                let memberName = "";
                for (i = 0; i < this.Models.length ; i++ ) {
                    if (this.Models[i].ID == _model) {
                        modelVal = this.Models[i];
                    }
                }
                if (_name.trim() == "") {
                    memberName = modelVal? modelVal.Name : "Unamed Soldier";
                } else {
                    memberName = _name;
                }
                const modelList : IListModel = {
                    id: modelVal? modelVal.ID : "",
                    cost: parseInt(_cost),
                    cost_type: _costtype                    
                }

                const isElite = containsTag(modelVal? modelVal.Tags : [], "elite")

                const _content : IWarbandMember = {
                    name: memberName,
                    model: modelList,
                    equipment: [],
                    elite: isElite,
                    injuries: [],
                    skills: [],
                    experience: 0,
                    notes : "",
                    upgrades : []
                }

                const ContentNew: WarbandMember = new WarbandMember((_content));

                for (i = 0; i < _warband.Faction.Models.length; i++) {
                    if (ContentNew.Model.ID == _warband.Faction.Models[i].ID) {
                        if (_warband.Faction.Models[i].Equipment != undefined) {
                            // Temp
                            let j = 0
                            for (j = 0; j < _warband.Faction.Models[i].Equipment.length; j++) {
                                const msg = this.NewEquipmentForMember(ContentNew, _warband.Faction.Models[i].Equipment[j], "0", "ducats")
                            }
                        }
                    }
                }

                _warband.Members.push(ContentNew);
            } else {
                return ReturnMsg;
            }
        } catch (e) {
            ReturnMsg = "Something went wrong.";
        }

        if (ReturnMsg == "") {
            _warband.DucatCost = this.TotalCostDucats(_warband)
            _warband.GloryCost = this.TotalCostGlory(_warband)
            this.SetStorage();
        }
        return ReturnMsg;
    }


    public NewEquipmentForMember(_warband : WarbandMember, _model : string, _cost : string, _costtype : string){
        let ReturnMsg = "";
        try {
            if (_model == "" || _model == "[No Model Selected]") {
                ReturnMsg = "Your Item must be one of the available options."
            }
            if (_cost == "" || parseInt(_cost) < 0) {
                ReturnMsg = "Your Item must cost at least 0."
            }
            let i = 0;
            if (ReturnMsg == "") {
                let modelVal : any = null;
                
                for (i = 0; i < this.Equipment.length ; i++ ) {
                    if (this.Equipment[i].ID == _model) {
                        modelVal = this.Equipment[i];
                    }
                }

                const modelList : IListEquipment = {
                    id: modelVal? modelVal.ID : "",
                    cost: parseInt(_cost),
                    cost_type: _costtype                    
                }

                const ContentNew: ListEquipment = new ListEquipment((modelList));
                _warband.Equipment.push(ContentNew);
            } else {
                return ReturnMsg;
            }
        } catch (e) {
            ReturnMsg = "Something went wrong.";
        }

        if (ReturnMsg == "") {
            this.SetStorage();
        }
        return ReturnMsg;
    }

    public NewUpgradeForMember(_warband : WarbandMember, _model : string, _cost : string, _costtype : string){
        let ReturnMsg = "";
        try {
            if (_model == "" || _model == "[No Model Selected]") {
                ReturnMsg = "Your Item must be one of the available options."
            }
            if (_cost == "" || parseInt(_cost) < 0) {
                ReturnMsg = "Your Item must cost at least 0."
            }
            let i = 0;
            if (ReturnMsg == "") {
                let modelVal : any = null;
                
                for (i = 0; i < this.Upgrades.length ; i++ ) {
                    if (this.Upgrades[i].ID == _model) {
                        modelVal = this.Upgrades[i];
                    }
                }

                const modelList : IFactionUpgrade = {
                    id: modelVal? modelVal.ID : "",
                    cost: parseInt(_cost),
                    cost_id: _costtype                    
                }

                const ContentNew: FactionUpgrade = new FactionUpgrade((modelList));
                _warband.Upgrades.push(ContentNew);
            } else {
                return ReturnMsg;
            }
        } catch (e) {
            ReturnMsg = "Something went wrong.";
        }

        if (ReturnMsg == "") {
            this.SetStorage();
        }
        return ReturnMsg;
    }

    public NewEquipmentForWarband(_warband : Warband, _model : string, _cost : string, _costtype : string){
        let ReturnMsg = "";
        try {
            if (_model == "" || _model == "[No Model Selected]") {
                ReturnMsg = "Your Item must be one of the available options."
            }
            if (_cost == "" || parseInt(_cost) < 0) {
                ReturnMsg = "Your Item must cost at least 0."
            }
            let i = 0;
            if (ReturnMsg == "") {
                let modelVal : any = null;
                
                for (i = 0; i < this.Equipment.length ; i++ ) {
                    if (this.Equipment[i].ID == _model) {
                        modelVal = this.Equipment[i];
                    }
                }

                const modelList : IListEquipment = {
                    id: modelVal? modelVal.ID : "",
                    cost: parseInt(_cost),
                    cost_type: _costtype                    
                }

                const ContentNew: ListEquipment = new ListEquipment((modelList));
                _warband.Armoury.push(ContentNew);
            } else {
                return ReturnMsg;
            }
        } catch (e) {
            ReturnMsg = "Something went wrong.";
        }

        if (ReturnMsg == "") {
            this.SetStorage();
        }
        return ReturnMsg;
    }

    public NewWarband(_name : string, _faction : string) {
        let ReturnMsg = "";
        try {
            if (_name.trim().length == 0) {
                ReturnMsg = "Warband name must not be blank."
            }
            if (_faction == "" || _faction == "[No Faction Selected]") {
                ReturnMsg = "Your Warband must have a faction."
            }
            let i = 0;
            for (i = 0; i < this.WarbandList.length ; i++ ) {
                if (this.WarbandList[i].Name.trim() == _name.trim()) {
                    ReturnMsg = "Two Warbands cant share the same name.";
                }
            }
            if (ReturnMsg == "") {
                let factionVal : any = null;
                for (i = 0; i < this.Factions.length ; i++ ) {
                    if (this.Factions[i].Name == _faction) {
                        factionVal = this.Factions[i];
                    }
                }
                const _content : IWarband = {
                    id: this.CalcID(_name),
                    ducat_total : 0,
                    glory_total : 0,
                    members : [],
                    armoury : [],
                    name: _name,
                    faction: factionVal.InterfaceVal,
                    flavour: [],
                    notes: "",
                    deeds: [],
                    image: noimage,
                    ducat_lost : 0,
                    glory_lost : 0,
                    ducat_cost: 0,
                    glory_cost: 0
                }
                const ContentNew: Warband = new Warband((_content));
                this.WarbandList.push(ContentNew);
            } else {
                return ReturnMsg;
            }
        } catch (e) {
            ReturnMsg = "File was not in the Warband format.";
        }

        if (ReturnMsg == "") {

            this.SetStorage();
        }
        return ReturnMsg;
    }

    private CalcID(_name : string) {
        const currentDate = new Date();
        const milliseconds = currentDate.getMilliseconds();
        
        return _name + milliseconds.toString();
    }

    public GetWarbands() {
        return this.WarbandList;
    }

    public GetWarbandByName(_name : string) {
        let i = 0;
        for (i=0; i < this.WarbandList.length ; i++) {
            if (this.WarbandList[i].Name.trim() == _name) {
                return this.WarbandList[i]
            }
        }
        return null;
    }

    public ExportDisplayText(_warband : Warband, _notes : boolean) {
        const StartingRow = " " + _warband.Name + " | " + _warband.Faction.Name + " "

        const startrowlength = StartingRow.length;

        let returnRow = ("```" + "\n") + ("-".repeat(10)) + StartingRow + ("-".repeat(90-((startrowlength < 90)? startrowlength : 0)));

        if (_notes) {
            if (_warband.Notes.trim().length > 0){
            returnRow += "\n" + "[ NOTES ]" + "\n" + _warband.Notes + "\n"
            }
        }

        const ducatTotal = "Total : " + _warband.DucatTotal.toString();
        const ducatCost = "Spent : " + this.TotalCostDucats( _warband).toString() + " (" + _warband.DucatLost.toString() + " Lost)";
        const gloryTotal = "Total : " + _warband.GloryTotal.toString();
        const gloryCost = "Spent : " + this.TotalCostGlory(_warband).toString() + " (" + _warband.GloryCost.toString() + " Lost)";

        const totalRow = (ducatTotal.length > gloryTotal.length)? ducatTotal.length : gloryTotal.length;
        const costRow = (ducatCost.length > gloryCost.length)? ducatCost.length : gloryCost.length;

        const DucatRow = ducatTotal + (" ".repeat(((totalRow - ducatTotal.length) > 0)? totalRow - ducatTotal.length : 0)) + " | " + ducatCost + (" ".repeat(((costRow - ducatCost.length) > 0)? costRow - ducatCost.length : 0)) + " | Available : " + (_warband.DucatTotal - this.TotalCostDucats(_warband)).toString()
        const GloryRow = gloryTotal + (" ".repeat(((totalRow - gloryTotal.length) > 0)? totalRow - gloryTotal.length : 0)) + " | " + gloryCost + (" ".repeat(((costRow - gloryCost.length) > 0)? costRow - gloryCost.length : 0)) + " | Available : " + (_warband.GloryTotal - this.TotalCostGlory(_warband)).toString()

        returnRow += "\n" + "[ DUCATS ]" + "\n" + DucatRow + "\n" + "[ GLORY ]" + "\n" + GloryRow + "\n"

        if (_warband.Armoury.length > 0) {
            returnRow += "\n" + "[ ARMOURY ]"
        }
        let lengthMarker = 0;

        let i = 0;
        for (i = 0 ; i < _warband.Armoury.length ; i ++) {
            if (_warband.Armoury[i].Object.Name.length > lengthMarker) {
                lengthMarker = _warband.Armoury[i].Object.Name.length;
            }
        }


        const RangedSet = [];
        const MeleeSet = [];
        const ArmourSet = [];
        const MiscSet = [];

        let lengthCheckEquip = 0;

        for (i = 0 ; i < _warband.Armoury.length ; i ++) {
            lengthCheckEquip = lengthMarker-((_warband.Armoury[i].Object.Name? _warband.Armoury[i].Object.Name : "").length)
            if (_warband.Armoury[i].Object.Category == "ranged") {
                RangedSet.push((_warband.Armoury[i].Object.Name? _warband.Armoury[i].Object.Name : "") + (" ".repeat((lengthCheckEquip > 0)? lengthCheckEquip : 0)) + " | " + _warband.Armoury[i].Cost.toString() + " " + _warband.Armoury[i].CostType);
            }
            if (_warband.Armoury[i].Object.Category == "melee") {
                MeleeSet.push((_warband.Armoury[i].Object.Name? _warband.Armoury[i].Object.Name : "") + (" ".repeat((lengthCheckEquip > 0)? lengthCheckEquip : 0)) + " | " + _warband.Armoury[i].Cost.toString() + " " + _warband.Armoury[i].CostType);
            }
            if (_warband.Armoury[i].Object.Category == "armour") {
                ArmourSet.push((_warband.Armoury[i].Object.Name? _warband.Armoury[i].Object.Name : "") + (" ".repeat((lengthCheckEquip > 0)? lengthCheckEquip : 0)) + " | " + _warband.Armoury[i].Cost.toString() + " " + _warband.Armoury[i].CostType);
            }
            if (_warband.Armoury[i].Object.Category == "equipment") {
                MiscSet.push((_warband.Armoury[i].Object.Name? _warband.Armoury[i].Object.Name : "") + (" ".repeat((lengthCheckEquip > 0)? lengthCheckEquip : 0)) + " | " + _warband.Armoury[i].Cost.toString() + " " + _warband.Armoury[i].CostType);
            }
        }
        if (RangedSet.length > 0) {
            returnRow += "\n" + "- RANGED"
            for (i = 0; i < RangedSet.length; i++) {
                returnRow += "\n" + "  " + RangedSet[i]
            }
        }
        if (MeleeSet.length > 0) {
            returnRow += "\n" + "- MELEE"
            for (i = 0; i < MeleeSet.length; i++) {
                returnRow += "\n" + "  " + MeleeSet[i]
            }
        }
        if (ArmourSet.length > 0) {
            returnRow += "\n" + "- ARMOUR"
            for (i = 0; i < ArmourSet.length; i++) {
                returnRow += "\n" + "  " + ArmourSet[i]
            }
        }
        if (MiscSet.length > 0) {
            returnRow += "\n" + "- MISC"
            for (i = 0; i < MiscSet.length; i++) {
                returnRow += "\n" + "  " + MiscSet[i]
            }
        }

        returnRow += "\n" + "\n" + "[ ELITE MEMBERS ]"

        for (i = 0; i < _warband.Members.length; i ++) {
            if (_warband.Members[i].Elite) {
                returnRow += "\n" + "\n" + this.ExportModelDisplayText(_warband.Members[i], _notes, true);
            }
        }

        returnRow += "\n" + "\n" + "[ INFANTRY ]"

        for (i = 0; i < _warband.Members.length; i ++) {
            if (!(_warband.Members[i].Elite)) {
                returnRow += "\n" + "\n" + this.ExportModelDisplayText(_warband.Members[i], _notes, true);
            }
        }

        returnRow += "\n" + "\n" + ("-".repeat(100)) + ("\n" + "```")

        return returnRow;
    }

    public ExportModelDisplayText(_model : WarbandMember, _notes : boolean, _inside : boolean) {
        const StartingRow = _model.Name + " | " + (this.GetDucatCost(_model) + " ducats") + " | " + (this.GetGloryCost(_model) + " glory")
        let lengthMarker = _model.Model.Object.Name? _model.Model.Object.Name?.length : 0;
        let rowMarker = StartingRow.length + 8;

        let i = 0;
        for (i = 0 ; i < _model.Equipment.length ; i ++) {
            if (_model.Equipment[i].Object.Name.length > lengthMarker) {
                lengthMarker = _model.Equipment[i].Object.Name.length;
            }
        }

        const modelLengthCheck = lengthMarker-((_model.Model.Object.Name? _model.Model.Object.Name : "").length)
        const ModelRow = (_model.Model.Object.Name? _model.Model.Object.Name : "") + (" ".repeat((modelLengthCheck > 0)? modelLengthCheck : 0)) + " | " + _model.Model.Cost.toString() + " " + _model.Model.CostType;

        if (ModelRow.length > rowMarker) {
            rowMarker = ModelRow.length + 1;
        }

        const UpgradeSet = [];
        let upgradelengthcheck = 0
        for (i = 0 ; i < _model.Upgrades.length ; i ++) {
            upgradelengthcheck = lengthMarker-((_model.Upgrades[i].Name? _model.Upgrades[i].Name : "").length)
            UpgradeSet.push((_model.Upgrades[i].Name? _model.Upgrades[i].Name : "") + (" ".repeat((upgradelengthcheck > 0)? upgradelengthcheck : 0)) + " | " + _model.Upgrades[i].Cost.toString() + " " + _model.Upgrades[i].CostID);
        }

        for (i = 0; i < UpgradeSet.length; i ++) {
            if (UpgradeSet[i].length > rowMarker) {
                rowMarker = UpgradeSet[i].length;
            }
        }

        const RangedSet = [];
        const MeleeSet = [];
        const ArmourSet = [];
        const MiscSet = [];
        
        let equiplengthcheck = 0
        for (i = 0 ; i < _model.Equipment.length ; i ++) {
            equiplengthcheck = lengthMarker-((_model.Equipment[i].Object.Name? _model.Equipment[i].Object.Name : "").length)
            if (_model.Equipment[i].Object.Category == "ranged") {
                RangedSet.push((_model.Equipment[i].Object.Name? _model.Equipment[i].Object.Name : "") + (" ".repeat((equiplengthcheck > 0)? equiplengthcheck : 0)) + " | " + _model.Equipment[i].Cost.toString() + " " + _model.Equipment[i].CostType);
            }
            if (_model.Equipment[i].Object.Category == "melee") {
                MeleeSet.push((_model.Equipment[i].Object.Name? _model.Equipment[i].Object.Name : "") + (" ".repeat((equiplengthcheck > 0)? equiplengthcheck : 0)) + " | " + _model.Equipment[i].Cost.toString() + " " + _model.Equipment[i].CostType);
            }
            if (_model.Equipment[i].Object.Category == "armour") {
                ArmourSet.push((_model.Equipment[i].Object.Name? _model.Equipment[i].Object.Name : "") + (" ".repeat((equiplengthcheck > 0)? equiplengthcheck : 0)) + " | " + _model.Equipment[i].Cost.toString() + " " + _model.Equipment[i].CostType);
            }
            if (_model.Equipment[i].Object.Category == "equipment") {
                MiscSet.push((_model.Equipment[i].Object.Name? _model.Equipment[i].Object.Name : "") + (" ".repeat((equiplengthcheck > 0)? equiplengthcheck : 0)) + " | " + _model.Equipment[i].Cost.toString() + " " + _model.Equipment[i].CostType);
            }
        }

        for (i = 0; i < RangedSet.length; i ++) {
            if (RangedSet[i].length > rowMarker) {
                rowMarker = RangedSet[i].length;
            }
        }
        for (i = 0; i < MeleeSet.length; i ++) {
            if (MeleeSet[i].length > rowMarker) {
                rowMarker = MeleeSet[i].length;
            }
        }
        for (i = 0; i < ArmourSet.length; i ++) {
            if (ArmourSet[i].length > rowMarker) {
                rowMarker = ArmourSet[i].length;
            }
        }
        for (i = 0; i < MiscSet.length; i ++) {
            if (MiscSet[i].length > rowMarker) {
                rowMarker = MiscSet[i].length;
            }
        }

        if (rowMarker % 2 == 1) {
            rowMarker += 1;
        }

        const rowMarkerDiv = (rowMarker - StartingRow.length - 2)/2
        const FirstRow = ("-".repeat((rowMarkerDiv > 0)? rowMarkerDiv : 0)) + " " + StartingRow + " " + ("-".repeat((rowMarkerDiv > 0)? rowMarkerDiv : 0))
        const LastRow = ("-".repeat(rowMarker))

        let returnString = (_inside? "" : ("```" + ("\n"))  )

        returnString += (FirstRow + "\n" + 
        "[ MODEL ]" + "\n" + "  " + ModelRow )
        
        if (_notes) {
            if (_model.Notes.trim().length > 0) {
            returnString += "\n" + "[ NOTES ]" + "\n" + _model.Notes
            }
        }

        returnString += "\n" + "[ UPGRADES ]"

        if (UpgradeSet.length > 0) {
            for (i = 0; i < UpgradeSet.length; i++) {
                returnString += "\n" + "  " + UpgradeSet[i]
            }
        }

        returnString += "\n" + "[ GEAR ]"

        if (RangedSet.length > 0) {
            returnString += "\n" + "- RANGED"
            for (i = 0; i < RangedSet.length; i++) {
                returnString += "\n" + "  " + RangedSet[i]
            }
        }
        if (MeleeSet.length > 0) {
            returnString += "\n" + "- MELEE"
            for (i = 0; i < MeleeSet.length; i++) {
                returnString += "\n" + "  " + MeleeSet[i]
            }
        }
        if (ArmourSet.length > 0) {
            returnString += "\n" + "- ARMOUR"
            for (i = 0; i < ArmourSet.length; i++) {
                returnString += "\n" + "  " + ArmourSet[i]
            }
        }
        if (MiscSet.length > 0) {
            returnString += "\n" + "- MISC"
            for (i = 0; i < MiscSet.length; i++) {
                returnString += "\n" + "  " + MiscSet[i]
            }
        }

        if (_model.Skills.length > 0) {
            returnString += "\n" + "[ SKILLS ]" + "\n" + "Experience : " + _model.Experience;
            for (i = 0; i < _model.Skills.length; i++) {
                returnString += "\n" + "  " +  _model.Skills[i].name;
            }
        }

        if (_model.Injuries.length > 0) {
            returnString += "\n" + "[ INJURIES ]" + "\n" + "Scars : " + _model.Injuries.length;
            
            for (i = 0; i < _model.Injuries.length; i++) {
                returnString += "\n" + "  " + _model.Injuries[i].Name;
            }
        }

        returnString += "\n" + LastRow + (_inside? "" : ("\n" + "```"))

        return returnString
    }

    public ExportDisplayTextBasic(_warband : Warband, _notes : boolean) {
        const StartingRow = " " + _warband.Name + " | " + _warband.Faction.Name + " "

        const startrowlength = StartingRow.length;

        let returnRow = ("```" + "\n") + ("-".repeat(10)) + StartingRow + ("-".repeat(90-((startrowlength < 90)? startrowlength : 0)));

        const ducatTotal = "Total : " + _warband.DucatTotal.toString();
        const ducatCost = "Spent : " + this.TotalCostDucats( _warband).toString() + " (" + _warband.DucatLost.toString() + " Lost)";
        const gloryTotal = "Total : " + _warband.GloryTotal.toString();
        const gloryCost = "Spent : " + this.TotalCostGlory(_warband).toString() + " (" + _warband.GloryCost.toString() + " Lost)";

        const totalRow = (ducatTotal.length > gloryTotal.length)? ducatTotal.length : gloryTotal.length;
        const costRow = (ducatCost.length > gloryCost.length)? ducatCost.length : gloryCost.length;

        const DucatRow = ducatTotal + (" ".repeat(((totalRow - ducatTotal.length) > 0)? totalRow - ducatTotal.length : 0)) + " | " + ducatCost + (" ".repeat(((costRow - ducatCost.length) > 0)? costRow - ducatCost.length : 0)) + " | Available : " + (_warband.DucatTotal - this.TotalCostDucats(_warband)).toString()
        const GloryRow = gloryTotal + (" ".repeat(((totalRow - gloryTotal.length) > 0)? totalRow - gloryTotal.length : 0)) + " | " + gloryCost + (" ".repeat(((costRow - gloryCost.length) > 0)? costRow - gloryCost.length : 0)) + " | Available : " + (_warband.GloryTotal - this.TotalCostGlory(_warband)).toString()

        returnRow += "\n" + "[ DUCATS ] " + DucatRow + "\n" + "[ GLORY ] " + GloryRow;

        if (_warband.Armoury.length > 0) {
            returnRow += "\n" + "\n" + "[ ARMOURY ]"
        }

        let i = 0;


        const Equipment = [];

        for (i = 0 ; i < _warband.Armoury.length ; i ++) {
            Equipment.push((_warband.Armoury[i].Object.Name? _warband.Armoury[i].Object.Name : "") + " ( " + _warband.Armoury[i].Cost.toString() + " " + _warband.Armoury[i].CostType + " )");
        }

        if (Equipment.length > 0) {
            for (i = 0; i < Equipment.length; i++) {
                returnRow += "\n" + "  " + Equipment[i]
            }
        }

        returnRow += "\n";

        if (_warband.Members.filter((value) => (value.Elite == true)).length > 0) {
            returnRow += "\n" + "[ ELITE MEMBERS ]"
        }

        for (i = 0; i < _warband.Members.length; i ++) {
            if (_warband.Members[i].Elite) {
                returnRow +=  "\n" + this.ExportModelDisplayTextBasic(_warband.Members[i], _notes, true);
            }
        }

        if (_warband.Members.filter((value) => (value.Elite != true)).length > 0) {
            returnRow += "\n" + "[ INFANTRY ]"
        }

        for (i = 0; i < _warband.Members.length; i ++) {
            if (!(_warband.Members[i].Elite)) {
                returnRow +=  "\n" + this.ExportModelDisplayTextBasic(_warband.Members[i], _notes, true);
            }
        }

        returnRow += "\n" + "\n" + ("-".repeat(100)) + ("\n" + "```")

        return returnRow;
    }

    public ExportModelDisplayTextBasic(_model : WarbandMember, _notes : boolean, _inside : boolean) {
        const StartingRow = _model.Name + " | " + _model.Model.Object.Name + " | " + (this.GetDucatCost(_model) + " ducats") + " " + (this.GetGloryCost(_model) + " glory")
        let rowMarker = StartingRow.length + 8;

        let i = 0;

        const Equipment = [];
        const Upgrades = [];
        
        for (i = 0 ; i < _model.Equipment.length ; i ++) {
            Equipment.push((_model.Equipment[i].Object.Name? _model.Equipment[i].Object.Name : "") + " (" + _model.Equipment[i].Cost.toString() + " " + _model.Equipment[i].CostType + ")");
        }
        
        for (i = 0 ; i < _model.Upgrades.length ; i ++) {
            Upgrades.push((_model.Upgrades[i].Name? _model.Upgrades[i].Name : "") + " (" + _model.Upgrades[i].Cost.toString() + " " + _model.Upgrades[i].CostID + ")");
        }

        for (i = 0; i < Equipment.length; i ++) {
            if (Equipment[i].length > rowMarker) {
                rowMarker = Equipment[i].length;
            }
        }
        for (i = 0; i < Upgrades.length; i ++) {
            if (Upgrades[i].length > rowMarker) {
                rowMarker = Upgrades[i].length;
            }
        }

        if (rowMarker % 2 == 1) {
            rowMarker += 1;
        }

        const rowMarkerDiv = (rowMarker - StartingRow.length - 2)/2
        const FirstRow = ("-".repeat((rowMarkerDiv > 0)? rowMarkerDiv : 0)) + " " + StartingRow + " " + ("-".repeat((rowMarkerDiv > 0)? rowMarkerDiv : 0))
        const LastRow = ("-".repeat(rowMarker))

        let returnString = (_inside? "" : ("```" + ("\n"))  )

        returnString += (FirstRow)

        if (Upgrades.length > 0) {
            for (i = 0; i < Upgrades.length; i++) {
                returnString += "\n" + "-" + Upgrades[i]
            }
        }

        if (Equipment.length > 0) {
            for (i = 0; i < Equipment.length; i++) {
                returnString += "\n" + "-" + Equipment[i]
            }
        }

        if (_model.Skills.length > 0) {
            returnString += "\n" + "[ SKILLS ]" + " (" + _model.Experience + " Experience)";
            for (i = 0; i < _model.Skills.length; i++) {
                returnString += "\n" + "-" +  _model.Skills[i].name;
            }
        }

        if (_model.Injuries.length > 0) {
            returnString += "\n" + "[ INJURIES ]" + " (" +  _model.Injuries.length + " Scars)";
            
            for (i = 0; i < _model.Injuries.length; i++) {
                returnString += "\n" + "-" + _model.Injuries[i].Name;
            }
        }

        returnString += "\n" + LastRow + (_inside? "" : ("\n" + "```"))

        return returnString
    }


    public GetModelByID(_name : string) {
        let i = 0;
        for (i=0; i < this.Models.length ; i++) {
            if (this.Models[i].ID == _name) {
                return this.Models[i]
            }
        }
        return null;
    }

    public GetEquipmentByID(_name : string) {
        let i = 0;
        for (i=0; i < this.Equipment.length ; i++) {
            if (this.Equipment[i].ID == _name) {
                return this.Equipment[i]
            }
        }
        return null;
    }

    public GetSkillByID(_name : string) {
        let i = 0;
        for (i=0; i < this.Skills.length ; i++) {
            if (this.Skills[i].id == _name) {
                return this.Skills[i]
            }
        }
        return null;
    }

    public GetScarByID(_name : string) {
        let i = 0;
        for (i=0; i < this.Injuries.length ; i++) {
            if (this.Injuries[i].ID == _name) {
                return this.Injuries[i]
            }
        }
        return null;
    }

    public DeleteModelFromWarband( _model : WarbandMember, _warband : Warband) {
        let i = 0;
        for (i = 0; i < _warband.Members.length; i++) {
            if (_warband.Members[i] == _model) {
                _warband.Members.splice(i, 1);
                break;
            }
        }
    }

    public DeleteEquipmentFromModel(_equipment : ListEquipment, _model : WarbandMember, _warband : Warband) {
        let i = 0;
        for (i = 0; i < _model.Equipment.length; i++) {
            if (_model.Equipment[i] == _equipment) {
                _warband.DucatCost = this.TotalCostDucats(_warband);
                _warband.GloryCost = this.TotalCostGlory(_warband);
                _model.Equipment.splice(i, 1);
                break;
            }
        }
    }

    public DeleteUpgradeFromModel(_equipment : FactionUpgrade, _model : WarbandMember, _warband : Warband) {
        let i = 0;
        for (i = 0; i < _model.Upgrades.length; i++) {
            if (_model.Upgrades[i] == _equipment) {
                _warband.DucatCost = this.TotalCostDucats(_warband);
                _warband.GloryCost = this.TotalCostGlory(_warband);
                _model.Upgrades.splice(i, 1);
                break;
            }
        }
    }

    public DeleteEquipmentFromWarband(_equipment : ListEquipment,_warband : Warband) {
        let i = 0;
        for (i = 0; i < _warband.Armoury.length; i++) {
            if (_warband.Armoury[i] == _equipment) {
                _warband.DucatCost = this.TotalCostDucats(_warband);
                _warband.GloryCost = this.TotalCostGlory(_warband);
                _warband.Armoury.splice(i, 1);
                break;
            }
        }
    }

    public DeleteSkillFromModel(_skill : IItemPartial, _model : WarbandMember, _warband : Warband) {
        let i = 0;
        for (i = 0; i < _model.Skills.length; i++) {
            if (_model.Skills[i] == _skill) {
                _model.Skills.splice(i, 1);
                break;
            }
        }
    }

    public DeleteScarFromModel(_scar : ListItem, _model : WarbandMember, _warband : Warband) {
        let i = 0;
        for (i = 0; i < _model.Injuries.length; i++) {
            if (_model.Injuries[i] == _scar) {
                _model.Injuries.splice(i, 1);
                break;
            }
        }
    }

    public DeletePack(_pack : Warband) {
        let i = 0;
        for (i = 0; i < this.WarbandList.length; i++) {
            if (_pack == this.WarbandList[i]) {
                this.WarbandList.splice(i, 1);
                break;
            }
        }
        this.SetStorage();
    }

    
    public TotalCostDucats(_band : Warband) {
        let totalducats = _band.DucatLost;

        let i = 0;
        
        for (i = 0; i < _band.Armoury.length ; i++) {
            if (_band.Armoury[i].CostType == "ducats") {
                totalducats += _band.Armoury[i].Cost;
            }
        }

        for (i = 0; i < _band.Members.length ; i++) {
            if (_band.Members[i].Model.CostType == "ducats") {
                totalducats += _band.Members[i].Model.Cost;
            }
            let j = 0;
            for (j = 0; j < _band.Members[i].Equipment.length; j++ ) {
                if (_band.Members[i].Equipment[j].CostType == "ducats") {
                    totalducats += _band.Members[i].Equipment[j].Cost;
                }
            }
            for (j = 0; j < _band.Members[i].Upgrades.length; j++ ) {
                if (_band.Members[i].Upgrades[j].CostID == "ducats") {
                    totalducats += _band.Members[i].Upgrades[j].Cost;
                }
            }
        }

        return totalducats;
    }

    public TotalCostGlory(_band : Warband) {
        let totalglory = _band.GloryLost;

        let i = 0;
        
        for (i = 0; i < _band.Armoury.length ; i++) {
            if (_band.Armoury[i].CostType == "glory") {
                totalglory += _band.Armoury[i].Cost;
            }
        }

        for (i = 0; i < _band.Members.length ; i++) {
            if (_band.Members[i].Model.CostType == "glory") {
                totalglory += _band.Members[i].Model.Cost;
            }
            let j = 0;
            for (j = 0; j < _band.Members[i].Equipment.length; j++ ) {
                if (_band.Members[i].Equipment[j].CostType == "glory") {
                    totalglory += _band.Members[i].Equipment[j].Cost;
                }
            }
            for (j = 0; j < _band.Members[i].Upgrades.length; j++ ) {
                if (_band.Members[i].Upgrades[j].CostID == "glory") {
                    totalglory += _band.Members[i].Upgrades[j].Cost;
                }
            }
        }

        return totalglory;
    }

    public GetDucatCost(_member : WarbandMember) {
        let totalCost = 0;

        if (_member.Model.CostType == "ducats") {
            totalCost += _member.Model.Cost;
        }

        let i = 0;
        for (i = 0; i < _member.Equipment.length; i++) {
            if (_member.Equipment[i].CostType == "ducats") {
                totalCost += _member.Equipment[i].Cost;
            }
        }
        
        for (i = 0; i < _member.Upgrades.length; i++) {
            if (_member.Upgrades[i].CostID == "ducats") {
                totalCost += _member.Upgrades[i].Cost;
            }
        }

        return totalCost.toString()
    }

    public GetGloryCost(_member : WarbandMember) {
        let totalCost = 0;

        if (_member.Model.CostType == "glory") {
            totalCost += _member.Model.Cost;
        }

        let i = 0;
        for (i = 0; i < _member.Equipment.length; i++) {
            if (_member.Equipment[i].CostType == "glory") {
                totalCost += _member.Equipment[i].Cost;
            }
        }
        for (i = 0; i < _member.Upgrades.length; i++) {
            if (_member.Upgrades[i].CostID == "glory") {
                totalCost += _member.Upgrades[i].Cost;
            }
        }

        return totalCost.toString()
    }
}

export {WarbandManager}