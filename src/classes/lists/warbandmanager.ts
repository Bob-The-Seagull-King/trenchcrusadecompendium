import { IWarband, Warband } from './Warband';
import Cookies from 'js-cookie'
import { useWarbandStore } from '../../store/warbands';
import { GrabWarband } from '../../store/warbands';
import { IPlayerFaction, PlayerFaction } from "../../classes/feature/factions/Faction";
import { IPlayerModel, PlayerModel } from '../../classes/feature/models/Model';
import { ModelFactory } from '../../factories/features/ModelFactory';
import { IPlayerFactionVariant } from "../../classes/feature/factions/FactionVariant";
import { FactionFactory } from "../../factories/features/FactionFactory";
import { FactionVariantFactory } from "../../factories/features/FactionVariantFactory";
import { byPropertiesOf, getColour, sort } from "../../utility/functions";
import { Requester } from "../../factories/Requester";
import noimage from '../../resources/images/no_image.jpg'
import { IWarbandMember, WarbandMember } from './WarbandMember';
import { containsTag } from '../../utility/functions';
import { IListModel } from './ListModel';

class WarbandManager {
    WarbandList: Warband[] = [];
    Factions: PlayerFaction[] = [];
    Models: PlayerModel[] = [];

    constructor() {
        const ReturnData = GrabWarband();
        this.WarbandList = ReturnData;
        this.FindFactions();
        this.FindModels();
    }

    /**
    * For each entry in the data results, create an Model object
    * and add it to the internal list.
    */
    FindFactions() {
       this.Factions = [];
       const dataresults = Requester.MakeRequest({searchtype: "file", searchparam: {type: "faction"}});
       let i = 0;
       dataresults.sort(byPropertiesOf<PlayerFaction>(['Name']))
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
        dataresults.sort(byPropertiesOf<PlayerModel>(['Name']))
        for (i = 0; i < dataresults.length; i++) {
            const modelNew = ModelFactory.CreateModel(dataresults[i]);
            this.Models.push(modelNew);
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

    public NewMember(_warband : Warband, _name : string, _model : string, _cost : string, _costtype : string){
        let ReturnMsg = "";
        try {
            console.log("A");
            if (_model == "" || _model == "[No Model Selected]") {
                ReturnMsg = "Your Member must be a model."
            }
            console.log("A");
            if (_cost == "" || parseInt(_cost) < 0) {
                ReturnMsg = "Your Member must cost at least 0."
            }
            console.log("A");
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
                    notes : []
                }
                const ContentNew: WarbandMember = new WarbandMember((_content));
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
                    notes: [],
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

    public GetModelByID(_name : string) {
        let i = 0;
        for (i=0; i < this.Models.length ; i++) {
            if (this.Models[i].ID == _name) {
                return this.Models[i]
            }
        }
        return null;
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
        }

        return totalglory;
    }
}

export {WarbandManager}