import { IWarband, Warband } from './Warband';
import { GrabWarband } from '../../store/warbands';
import { IPlayerFaction, PlayerFaction } from "../../classes/feature/factions/Faction";
import { IPlayerModel, PlayerModel } from '../../classes/feature/models/Model';
import { IPlayerEquipment, PlayerEquipment } from '../../classes/feature/equipment/Equipment';
import { ModelFactory } from '../../factories/features/ModelFactory';
import { EquipmentFactory } from '../../factories/features/EquipmentFactory';
import { IPlayerFactionVariant } from "../../classes/feature/factions/FactionVariant";
import { FactionFactory } from "../../factories/features/FactionFactory";
import { FactionVariantFactory } from "../../factories/features/FactionVariantFactory";
import { byPropertiesOf } from "../../utility/functions";
import { Requester } from "../../factories/Requester";
import noimage from '../../resources/images/no_image.jpg'
import { IWarbandMember, WarbandMember } from './WarbandMember';
import { containsTag } from '../../utility/functions';
import { IListModel } from './ListModel';
import { IListEquipment, ListEquipment } from './ListEquipment';
import { IItemPartial } from '../../classes/feature/list/ListGroup';
import { IListItem, ListItem } from '../../classes/feature/list/ListItem';
import { FactionUpgrade, IFactionUpgrade, IUpgradeData } from '../../classes/feature/factions/FactionUpgrade';
import { TotalCostDucats, TotalCostGlory, CalcID } from './warbandmanagerstatic';

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

    public SetStorage() {
        localStorage.setItem('warbandstorage', JSON.stringify(this.WarbandList));
    }

    public DuplicateMember(_warband : Warband, _member : WarbandMember) {
        const NewMember : WarbandMember = JSON.parse(JSON.stringify(_member));
        NewMember.Name = _member.Name + " - Copy"
        _warband.Members.push(NewMember);
    }
    public DuplicateWarband(_warband : Warband) {
        const NewMember : Warband = JSON.parse(JSON.stringify(_warband));
        NewMember.Name = _warband.Name + " - Copy"
        NewMember.ID = CalcID(_warband.Name + " - Copy");
        
        this.WarbandList.push(NewMember);
        this.SetStorage();
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
            _warband.DucatCost = TotalCostDucats(_warband)
            _warband.GloryCost = TotalCostGlory(_warband)
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
                    id: CalcID(_name),
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
                _warband.DucatCost = TotalCostDucats(_warband);
                _warband.GloryCost = TotalCostGlory(_warband);
                _model.Equipment.splice(i, 1);
                break;
            }
        }
    }

    public DeleteUpgradeFromModel(_equipment : FactionUpgrade, _model : WarbandMember, _warband : Warband) {
        let i = 0;
        for (i = 0; i < _model.Upgrades.length; i++) {
            if (_model.Upgrades[i] == _equipment) {
                _warband.DucatCost = TotalCostDucats(_warband);
                _warband.GloryCost = TotalCostGlory(_warband);
                _model.Upgrades.splice(i, 1);
                break;
            }
        }
    }

    public DeleteEquipmentFromWarband(_equipment : ListEquipment,_warband : Warband) {
        let i = 0;
        for (i = 0; i < _warband.Armoury.length; i++) {
            if (_warband.Armoury[i] == _equipment) {
                _warband.DucatCost = TotalCostDucats(_warband);
                _warband.GloryCost = TotalCostGlory(_warband);
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

}

export {WarbandManager}