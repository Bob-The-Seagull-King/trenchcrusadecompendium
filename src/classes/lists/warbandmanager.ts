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
    Locations: IItemPartial[] = [];
    Modifiers: IItemPartial[] = [];
    Injuries: ListItem[] = [];
    Upgrades : FactionUpgrade[] = [];

    constructor() {
        const ReturnData = GrabWarband();
        this.FindFactions();
        this.FindModels();
        this.FindEquipment();
        this.FindSkills();
        this.FindLocations();
        this.FindModifiers();
        this.FindInjuries();
        this.FindUpgrades();
        this.WarbandList = this.UpdateWarbands(ReturnData);
    }

    // ----------------------------------- Load Manager Data -----------------------------------

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
    FindLocations() {
        this.Locations = [];
        const dataresults = Requester.MakeRequest({searchtype: "file", searchparam: {type: "location"}});
        let i = 0;
        dataresults.sort(byPropertiesOf<IItemPartial>(['name',"id"]))
        for (i = 0; i < dataresults.length; i++) {
            const modelNew = (dataresults[i]);
            this.Locations.push(modelNew);
        }
    }
 
    /**
     * For each entry in the data results, create an Model object
     * and add it to the internal list.
     */
    FindModifiers() {
        this.Modifiers = [];
        const dataresults = Requester.MakeRequest({searchtype: "file", searchparam: {type: "exploremodifiers"}});
        let i = 0;
        dataresults.sort(byPropertiesOf<IItemPartial>(['name',"id"]))
        for (i = 0; i < dataresults.length; i++) {
            const modelNew = (dataresults[i]);
            this.Modifiers.push(modelNew);
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
     
    /**
     * Adds variant factions to the internal list used
     * by the manager.
     * @param faction The faction to get variants of
     */
    GetVariants(faction : PlayerFaction) {
        // Create and run complex search
        const variants : IPlayerFactionVariant[] = Requester.MakeRequest(
            {
                searchtype: "complex",
                searchparam: {
                    type: "variants",
                    request: {
                        operator: "and",
                        terms: [ { item: "faction_id", value: faction.ID, equals: true, strict: true, stag: false } ],
                        subparams: []
                    }
                }
            }); 
        
        // Create all variant factions and add to list
        let i = 0;
        for (i = 0; i < variants.length ; i++) {
            const variantfaction = FactionVariantFactory.CreateFactory(variants[i],faction.Name);
            this.Factions.push(variantfaction)
        }
    }

    // ----------------------------------- Deleter Functions -----------------------------------
    
    /**
     * Removes one member from the warband
     * @param _model The member to be deleted
     * @param _warband The warband to delete it from
     */
    public DeleteModelFromWarband( _model : WarbandMember, _warband : Warband) {
        let i = 0;
        for (i = 0; i < _warband.Members.length; i++) {
            if (_warband.Members[i] == _model) {
                _warband.Members.splice(i, 1);
                break;
            }
        }
    }

    /**
     * Removes one piece of equipment from a warband member
     * @param _equipment The equipment to be deleted
     * @param _model The member to delete it from
     * @param _warband The warband the member is from
     */
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

    /**
     * Removes one upgrade from a warband member
     * @param _equipment The upgrade to be deleted
     * @param _model The member to delete it from
     * @param _warband The warband the member is from
     */
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

    /**
     * Removes one piece of equipment from a warband
     * @param _equipment The equipment to be deleted
     * @param _warband The warband to delete it from
     */
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

    /**
     * Removes a single skill from a warband member
     * @param _skill The skill to be deleted
     * @param _model The model to delete it from
     * @param _warband The warband the model is a part of
     */
    public DeleteLocationFromWarband(_location : IItemPartial, _warband : Warband) {
        let i = 0;
        for (i = 0; i < _warband.Locations.length; i++) {
            if (_warband.Locations[i] == _location) {
                _warband.Locations.splice(i, 1);
                break;
            }
        }
    }

    /**
     * Removes a single skill from a warband member
     * @param _skill The skill to be deleted
     * @param _model The model to delete it from
     * @param _warband The warband the model is a part of
     */
    public DeleteModifierFromWarband(_modifier : IItemPartial, _warband : Warband) {
        let i = 0;
        for (i = 0; i < _warband.Modifiers.length; i++) {
            if (_warband.Modifiers[i] == _modifier) {
                _warband.Modifiers.splice(i, 1);
                break;
            }
        }
    }

    /**
     * Removes a single skill from a warband member
     * @param _skill The skill to be deleted
     * @param _model The model to delete it from
     * @param _warband The warband the model is a part of
     */
    public DeleteSkillFromModel(_skill : IItemPartial, _model : WarbandMember, _warband : Warband) {
        let i = 0;
        for (i = 0; i < _model.Skills.length; i++) {
            if (_model.Skills[i] == _skill) {
                _model.Skills.splice(i, 1);
                break;
            }
        }
    }

    /**
     * Removes a scar from a warband member
     * @param _scar The scar to be deleted
     * @param _model The member to delete it from
     * @param _warband The warband a member is a part of
     */
    public DeleteScarFromModel(_scar : ListItem, _model : WarbandMember, _warband : Warband) {
        let i = 0;
        for (i = 0; i < _model.Injuries.length; i++) {
            if (_model.Injuries[i] == _scar) {
                _model.Injuries.splice(i, 1);
                break;
            }
        }
    }

    /**
     * Deletes a warband and automatically updates
     * the local storage
     * @param _pack The warband to remove
     */
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

    // ----------------------------------- Getter Functions -----------------------------------
    
    /**
     * @returns All warbands
     */
    public GetWarbands() {
        return this.WarbandList;
    }

    /**
     * @param _name The name of the warband to find
     * @returns The first instance of a warband with that name
     */
    public GetWarbandByName(_name : string) {
        let i = 0;
        for (i=0; i < this.WarbandList.length ; i++) {
            if (this.WarbandList[i].Name.trim() == _name) {
                return this.WarbandList[i]
            }
        }
        return null;
    }

    /**
     * Finds a model from the manager's internal list
     * @param _name The ID of that Model
     * @returns A PlayerModel object
     */
    public GetModelByID(_name : string) {
        let i = 0;
        for (i=0; i < this.Models.length ; i++) {
            if (this.Models[i].ID == _name) {
                return this.Models[i]
            }
        }
        return null;
    }

    /**
     * Finds a piece of equipment from the manager's internal list
     * @param _name The ID of that Equipment
     * @returns An equipment object
     */
    public GetEquipmentByID(_name : string) {
        let i = 0;
        for (i=0; i < this.Equipment.length ; i++) {
            if (this.Equipment[i].ID == _name) {
                return this.Equipment[i]
            }
        }
        return null;
    }
    
    /**
     * Finds a skill from the manager's internal list
     * @param _name The ID of that Skill
     * @returns A partial list item object
     */
    public GetSkillByID(_name : string) {
        let i = 0;
        for (i=0; i < this.Skills.length ; i++) {
            if (this.Skills[i].id == _name) {
                return this.Skills[i]
            }
        }
        return null;
    }
    
    /**
     * Finds a skill from the manager's internal list
     * @param _name The ID of that Skill
     * @returns A partial list item object
     */
    public GetLocationByID(_name : string) {
        let i = 0;
        for (i=0; i < this.Locations.length ; i++) {
            if (this.Locations[i].id == _name) {
                return this.Locations[i]
            }
        }
        return null;
    }
    
    /**
     * Finds a skill from the manager's internal list
     * @param _name The ID of that Skill
     * @returns A partial list item object
     */
    public GetModifierByID(_name : string) {
        let i = 0;
        for (i=0; i < this.Modifiers.length ; i++) {
            if (this.Modifiers[i].id == _name) {
                return this.Modifiers[i]
            }
        }
        return null;
    }
    
    /**
     * Finds an injury from the manager's internal list
     * @param _name The ID of that injury
     * @returns A ListItem object
     */
    public GetScarByID(_name : string) {
        let i = 0;
        for (i=0; i < this.Injuries.length ; i++) {
            if (this.Injuries[i].ID == _name) {
                return this.Injuries[i]
            }
        }
        return null;
    }

    // ----------------------------------- Updater Functions ----------------------------------

    /**
     * Updates the faction / model / etc information to reflect the
     * current data set.
     * This is done to prevent warbands created before an update from
     * retaining incorrect information.
     * @param data The current list of warbands
     * @returns The updated list of warbands
     */
    UpdateWarbands(data: Warband[]) {
        const listofbands: Warband[] = [];
        let i = 0;

        // Iterate through each known warband
        for (i = 0; i < data.length; i ++) {

            // Update the warband's faction
            const factionid = data[i].Faction.ID;
            let j = 0;
            for (j = 0; j < this.Factions.length; j ++) {
                if (this.Factions[j].ID == factionid) {
                    data[i].Faction = this.Factions[j];
                    break;
                }
            }

            // Update modifiers and locations
            if (!data[i].Locations) {
                data[i].Locations = []
            }
            if (!data[i].Modifiers) {
                
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
                data[i].Modifiers = [_reroll]
            }

            // Update model information
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

            // Update equipment information
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

            // Add updated warband to new list
            listofbands.push(data[i]);
        }

        return listofbands;
    }

    /**
     * Update the browser's locally stored record of warbands
     */
    public SetStorage() {
        localStorage.setItem('warbandstorage', JSON.stringify(this.WarbandList));
    }
    
    // ----------------------------------- Duplicater Functions -------------------------------

    /**
     * Creates a copy of a warband member
     * @param _warband The warband to add the new member to
     * @param _member The member to duplicate
     */
    public DuplicateMember(_warband : Warband, _member : WarbandMember) {
        const NewMember : WarbandMember = JSON.parse(JSON.stringify(_member));
        NewMember.Name = _member.Name + " - Copy"
        _warband.Members.push(NewMember);
    }

    /**
     * Duplicates an existing warband and adds it to the stored list.
     * Adds '- Copy' to the end of the name by default.
     * @param _warband The warband to copy
     */
    public DuplicateWarband(_warband : Warband) {
        const NewMember : Warband = JSON.parse(JSON.stringify(_warband));
        NewMember.Name = _warband.Name + " - Copy"
        NewMember.ID = CalcID(_warband.Name + " - Copy");
        
        this.WarbandList.push(NewMember);
        this.SetStorage();
    }
    
    // ----------------------------------- Member Creator Functions ---------------------------

    /**
     * Creates a new member of a warband based on user-filled information
     * @param _warband The warband to add the member to
     * @param _name The nickname (or lack thereof) for the member
     * @param _model What model the member uses
     * @param _cost How much was spent on the member
     * @param _costtype If the member cost Ducats or Glory
     * @returns A string message, if non-null then something wrong has happened
     */
    public NewMember(_warband : Warband, _name : string, _model : string, _cost : string, _costtype : string){
        let ReturnMsg = "";
        let modelVal : any = null;
        let memberName = "";
        let i = 0;

        try {
            // Complains if no model was selected
            if (_model == "" || _model == "[No Model Selected]") { ReturnMsg = "Your Member must be a model." }

            // Complains if the cost is negative (free is allowed)
            if (_cost == "" || parseInt(_cost) < 0) { ReturnMsg = "Your Member must cost at least 0." }

            // Only run this if the previous 'simple' checked passed
            if (ReturnMsg == "") {
                // Find the model in the manager's list which matches the provided model name.
                for (i = 0; i < this.Models.length ; i++ ) {
                    if (this.Models[i].ID == _model) { modelVal = this.Models[i]; }
                }

                // Provide a default name if none is given.
                if (_name.trim() == "") {
                    memberName = modelVal? modelVal.Name : "Unamed Soldier";
                } else { memberName = _name; }

                // Check if the model has the 'Elite' tag
                const isElite = containsTag(modelVal? modelVal.Tags : [], "elite")

                // Generate model data structures
                const modelList : IListModel = {
                    id: modelVal? modelVal.ID : "",
                    cost: parseInt(_cost),
                    cost_type: _costtype                    
                    }

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

                // Attempt to create new member object
                const ContentNew: WarbandMember = new WarbandMember((_content));

                // For each piece of starting equipment, automatically add it to the member
                for (i = 0; i < _warband.Faction.Models.length; i++) {
                    if (ContentNew.Model.ID == _warband.Faction.Models[i].ID) {
                        if (_warband.Faction.Models[i].Equipment != undefined) {
                            let j = 0
                            for (j = 0; j < _warband.Faction.Models[i].Equipment.length; j++) {
                                const msg = this.NewEquipmentForMember(ContentNew, _warband.Faction.Models[i].Equipment[j], "0", "ducats")
                            }
                        }
                    }
                }

                // Add the new member to the warband's list of members
                _warband.Members.push(ContentNew);
            } else {
                return ReturnMsg;
            }
        } catch (e) {
            ReturnMsg = "Something went wrong.";
        }

        // If no error occured, update the warband's total costs and save it locally
        if (ReturnMsg == "") {
            _warband.DucatCost = TotalCostDucats(_warband)
            _warband.GloryCost = TotalCostGlory(_warband)
            this.SetStorage();
        }

        return ReturnMsg;
    }

    /**
     * Creates a new piece of equipment and adds it to a warband member
     * @param _warband The member the equipment is being added to
     * @param _model The name of the equipment piece
     * @param _cost How much the equipment cost
     * @param _costtype If the equipment cost Ducats or Glory
     * @returns A string message, if non-null then something wrong has happened
     */
    public NewEquipmentForMember(_warband : WarbandMember, _model : string, _cost : string, _costtype : string){
        let ReturnMsg = "";
        let i = 0;
        
        try {
            // Complains if no equipment was selected
            if (_model == "" || _model == "[No Model Selected]") { ReturnMsg = "Your Item must be one of the available options." }

            // Complains if the cost is negative (Free is okay)
            if (_cost == "" || parseInt(_cost) < 0) { ReturnMsg = "Your Item must cost at least 0." }
            
            if (ReturnMsg == "") {

                // Find the equipment in the manager's list which matches the provided equipment name.
                let modelVal : any = null;
                for (i = 0; i < this.Equipment.length ; i++ ) {
                    if (this.Equipment[i].ID == _model) { modelVal = this.Equipment[i]; }
                }

                // Generate equipment item data
                const modelList : IListEquipment = {
                    id: modelVal? modelVal.ID : "",
                    cost: parseInt(_cost),
                    cost_type: _costtype                    
                }

                // Create and add Equipment object
                const ContentNew: ListEquipment = new ListEquipment((modelList));
                _warband.Equipment.push(ContentNew);
            } else {
                return ReturnMsg;
            }
        } catch (e) {
            ReturnMsg = "Something went wrong.";
        }

        // If nothing has gone wrong, update the local storage
        if (ReturnMsg == "") {
            this.SetStorage();
        }

        return ReturnMsg;
    }
    
    /**
     * Creates a new piece of equipment and adds it to a warband member
     * @param _warband The member upgrade upgrade is being added to
     * @param _model The name of the upgrade piece
     * @param _cost How much the upgrade cost
     * @param _costtype If the upgrade cost Ducats or Glory
     * @returns A string message, if non-null then something wrong has happened
     */
    public NewUpgradeForMember(_warband : WarbandMember, _model : string, _cost : string, _costtype : string){
        let ReturnMsg = "";
        let i = 0;

        try {
            // Complains if no upgrade was selected
            if (_model == "" || _model == "[No Model Selected]") { ReturnMsg = "Your Item must be one of the available options." }
            
            // Complains if the cost is negative (Free is okay)
            if (_cost == "" || parseInt(_cost) < 0) { ReturnMsg = "Your Item must cost at least 0." }

            if (ReturnMsg == "") {

                // Find the upgrade in the manager's list which matches the provided upgrade name.
                let modelVal : any = null;
                for (i = 0; i < this.Upgrades.length ; i++ ) {
                    if (this.Upgrades[i].ID == _model) {
                        modelVal = this.Upgrades[i];
                    }
                }

                // Generate upgrade item data
                const modelList : IFactionUpgrade = {
                    id: modelVal? modelVal.ID : "",
                    cost: parseInt(_cost),
                    cost_id: _costtype                    
                }

                // Create and add Upgrade object
                const ContentNew: FactionUpgrade = new FactionUpgrade((modelList));
                _warband.Upgrades.push(ContentNew);
            } else {
                return ReturnMsg;
            }
        } catch (e) {
            ReturnMsg = "Something went wrong.";
        }

        // If nothing has gone wrong, update the local storage
        if (ReturnMsg == "") {
            this.SetStorage();
        }

        return ReturnMsg;
    }
    
    // ----------------------------------- Warband Creator Functions --------------------------

    /**
     * Creates a new Warband
     * @param _name The name for the new warband
     * @param _faction The faction this warband belongs to
     * @returns A string message, if non-null then something wrong has happened
     */
    public NewWarband(_name : string, _faction : string) {

        let ReturnMsg = "";
        try {
            // Complains if no name was given
            if (_name.trim().length == 0) { ReturnMsg = "Warband name must not be blank." }

            // Complains if no faction was selected
            if (_faction == "" || _faction == "[No Faction Selected]") { ReturnMsg = "Your Warband must have a faction." }
            
            // Complains if another warband shares the same name
            let i = 0;
            for (i = 0; i < this.WarbandList.length ; i++ ) {
                if (this.WarbandList[i].Name.trim() == _name.trim()) {
                    ReturnMsg = "Two Warbands cant share the same name.";
                }
            }

            if (ReturnMsg == "") {

                // Find the faction in the manager's list which matches the provided faction name.
                let factionVal : any = null;
                for (i = 0; i < this.Factions.length ; i++ ) {
                    if (this.Factions[i].Name == _faction) {
                        factionVal = this.Factions[i];
                    }
                }

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

                // Generate faction data
                const _content : IWarband = {
                    id: CalcID(_name.trim()),
                    ducat_total : 0,
                    glory_total : 0,
                    members : [],
                    armoury : [],
                    locations : [],
                    modifiers : [_reroll],
                    name: _name.trim(),
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

                // Create and add Warband
                const ContentNew: Warband = new Warband((_content));
                this.WarbandList.push(ContentNew);
            } else {
                return ReturnMsg;
            }
        } catch (e) {
            ReturnMsg = "File was not in the Warband format.";
        }

        // If nothing has gone wrong, update the local storage
        if (ReturnMsg == "") {
            this.SetStorage();
        }

        return ReturnMsg;
    }

    /**
     * Adds a piece of equipment to a warband's armoury
     * @param _warband The warband being given the eqipment
     * @param _model The name of the equipment piece to add
     * @param _cost How much the equipment cost
     * @param _costtype If the equipment cost Ducats or Glory
     * @returns A string message, if non-null then something wrong has happened
     */
    public NewEquipmentForWarband(_warband : Warband, _model : string, _cost : string, _costtype : string){
        let ReturnMsg = "";
        try {
            // Complains if no equipment was selected
            if (_model == "" || _model == "[No Model Selected]") { ReturnMsg = "Your Item must be one of the available options." }
            
            // Complains if the cost is negative (Free is okay)
            if (_cost == "" || parseInt(_cost) < 0) { ReturnMsg = "Your Item must cost at least 0." }

            let i = 0;
            if (ReturnMsg == "") {

                // Find the equipment in the manager's list which matches the provided equipment name.
                let modelVal : any = null;
                for (i = 0; i < this.Equipment.length ; i++ ) {
                    if (this.Equipment[i].ID == _model) {
                        modelVal = this.Equipment[i];
                    }
                }

                // Generate equipment item data
                const modelList : IListEquipment = {
                    id: modelVal? modelVal.ID : "",
                    cost: parseInt(_cost),
                    cost_type: _costtype                    
                }

                // Create and add Equipment item
                const ContentNew: ListEquipment = new ListEquipment((modelList));
                _warband.Armoury.push(ContentNew);
            } else {
                return ReturnMsg;
            }
        } catch (e) {
            ReturnMsg = "Something went wrong.";
        }

        // If nothing has gone wrong, update the local storage
        if (ReturnMsg == "") {
            this.SetStorage();
        }

        return ReturnMsg;
    }
}

export {WarbandManager}