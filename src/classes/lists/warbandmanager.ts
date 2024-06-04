import { IWarband, Warband } from './Warband';
import Cookies from 'js-cookie'
import { useWarbandStore } from '../../store/warbands';
import { GrabWarband } from '../../store/warbands';
import { IPlayerFaction, PlayerFaction } from "../../classes/feature/factions/Faction";
import { IPlayerFactionVariant } from "../../classes/feature/factions/FactionVariant";
import { FactionFactory } from "../../factories/features/FactionFactory";
import { FactionVariantFactory } from "../../factories/features/FactionVariantFactory";
import { byPropertiesOf, getColour, sort } from "../../utility/functions";
import { Requester } from "../../factories/Requester";

class WarbandManager {
    WarbandList: Warband[] = [];
    Factions: PlayerFaction[] = [];

    constructor() {
        const ReturnData = GrabWarband();
        this.WarbandList = ReturnData;
        this.FindFactions();
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
            const variantfaction = FactionVariantFactory.CreateFactory(variants[i]);
            this.Factions.push(variantfaction)
        }
    }

    public SetStorage() {
        localStorage.setItem('warbandstorage', JSON.stringify(this.WarbandList));
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
                const _content : IWarband = {
                    id: this.CalcID(_name),
                    ducat_total : 0,
                    glory_total : 0,
                    members : [],
                    armoury : [],
                    name: _name,
                    faction: _faction,
                    flavour: [],
                    notes: [],
                    deeds: [],
                    image: "",
                    ducat_lost : 0,
                    glory_lost : 0
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