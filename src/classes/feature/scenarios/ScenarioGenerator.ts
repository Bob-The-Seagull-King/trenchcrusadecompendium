import { IScenario, Scenario } from "./Scenario"
import { Requester } from "../../../factories/Requester";
import { IFactionRuleset } from "../factions/FactionRule";
import { IAdvancedDescription } from "../../AdvancedDescription";

/**
 * Data structure of the scenario
 * (Goal) for a battle.
 */
interface IGenScen {
    id: string,
    name: string,
    restricted_deploy: string[],
    restricted_deeds: string[],
    rules: IFactionRuleset[]
}

/**
 * Data structure of the deployment
 * rules for a battle.
 */
interface IGenDepl {
    id : string,
    image_url : string,
    name : string,
    restricted_deeds: string[],
    removed_rules : string[],
    rules: IFactionRuleset[]
}

/**
 * Data structure of one of the
 * deeds that award glory points
 * in a battle.
 */
interface IGenDeed {
    id: string,
    playerNum: number,
    title: string,
    description: []
}

/**
 * Creates a randomly generated scenario from a list
 * of possible options for objectives, deployment, special
 * rules, and glorious deeds.
 */
class ScenarioGenerator {
    Scenario : Scenario | null = null;

    public constructor() {
        this.UpdateScenario();
    }

    /**
     * Replaces the current scenario with a new
     * randomly generated scenario.
     */
    public UpdateScenario() {
        this.Scenario = this.GenerateScenario();
    }

    /**
     * @returns The current scenario.
     */
    public ReturnScenario() {
        return this.Scenario;
    }

    /**
     * Creates a scenario from combining scenario,
     * deployment, and glorious deed options.
     * @returns A randomly generated scenario object
     */
    public GenerateScenario() {
        // Data to choose from
        const scenarioList : IGenScen[] =  Requester.MakeRequest({searchtype: "file", searchparam: {type: "genScenario"}});
        const deploymentList : IGenDepl[] =  Requester.MakeRequest({searchtype: "file", searchparam: {type: "genDeployment"}});
        const deedList : IGenDeed[] =  Requester.MakeRequest({searchtype: "file", searchparam: {type: "genDeed"}});

        // The final scenario components
        const FinalRules = [];
        const FinalDeeds : IGenDeed[] = [];

        // Limits provided on what options can be chosen
        let i = 0;
        const bannedDeployList: string[] = [];
        const bannedDeedList: string[] = [];
        const removedScenRules: string[] = [];

        // Choose Scenario -----------------------
        const RandomNum = Math.floor(Math.random() * scenarioList.length);
        const ChosenScen = scenarioList[RandomNum];
        
        // Add any restrictions imposed by the scenario
        for (i = 0; i < ChosenScen.restricted_deeds.length; i++) { bannedDeedList.push(ChosenScen.restricted_deeds[i]); }
        for (i = 0; i < ChosenScen.restricted_deploy.length; i++) { bannedDeployList.push(ChosenScen.restricted_deploy[i]); }
        // ---------------------------------------

        // Choose Deployment ---------------------
        // Pick from options not restricted by the scenario
        const FilteredDeployment = deploymentList.filter((value) => (!(bannedDeployList.includes(value.id))))
        const RandomDepNum = Math.floor(Math.random() * FilteredDeployment.length);
        const ChosenDep = FilteredDeployment[RandomDepNum];

        // Add any restrictions imposed by the deployment
        for (i = 0; i < ChosenDep.restricted_deeds.length; i++) {
            bannedDeedList.push(ChosenDep.restricted_deeds[i]);
        }
        
        // Add any rules that the deployment will replace / overrule
        for (i = 0; i < ChosenDep.removed_rules.length; i++) {
            removedScenRules.push(ChosenDep.removed_rules[i]);
        }
        // ---------------------------------------

        // Choose Deeds --------------------------
        // Split deeds not restricted by the 'user' they are associated with
        // playerNum = 0 means it will always appear
        const FilteredDeeds = deedList.filter((value) => (!(bannedDeedList.includes(value.id))))
        const Player0Deeds = FilteredDeeds.filter((value) => (value.playerNum == 0));
        const Player1Deeds = FilteredDeeds.filter((value) => (value.playerNum == 1));
        const Player2Deeds = FilteredDeeds.filter((value) => (value.playerNum == 2));

        const RandomNum0 = Math.floor(Math.random() * (Player0Deeds.length));
        const RandomNum1 = Math.floor(Math.random() * (Player1Deeds.length));
        const RandomNum2 = Math.floor(Math.random() * (Player2Deeds.length));

        // Pick 2 deeds from Player 1 and Player 2 deed lists
        let RandomNumB1 = RandomNum1;
        while (RandomNumB1 == RandomNum1) {
            RandomNumB1 = Math.floor(Math.random() * (Player1Deeds.length));
        }
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

        // Add scenario rules not banned by the deployment type
        for (i = 0; i < ChosenScen.rules.length; i++) {
            if (!(removedScenRules.includes( ChosenScen.rules[i].title))) {
                FinalRules.push(ChosenScen.rules[i]);
            }
        }

        // Add deployment rules
        for (i = 0; i < ChosenDep.rules.length; i++) {FinalRules.push(ChosenDep.rules[i]);  }

        // Add glorious deeds to the list of scenario rules

        const DeedsDesc: IAdvancedDescription[] = [];
        for (i = 0; i < FinalDeeds.length; i ++) {
            let j = 0;
            for (j = 0; j < FinalDeeds[i].description.length; j ++) {
                DeedsDesc.push(FinalDeeds[i].description[j])
            }
        }
        const GloriousDeeds: any = {
            title: "Glorious Deeds",
            description: [
                { tags: [{tag_name: "desc_type", val: "desc"}], content: "Players score one Glory Point for every model that completes any of the following Glorious Deeds. Victory Points for these can only be gained once - whichever player completes them first gets the Glory Points!" },
                { tags: [{tag_name: "desc_type", val: "list"}], content: "", subcontent: DeedsDesc }
            ]
        }
        FinalRules.push(GloriousDeeds);

        // ----------------------------------------------

        // Create Scenario object based on given information
        const IScenario : IScenario = {
            id: "sc_trenchwarfare",
            type: "Scenario",
            source: "generated",
            tags: [],
            image_url: ChosenDep.image_url,
            name: ChosenScen.name + " | " + ChosenDep.name,
            rules : FinalRules,
            widerules: []
        };
        const newScenario = new Scenario(IScenario)

        return newScenario;
    }
}


export {ScenarioGenerator}