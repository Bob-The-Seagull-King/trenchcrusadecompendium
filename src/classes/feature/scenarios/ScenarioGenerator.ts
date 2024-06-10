import { IScenario, Scenario } from "./Scenario"
import { Requester } from "../../../factories/Requester";
import { IFactionRuleset } from "../factions/FactionRule";
import { IModelDescription } from "../models/ModelDescription";

interface IGenScen {
    id: string,
    name: string,
    restricted_deploy: string[],
    restricted_deeds: string[],
    rules: IFactionRuleset[]
}

interface IGenDepl {
    id : string,
    image_url : string,
    name : string,
    restricted_deeds: string[],
    removed_rules : string[],
    rules: IFactionRuleset[]
}

interface IGenDeed {
    id: string,
    playerNum: number,
    title: string,
    description: []
}

class ScenarioGenerator {
    Scenario : Scenario | null = null;

    public constructor() {
        this.Scenario = this.GenerateScenario();
    }

    public UpdateScenario() {
        this.Scenario = this.GenerateScenario();
    }

    public ReturnScenario() {
        return this.Scenario;
    }

    public GenerateScenario() {
        const scenarioList : IGenScen[] =  Requester.MakeRequest({searchtype: "file", searchparam: {type: "genScenario"}});
        const deploymentList : IGenDepl[] =  Requester.MakeRequest({searchtype: "file", searchparam: {type: "genDeployment"}});
        const deedList : IGenDeed[] =  Requester.MakeRequest({searchtype: "file", searchparam: {type: "genDeed"}});
        const FinalRules = [];
        const FinalDeeds : IGenDeed[] = [];

        const bannedDeployList: string[] = [];
        const bannedDeedList: string[] = [];
        const removedScenRules: string[] = [];

        // Choose Scenario -----------------------
        const LengthOfScen = scenarioList.length;
        const RandomNum = Math.floor(Math.random() * LengthOfScen);

        const ChosenScen = scenarioList[RandomNum];

        let i = 0;
        
        for (i = 0; i < ChosenScen.restricted_deeds.length; i++) {
            bannedDeedList.push(ChosenScen.restricted_deeds[i]);
        }
        
        for (i = 0; i < ChosenScen.restricted_deploy.length; i++) {
            bannedDeployList.push(ChosenScen.restricted_deploy[i]);
        }
        // ---------------------------------------

        // Choose Deployment ---------------------
        const FilteredDeployment = deploymentList.filter((value) => (!(bannedDeployList.includes(value.id))))
        const LengthOfDep = FilteredDeployment.length;
        const RandomDepNum = Math.floor(Math.random() * LengthOfDep);

        const ChosenDep = FilteredDeployment[RandomDepNum];
        for (i = 0; i < ChosenDep.restricted_deeds.length; i++) {
            bannedDeedList.push(ChosenDep.restricted_deeds[i]);
        }
        
        for (i = 0; i < ChosenDep.removed_rules.length; i++) {
            removedScenRules.push(ChosenDep.removed_rules[i]);
        }
        // ---------------------------------------

        // Choose Deeds --------------------------
        const FilteredDeeds = deedList.filter((value) => (!(bannedDeedList.includes(value.id))))
        const Player0Deeds = FilteredDeeds.filter((value) => (value.playerNum == 0));
        const Player1Deeds = FilteredDeeds.filter((value) => (value.playerNum == 1));
        const Player2Deeds = FilteredDeeds.filter((value) => (value.playerNum == 2));

        const RandomNum0 = Math.floor(Math.random() * (Player0Deeds.length));
        const RandomNum1 = Math.floor(Math.random() * (Player1Deeds.length));
        let RandomNumB1 = RandomNum1;
        while (RandomNumB1 == RandomNum1) {
            RandomNumB1 = Math.floor(Math.random() * (Player1Deeds.length));
        }
        const RandomNum2 = Math.floor(Math.random() * (Player2Deeds.length));
        let RandomNumB2 = RandomNum2;
        while (RandomNumB2 == RandomNum2) {
            RandomNumB2 = Math.floor(Math.random() * (Player2Deeds.length));
        }
        
        FinalDeeds.push(Player1Deeds[RandomNum1]);
        FinalDeeds.push(Player1Deeds[RandomNumB1]);
        FinalDeeds.push(Player2Deeds[RandomNum2]);
        FinalDeeds.push(Player2Deeds[RandomNumB2]);
        FinalDeeds.push(Player0Deeds[RandomNum0]);
        // -------------------------------------------

        // Form Rules -----------------------------------

        for (i = 0; i < ChosenScen.rules.length; i++) {
            if (!(removedScenRules.includes( ChosenScen.rules[i].title))) {
                FinalRules.push(ChosenScen.rules[i]);
            }
        }

        for (i = 0; i < ChosenDep.rules.length; i++) {
            FinalRules.push(ChosenDep.rules[i]);
        }

                           // Deeds //

        const DeedsDesc: IModelDescription[] = [];

        for (i = 0; i < FinalDeeds.length; i ++) {
            let j = 0;
            for (j = 0; j < FinalDeeds[i].description.length; j ++) {
                DeedsDesc.push(FinalDeeds[i].description[j])
            }
        }

        const GloriousDeeds: any = {
            title: "Glorious Deeds",
            description: [
                {
                    tags: [{tag_name: "desc_type", val: "desc"}],
                    content: "Players score one Glory Point for every model that completes any of the following Glorious Deeds. Victory Points for these can only be gained once - whichever player completes them first gets the Glory Points!",
                    subcontent: [
                    ]
                },
                {
                    tags: [{tag_name: "desc_type", val: "list"}],
                    content: "",
                    subcontent: DeedsDesc
                }
            ]
        }

        FinalRules.push(GloriousDeeds);

        // ----------------------------------------------

        const IScenario : IScenario = {
            id: "sc_trenchwarfare",
            type: "Scenario",
            source: "generated",
            tags: [],
            image_url: ChosenDep.image_url,
            name: ChosenScen.name + " | " + ChosenDep.name,
            rules : FinalRules
        };

        const newScenario = new Scenario(IScenario)

        return newScenario;
    }
}


export {ScenarioGenerator}