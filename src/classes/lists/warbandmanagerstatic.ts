import { Warband } from "./Warband";
import { WarbandMember } from "./WarbandMember";
import { Requester } from "../../factories/Requester";
import { returnModelBase, returnModelArmour, returnModelMovement, returnModelMelee, returnModelRanged, returnComponentsWithTag } from './WarbandMemberStatic';

/**
 * Returns as a string the glory cost of a memebr
 * @param _member The warband member being checked
 * @returns The total glory cost of the model, upgrades, and equipment
 */
export function GetGloryCost(_member : WarbandMember) {
    let totalCost = 0;
    let i = 0;

    if (_member.Model.CostType == "glory") { totalCost += _member.Model.Cost; }

    for (i = 0; i < _member.Equipment.length; i++) {
        if (_member.Equipment[i].CostType == "glory") { totalCost += _member.Equipment[i].Cost; }
    }
    for (i = 0; i < _member.Upgrades.length; i++) {
        if (_member.Upgrades[i].CostID == "glory") { totalCost += _member.Upgrades[i].Cost; }
    }

    return totalCost.toString()
}

/**
 * Returns as a string the ducat cost of a memebr
 * @param _member The warband member being checked
 * @returns The total ducat cost of the model, upgrades, and equipment
 */
export function GetDucatCost(_member : WarbandMember) {
    let totalCost = 0;
    let i = 0;

    if (_member.Model.CostType == "ducats") { totalCost += _member.Model.Cost; }

    for (i = 0; i < _member.Equipment.length; i++) {
        if (_member.Equipment[i].CostType == "ducats") { totalCost += _member.Equipment[i].Cost; }
    }
    for (i = 0; i < _member.Upgrades.length; i++) {
        if (_member.Upgrades[i].CostID == "ducats") { totalCost += _member.Upgrades[i].Cost; }
    }

    return totalCost.toString()
}

/**
 * Returns the total ducat cost of the warband and
 * all of its members.
 * @param _band  The warband being checked
 * @returns The total cost of the warband, the armoury,
 * all models, and any lost or sold off.
 */
export function TotalCostDucats(_band : Warband) {
    // !!! Don't count lost ducats on total ducats
    // let totalducats = _band.DucatLost;
    let totalducats = 0;
    let i = 0;
    
    // !!! Dont include the Armoury in the ducat threshold
    // for (i = 0; i < _band.Armoury.length ; i++) {
    //     if (_band.Armoury[i].CostType == "ducats") { totalducats += _band.Armoury[i].Cost; }
    // }
    for (i = 0; i < _band.Members.length ; i++) { 
        if (_band.Members[i].Reserve != true) {
            totalducats += Number(GetDucatCost(_band.Members[i]))
        }
    }

    return totalducats;
}

/**
 * Returns the total glory cost of the warband and
 * all of its members.
 * @param _band  The warband being checked
 * @returns The total cost of the warband, the armoury,
 * all models, and any lost or sold off.
 */
export function TotalCostGlory(_band : Warband) {
    let totalglory = _band.GloryLost;
    let i = 0;
    
    for (i = 0; i < _band.Armoury.length ; i++) {
        if (_band.Armoury[i].CostType == "glory") { totalglory += _band.Armoury[i].Cost; }
    }
    for (i = 0; i < _band.Members.length ; i++) {
        totalglory += Number(GetGloryCost(_band.Members[i]))
    }

    return totalglory;
}

/**
 * Takes a warband and produces a text representation of it
 * for use in sharing/showing off.
 * @param _warband The warband being exported
 * @param _notes If any additional notes exist
 * @returns Text string representing the export
 */
export function ExportDisplayText(_warband : Warband, _notes : boolean) {
    let returnRow = ""; // This will be added to to generate the text representation

    // First row + warband header
    const StartingRow = " " + _warband.Name + " | " + _warband.Faction.Name + " "
    const startrowlength = StartingRow.length;
    returnRow += ("```" + "\n") + ("-".repeat(10)) + StartingRow + ("-".repeat(90-((startrowlength < 90)? startrowlength : 0)));

    // Add notes below the first row if requested
    if (_notes) {
        if (_warband.Notes.trim().length > 0){
            returnRow += "\n" + "[ NOTES ]" + "\n" + _warband.Notes + "\n"
        }
    }

    // -------------------------------- Warband Costs -------------------------------

    // Get base phrases for the total and spent of each cost type
    const ducatTotal = "Total : " + _warband.DucatTotal.toString();
    const ducatCost = "Spent : " + TotalCostDucats( _warband).toString() + " (" + _warband.DucatLost.toString() + " Lost)";
    const gloryTotal = "Total : " + _warband.GloryTotal.toString();
    const gloryCost = "Spent : " + TotalCostGlory(_warband).toString() + " (" + _warband.GloryCost.toString() + " Lost)";

    // Determine the length of the two rows
    const totalRow = (ducatTotal.length > gloryTotal.length)? ducatTotal.length : gloryTotal.length;
    const costRow = (ducatCost.length > gloryCost.length)? ducatCost.length : gloryCost.length;

    // Create and append the rows for the warband's ducat and glory cost
    const DucatRow = ducatTotal + (" ".repeat(((totalRow - ducatTotal.length) > 0)? totalRow - ducatTotal.length : 0)) + " | " + ducatCost + (" ".repeat(((costRow - ducatCost.length) > 0)? costRow - ducatCost.length : 0)) + " | Available : " + (_warband.DucatTotal - TotalCostDucats(_warband)).toString()
    const GloryRow = gloryTotal + (" ".repeat(((totalRow - gloryTotal.length) > 0)? totalRow - gloryTotal.length : 0)) + " | " + gloryCost + (" ".repeat(((costRow - gloryCost.length) > 0)? costRow - gloryCost.length : 0)) + " | Available : " + (_warband.GloryTotal - TotalCostGlory(_warband)).toString()
    returnRow += "\n" + "[ DUCATS ]" + "\n" + DucatRow + "\n" + "[ GLORY ]" + "\n" + GloryRow + "\n"

    // ------------------------------------------------------------------------------

    // ------------------------------- Warband Armoury ------------------------------

    // Initialize Variables and Arrays
    let lengthMarker = 0;
    let i = 0;
    let lengthCheckEquip = 0;
    const RangedSet = [];
    const MeleeSet = [];
    const ArmourSet = [];
    const MiscSet = [];

    // Intro Row
    if (_warband.Armoury.length > 0) {
        returnRow += "\n" + "[ ARMOURY ]"
    }

    // Find the longest possible armoury row for column alignment
    for (i = 0 ; i < _warband.Armoury.length ; i ++) {
        if (_warband.Armoury[i].Object.Name.length > lengthMarker) {
            lengthMarker = _warband.Armoury[i].Object.Name.length;
        }
    }

    // Add the row for each type of equipment, fully formatted including alignment
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

    // Append rows for Ranged equipment
    if (RangedSet.length > 0) {
        returnRow += "\n" + "- RANGED"
        for (i = 0; i < RangedSet.length; i++) {
            returnRow += "\n" + "  " + RangedSet[i]
        }
    }

    // Append rows for Melee equipment
    if (MeleeSet.length > 0) {
        returnRow += "\n" + "- MELEE"
        for (i = 0; i < MeleeSet.length; i++) {
            returnRow += "\n" + "  " + MeleeSet[i]
        }
    }

    // Append rows for Armour equipment
    if (ArmourSet.length > 0) {
        returnRow += "\n" + "- ARMOUR"
        for (i = 0; i < ArmourSet.length; i++) {
            returnRow += "\n" + "  " + ArmourSet[i]
        }
    }

    // Append rows for Equipment equipment
    if (MiscSet.length > 0) {
        returnRow += "\n" + "- MISC"
        for (i = 0; i < MiscSet.length; i++) {
            returnRow += "\n" + "  " + MiscSet[i]
        }
    }

    // ------------------------------------------------------------------------------
    
    // ------------------------------- Warband Members ------------------------------

    // Add the text description for each Elite member
    returnRow += "\n" + "\n" + "[ ELITE MEMBERS ]"
    for (i = 0; i < _warband.Members.length; i ++) {
        if (_warband.Members[i].Elite) {
            returnRow += "\n" + "\n" + ExportModelDisplayText(_warband.Members[i], _notes, true);
        }
    }

    // Add the text description for each Infantry member
    returnRow += "\n" + "\n" + "[ INFANTRY ]"
    for (i = 0; i < _warband.Members.length; i ++) {
        if (!(_warband.Members[i].Elite)) {
            returnRow += "\n" + "\n" + ExportModelDisplayText(_warband.Members[i], _notes, true);
        }
    }

    // ------------------------------------------------------------------------------
    
    // ------------------------------ Warband Locations -----------------------------

    // Add formatted text for each piece of equipment to array
    const Locations = [];
    for (i = 0 ; i < _warband.Locations.length ; i ++) {
        Locations.push((_warband.Locations[i].name));
    }

    // Append equipment text
    if (Locations.length > 0) {
        returnRow += "\n" + "\n" + "[ LOCATIONS FOUND ]"
        for (i = 0; i < Locations.length; i++) { returnRow += "\n" + "  " + Locations[i] }
        returnRow += "\n";
    }

    // ------------------------------------------------------------------------------
    
    // ----------------------------- Warband Explore Mods ---------------------------

    // Add formatted text for each piece of equipment to array
    const Modifiers = [];
    for (i = 0 ; i < _warband.Modifiers.length ; i ++) {
        Modifiers.push((_warband.Modifiers[i].name));
    }

    // Append equipment text
    if (Modifiers.length > 0) {
        returnRow += "\n" + "\n" + "[ EXPLORATION MODIFIERS ]"
        for (i = 0; i < Modifiers.length; i++) { returnRow += "\n" + "  " + Modifiers[i] }
        returnRow += "\n";
    }

    // ------------------------------------------------------------------------------

    // Add final row and return
    returnRow += "\n" + "\n" + ("-".repeat(100)) + ("\n" + "```")

    return returnRow;
}

/**
 * Takes a warband and produces a text representation of it
 * for use in sharing/showing off with minimal characters.
 * @param _warband The warband being exported
 * @param _notes If any additional notes exist
 * @returns Text string representing the export
 */
export function ExportDisplayTextBasic(_warband : Warband, _notes : boolean) {
    let returnRow = ""; // This will be added to to generate the text representation
    let i = 0;

    // First row + warband header
    const StartingRow = " " + _warband.Name + " | " + _warband.Faction.Name + " "
    const startrowlength = StartingRow.length;
    returnRow += ("```" + "\n") + StartingRow;

    // ------------------------------- Warband Costs --------------------------------

    // Get base phrases for the total and spent of each cost type
    const ducatTotal = "Total : " + _warband.DucatTotal.toString();
    const ducatCost = "Spent : " + TotalCostDucats( _warband).toString() + " (" + _warband.DucatLost.toString() + " Lost)";
    const gloryTotal = "Total : " + _warband.GloryTotal.toString();
    const gloryCost = "Spent : " + TotalCostGlory(_warband).toString() + " (" + _warband.GloryCost.toString() + " Lost)";

    // Determine the length of the two rows
    const totalRow = (ducatTotal.length > gloryTotal.length)? ducatTotal.length : gloryTotal.length;
    const costRow = (ducatCost.length > gloryCost.length)? ducatCost.length : gloryCost.length;

    // Create and append the rows for the warband's ducat and glory cost
    const DucatRow = ducatTotal + (" ".repeat(((totalRow - ducatTotal.length) > 0)? totalRow - ducatTotal.length : 0)) + " | " + ducatCost + (" ".repeat(((costRow - ducatCost.length) > 0)? costRow - ducatCost.length : 0)) + " | Available : " + (_warband.DucatTotal - TotalCostDucats(_warband)).toString()
    const GloryRow = gloryTotal + (" ".repeat(((totalRow - gloryTotal.length) > 0)? totalRow - gloryTotal.length : 0)) + " | " + gloryCost + (" ".repeat(((costRow - gloryCost.length) > 0)? costRow - gloryCost.length : 0)) + " | Available : " + (_warband.GloryTotal - TotalCostGlory(_warband)).toString()
    returnRow += "\n" + "[ DUCATS ] " + DucatRow + "\n" + "[ GLORY ] " + GloryRow;

    // ------------------------------------------------------------------------------

    // ------------------------------- Warband Armoury ------------------------------

    // Add formatted text for each piece of equipment to array
    const Equipment = [];
    for (i = 0 ; i < _warband.Armoury.length ; i ++) {
        Equipment.push((_warband.Armoury[i].Object.Name? _warband.Armoury[i].Object.Name : "") + " ( " + _warband.Armoury[i].Cost.toString() + " " + _warband.Armoury[i].CostType + " )");
    }

    // Append equipment text
    if (Equipment.length > 0) {
        returnRow += "\n" + "\n" + "[ ARMOURY ]"
        for (i = 0; i < Equipment.length; i++) { returnRow += "\n" + "  " + Equipment[i] }
        returnRow += "\n";
    }

    // ------------------------------------------------------------------------------

    // ------------------------------- Warband Members ------------------------------

    // Add the text description for each Elite member
    if (_warband.Members.filter((value) => (value.Elite == true)).length > 0) { returnRow += "\n" + "[ ELITE MEMBERS ]" }
    for (i = 0; i < _warband.Members.length; i ++) {
        if (_warband.Members[i].Elite) {
            returnRow +=  "\n" + ExportModelDisplayTextBasic(_warband.Members[i], _notes, true);
        }
    }

    // Add the text description for each Infantry member
    if (_warband.Members.filter((value) => (value.Elite != true)).length > 0) { returnRow += "\n" + "[ INFANTRY ]" }
    for (i = 0; i < _warband.Members.length; i ++) {
        if (!(_warband.Members[i].Elite)) {
            returnRow +=  "\n" + ExportModelDisplayTextBasic(_warband.Members[i], _notes, true);
        }
    }

    // ------------------------------------------------------------------------------

    // ------------------------------ Warband Locations -----------------------------

    // Add formatted text for each piece of equipment to array
    const Locations = [];
    for (i = 0 ; i < _warband.Locations.length ; i ++) {
        Locations.push((_warband.Locations[i].name));
    }

    // Append equipment text
    if (Locations.length > 0) {
        returnRow += "\n" + "\n" + "[ LOCATIONS FOUND ]"
        for (i = 0; i < Locations.length; i++) { returnRow += "\n" + "  " + Locations[i] }
        returnRow += "\n";
    }

    // ------------------------------------------------------------------------------
    
    // ----------------------------- Warband Explore Mods ---------------------------

    // Add formatted text for each piece of equipment to array
    const Modifiers = [];
    for (i = 0 ; i < _warband.Modifiers.length ; i ++) {
        Modifiers.push((_warband.Modifiers[i].name));
    }

    // Append equipment text
    if (Modifiers.length > 0) {
        returnRow += "\n" + "\n" + "[ EXPLORATION MODIFIERS ]"
        for (i = 0; i < Modifiers.length; i++) { returnRow += "\n" + "  " + Modifiers[i] }
        returnRow += "\n";
    }

    // ------------------------------------------------------------------------------

    // Add final row and return
    returnRow += "\n" + "\n" + ("\n" + "```")

    return returnRow;
}

/**
 * Takes a model and produces a text representation of it
 * for use in sharing/showing off.
 * @param _model The model being exported
 * @param _notes If any additional notes exist
 * @param _inside If this export is inside a warband export or on its own
 * @returns Text string representing the export
 */
export function ExportModelDisplayText(_model : WarbandMember, _notes : boolean, _inside : boolean) {

    // First row
    const StartingRow = _model.Name + " | " + (GetDucatCost(_model) + " ducats") + " | " + (GetGloryCost(_model) + " glory")
    
    // Find the longest piece of text in the equipment options for column alignment
    let lengthMarker = _model.Model.Object.Name? _model.Model.Object.Name?.length : 0;
    let rowMarker = StartingRow.length + 8;
    let i = 0;
    for (i = 0 ; i < _model.Equipment.length ; i ++) {
        if (_model.Equipment[i].Object.Name.length > lengthMarker) {
            lengthMarker = _model.Equipment[i].Object.Name.length;
        }
    }

    // ---------------------------- Member Upgrades ---------------------------------

    const UpgradeSet = [];
    let upgradelengthcheck = 0

    // Add upgrade text to array
    for (i = 0 ; i < _model.Upgrades.length ; i ++) {
        upgradelengthcheck = lengthMarker-((_model.Upgrades[i].Name? _model.Upgrades[i].Name : "").length)
        UpgradeSet.push((_model.Upgrades[i].Name? _model.Upgrades[i].Name : "") + (" ".repeat((upgradelengthcheck > 0)? upgradelengthcheck : 0)) + " | " + _model.Upgrades[i].Cost.toString() + " " + _model.Upgrades[i].CostID);
    }

    // ------------------------------------------------------------------------------

    // ---------------------------- Member Equipment --------------------------------

    let equiplengthcheck = 0
    const RangedSet = [];
    const MeleeSet = [];
    const ArmourSet = [];
    const MiscSet = [];
    
    // Add equipment text to arrays
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

    // ------------------------------------------------------------------------------
    
    // ------------------------ Calculate Row Length --------------------------------

    const modelLengthCheck = lengthMarker-((_model.Model.Object.Name? _model.Model.Object.Name : "").length)
    const ModelRow = (_model.Model.Object.Name? _model.Model.Object.Name : "") + (" ".repeat((modelLengthCheck > 0)? modelLengthCheck : 0)) + " | " + _model.Model.Cost.toString() + " " + _model.Model.CostType;
    if (ModelRow.length > rowMarker) {
        rowMarker = ModelRow.length + 1;
    }

    // Check upgrade lengths for column alignment
    for (i = 0; i < UpgradeSet.length; i ++) {
        if (UpgradeSet[i].length > rowMarker) {
            rowMarker = UpgradeSet[i].length;
        }
    }

    // Check equipment lengths for column alignment
    for (i = 0; i < RangedSet.length; i ++) {
        if (RangedSet[i].length > rowMarker) { rowMarker = RangedSet[i].length; }
    }
    for (i = 0; i < MeleeSet.length; i ++) {
        if (MeleeSet[i].length > rowMarker) { rowMarker = MeleeSet[i].length; }
    }
    for (i = 0; i < ArmourSet.length; i ++) {
        if (ArmourSet[i].length > rowMarker) { rowMarker = ArmourSet[i].length; }
    }
    for (i = 0; i < MiscSet.length; i ++) {
        if (MiscSet[i].length > rowMarker) { rowMarker = MiscSet[i].length; }
    }

    if (rowMarker % 2 == 1) {
        rowMarker += 1;
    }

    // ------------------------------------------------------------------------------

    // ------------------------ Generate Text ---------------------------------------

    const rowMarkerDiv = (rowMarker - StartingRow.length - 2)/2
    const FirstRow = ("-".repeat((rowMarkerDiv > 0)? rowMarkerDiv : 0)) + " " + StartingRow + " " + ("-".repeat((rowMarkerDiv > 0)? rowMarkerDiv : 0))
    const LastRow = ("-".repeat(rowMarker))

    // Add discord-friendly comment block characters if needed
    let returnString = (_inside? "" : ("```" + ("\n"))  )

    // Starting row
    returnString += (FirstRow + "\n" +  "[ MODEL ]" + "\n" + "  " + ModelRow )
    
    // Add notes if requested
    if (_notes) {
        if (_model.Notes.trim().length > 0) {
            returnString += "\n" + "[ NOTES ]" + "\n" + _model.Notes
        }
    }

    // Add upgrades if some exist
    if (UpgradeSet.length > 0) {
        returnString += "\n" + "[ UPGRADES ]"
        for (i = 0; i < UpgradeSet.length; i++) {
            returnString += "\n" + "  " + UpgradeSet[i]
        }
    }

    // Add equipment if some exists
    if ((RangedSet.length > 0) || (MeleeSet.length > 0) || (ArmourSet.length > 0) || (MiscSet.length > 0)) {
        returnString += "\n" + "[ EQUIPMENT ]"
    }

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

    // Add skills if some exist
    if (_model.Skills.length > 0) {
        returnString += "\n" + "[ SKILLS ]" + "\n" + "Experience : " + _model.Experience;
        for (i = 0; i < _model.Skills.length; i++) {
            returnString += "\n" + "  " +  _model.Skills[i].name;
        }
    }

    // Add injuries if some exist
    if (_model.Injuries.length > 0) {
        returnString += "\n" + "[ INJURIES ]" + "\n" + "Scars : " + _model.Injuries.length;
        
        for (i = 0; i < _model.Injuries.length; i++) {
            returnString += "\n" + "  " + _model.Injuries[i].Name;
        }
    }

    // Add final row
    returnString += "\n" + LastRow + (_inside? "" : ("\n" + "```"))
    
    // ------------------------------------------------------------------------------

    return returnString
}

/**
 * Takes a model and produces a text representation of it
 * for use in sharing/showing off with minimal characters.
 * @param _model The model being exported
 * @param _notes If any additional notes exist
 * @param _inside If this export is inside a warband export or on its own
 * @returns Text string representing the export
 */
export function ExportModelDisplayTextBasic(_model : WarbandMember, _notes : boolean, _inside : boolean) {
    let i = 0;

    // Initial row
    const StartingRow = _model.Name + " | " + _model.Model.Object.Name + " | " + (GetDucatCost(_model) + " ducats") + " " + (GetGloryCost(_model) + " glory")
    
    // ---------------------------- Member Information ------------------------------

    const Equipment = [];
    const Upgrades = [];
    
    // Gather all equipment items
    for (i = 0 ; i < _model.Equipment.length ; i ++) {
        Equipment.push((_model.Equipment[i].Object.Name? _model.Equipment[i].Object.Name : "") + " (" + _model.Equipment[i].Cost.toString() + " " + _model.Equipment[i].CostType + ")");
    }
    
    // Gather all upgrades
    for (i = 0 ; i < _model.Upgrades.length ; i ++) {
        Upgrades.push((_model.Upgrades[i].Name? _model.Upgrades[i].Name : "") + " (" + _model.Upgrades[i].Cost.toString() + " " + _model.Upgrades[i].CostID + ")");
    }
    
    // ------------------------------------------------------------------------------

    // ------------------------ Calculate Row Length --------------------------------

    let rowMarker = StartingRow.length + 8;

    // Find the longest upgrade/equipment for alignment
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

    if (rowMarker % 2 == 1) {  rowMarker += 1; }
    
    // ------------------------------------------------------------------------------

    // ------------------------ Generate Text ---------------------------------------

    const rowMarkerDiv = (rowMarker - StartingRow.length - 2)/2
    const FirstRow = " " + StartingRow + " " + ("-".repeat((rowMarkerDiv > 0)? rowMarkerDiv : 0))
    const LastRow = ("")

    // Add discord-friendly comment block characters if needed
    let returnString = (_inside? "" : ("```" + ("\n"))  )

    // Starting Row
    returnString += (FirstRow)

    // Add any upgrades
    if (Upgrades.length > 0) {
        returnString += "\n" + "[ UPGRADES ]"
        for (i = 0; i < Upgrades.length; i++) {
            returnString += "\n" + "-" + Upgrades[i]
        }
    }

    // Add any equipment
    if (Equipment.length > 0) {
        returnString += "\n" + "[ EQUIPMENT ]"
        for (i = 0; i < Equipment.length; i++) {
            returnString += "\n" + "-" + Equipment[i]
        }
    }

    // Add any skills
    if (_model.Skills.length > 0) {
        returnString += "\n" + "[ SKILLS ]" + " (" + _model.Experience + " Experience)";
        for (i = 0; i < _model.Skills.length; i++) {
            returnString += "\n" + "-" +  _model.Skills[i].name;
        }
    }

    // Add any injuries
    if (_model.Injuries.length > 0) {
        returnString += "\n" + "[ INJURIES ]" + " (" +  _model.Injuries.length + " Scars)";
        
        for (i = 0; i < _model.Injuries.length; i++) {
            returnString += "\n" + "-" + _model.Injuries[i].Name;
        }
    }

    // Final row
    returnString += "\n" + LastRow + (_inside? "" : ("\n" + "```"))
    
    // ------------------------------------------------------------------------------

    return returnString
}

/**
 * Takes a model and produces a text representation of it
 * for use in Tabletop Simulator.
 * @param _model The model being exported
 * @param _notes If any additional notes exist
 * @param _inside If this export is inside a warband export or on its own
 * @returns Text string representing the export
 */
export function ExportModelDisplayTextTTS(_model: WarbandMember, _notes: boolean, _inside: boolean) {
    // console.log(JSON.stringify(_model))

    // TTS Name row
    const NameRow = '+++ [b]' + _model.Name + '[/b] +++'

    // TTS Description Row
    let StartingRow = '[9926A6][b]' + (_model.Model.Object.Name ? _model.Model.Object.Name : '') + '[/b][-]'
    let i = 0
    let n = 0

    if (_model.Model.Object.Tags && _model.Model.Object.Tags.length > 1) {
        StartingRow += ' ('
        for (i = 1; _model.Model.Object.Tags && _model.Model.Object.Tags.length > i; i++) {
            StartingRow += _model.Model.Object.Tags?.[i].tag_name.toUpperCase()
            if (_model.Model.Object.Tags && _model.Model.Object.Tags.length > i + 1) StartingRow += ', '
            else StartingRow += ')'
        }
    }

    let StatsRow = ''
    StatsRow += '[FFC800][b]Mov.[/b] ' + returnModelMovement(_model) + '[-] | '
    StatsRow += '[44BA26][b]Armor[/b] ' + returnModelArmour(_model) + '[-] | '
    StatsRow += '[DB162F][b]Melee[/b] ' + returnModelMelee(_model) + '[-] | '
    StatsRow += '[3185FC][b]Ranged[/b] ' + returnModelRanged(_model) + '[-]'
    

    // ---------------------------- Member Upgrades / Equipment ----------------------

    const AbilitiesSet = []
    const EquipmentSet = []
    const UpgradeSet = []
    const ArmourSet = []
    const RangedSet = []
    const MeleeSet = []
    const MiscSet = []
    let DescText = ''
    let TempItem
    let TempDesc
    let Ability

    // Add Abilities to array
    for (i = 0; _model.Model.Object.Abilities.length > i; i++) {
        Ability = Requester.MakeRequest({ searchtype: 'id', searchparam: { type: 'addons', id: _model.Model.Object.Abilities[i].Content } })
        if (Ability.description != undefined) {
            DescText = '[9926A6][b]' + (Ability.name ? Ability.name : '') + '[/b][-]'
            if (Ability.description.length == 1) {
                DescText += '\n' + Ability.description[0].content
            } else if (Ability.description.length == 2 && Ability.description[1].tags[0].val == 'list') {
                DescText += '\n' + Ability.description[0].content
                for (n = 0; Ability.description[1].subcontent.length > n; n++) {
                    DescText += '\n' + '+ ' + '[u]' + Ability.description[1].subcontent[n].content + '[/u]'
                    DescText += ' ' + Ability.description[1].subcontent[n].subcontent[0].content
                }
            } else
                for (n = 0; Ability.description.length > n; n++) {
                    DescText += '\n' + (Ability.description.length == 1 ? '' : '+ ') + Ability.description[n].content
                }
            AbilitiesSet.push(DescText)
        }
    }

    // Add Integrated Equipment to array
    for (i = 1; _model.Model.Object.Equipment.length > i; i++) {
        Ability = Requester.MakeRequest({ searchtype: 'id', searchparam: { type: 'addons', id: _model.Model.Object.Equipment[i].Content } })
        if (Ability.description != undefined) {
            DescText = '[FFC800][b]' + (Ability.name ? Ability.name : '') + '[/b][-]'
            if (Ability.description.length == 1) {
                DescText += '\n' + Ability.description[0].content
            } else if (Ability.description.length == 2 && Ability.description[1].tags[0].val == 'list') {
                DescText += '\n' + Ability.description[0].content
                for (n = 0; Ability.description[1].subcontent.length > n; n++) {
                    DescText += '\n' + '+ ' + '[u]' + Ability.description[1].subcontent[n].content + '[/u]'
                    DescText += ' ' + Ability.description[1].subcontent[n].subcontent[0].content
                }
            } else
                for (n = 0; Ability.description.length > n; n++) {
                    DescText += '\n' + (Ability.description.length == 1 ? '' : '+ ') + Ability.description[n].content
                }
            EquipmentSet.push(DescText)
        }
    }

    // Add upgrade text to array
    for (i = 0; i < _model.Upgrades.length; i++) {
        DescText = '[44BA26][b]' + (_model.Upgrades[i].Name ? _model.Upgrades[i].Name : '') + '[/b][-]'
        if (_model.Upgrades[i].Description.length == 1) {
            DescText += '\n' + _model.Upgrades[i].Description[0].Content
        }
        // if (_model.Upgrades[i].Description.length > 1) {
        //     DescText += ': '
        //     for (n = 0; n < _model.Upgrades[i].Description.length; n++) {
        //         DescText += '\n' + '+ ' + _model.Upgrades[i].Description[n].Content
        //     }
        // }
        UpgradeSet.push(DescText)
    }

    // Add equipment text to arrays
    for (i = 0; i < _model.Equipment.length; i++) {
        DescText = ''
        TempItem = _model.Equipment[i].Object
        if (TempItem.Category == 'ranged' || TempItem.Category == 'melee') {
            DescText += ' (' + (TempItem.EquipType ? TempItem.EquipType : '')
            DescText += ', ' + (TempItem.Range ? TempItem.Range : '')
            for (n = 0; n < TempItem.Modifiers.length; n++) {
                DescText += ', ' + (TempItem.Modifiers[n] ? TempItem.Modifiers[n] : '')
            }
            for (n = 0; TempItem.Tags && TempItem.Tags.length > n; n++) {
                DescText += ', ' + (TempItem.Tags[n].tag_name ? TempItem.Tags[n].tag_name.toUpperCase() : '')
            }
            DescText += ')'
        }
        if  (TempItem.Category == 'equipment') {
            if (TempItem.Tags && TempItem.Tags.length > 0) {
                DescText += ' (' 
                for (n = 0; TempItem.Tags && TempItem.Tags.length > n; n++) {
                    if (n>0) DescText += ', '
                    DescText += TempItem.Tags[n].tag_name ? TempItem.Tags[n].tag_name.toUpperCase() : ''
                }
                DescText += ')'
            }
        }
        if (TempItem.Description && TempItem.Description.length > 0) {
            for (n = 0; TempItem.Description && TempItem.Description.length > n; n++) {
                TempDesc = TempItem.Description[n]
                if (TempDesc.Tags && TempDesc.Tags[0].val == 'desc') {
                    DescText += '\n' + (TempItem.Description.length == 1 ? '' : '+ ') + TempDesc.Content
                }
                if (TempDesc.Tags && TempDesc.Tags[0].val == 'effect') {
                    DescText += '\n' + (TempItem.Description.length == 1 ? '' : '+ ') + TempDesc.SubContent[0].Content
                }
            }
        }
        if (TempItem.Category == 'ranged') {
            RangedSet.push('[3185FC][b]' + (TempItem.Name ? TempItem.Name : '') + '[/b][-]' + DescText)
        }
        if (TempItem.Category == 'melee') {
            MeleeSet.push('[DB162F][b]' + (TempItem.Name ? TempItem.Name : '') + '[/b][-]' + DescText)
        }
        if (TempItem.Category == 'armour') {
            ArmourSet.push('[44BA26][b]' + (TempItem.Name ? TempItem.Name : '') + '[/b][-]' + DescText)
        }
        if (TempItem.Category == 'equipment') {
            MiscSet.push('[FFC800][b]' + (TempItem.Name ? TempItem.Name : '') + '[/b][-]' + DescText)
        }
    }
    // ------------------------------------------------------------------------------

    // ------------------------ Generate Text ---------------------------------------

    // Add discord-friendly comment block characters if needed
    let returnString = ''

    // Starting row
    returnString += NameRow + '\n' + StartingRow + '\n' + StatsRow + '\n'

    // Add abilities/upgrades/equipment if some exist

    if (UpgradeSet.length > 0) {
        returnString += ''
        for (i = 0; i < UpgradeSet.length; i++) {
            returnString += '\n' + UpgradeSet[i]
        }
    }
    if (AbilitiesSet.length > 0) {
        returnString += ''
        for (i = 0; i < AbilitiesSet.length; i++) {
            returnString += '\n' + AbilitiesSet[i]
        }
    }
    if (EquipmentSet.length > 0) {
        returnString += ''
        for (i = 0; i < EquipmentSet.length; i++) {
            returnString += '\n' + EquipmentSet[i]
        }
    }
    if (ArmourSet.length > 0) {
        returnString += ''
        for (i = 0; i < ArmourSet.length; i++) {
            returnString += '\n' + ArmourSet[i]
        }
    }
    if (RangedSet.length > 0) {
        returnString += ''
        for (i = 0; i < RangedSet.length; i++) {
            returnString += '\n' + RangedSet[i]
        }
    }
    if (MeleeSet.length > 0) {
        returnString += ''
        for (i = 0; i < MeleeSet.length; i++) {
            returnString += '\n' + MeleeSet[i]
        }
    }
    if (MiscSet.length > 0) {
        returnString += ''
        for (i = 0; i < MiscSet.length; i++) {
            returnString += '\n' + MiscSet[i]
        }
    }

    // Add skills if some exist
    if (_model.Skills.length > 0) {
        returnString += '\n' + '+++ SKILLS +++'
        for (i = 0; i < _model.Skills.length; i++) {
            returnString += '\n' + '+ ' + '[00C2D1]' + _model.Skills[i].name + ':[-] ' + _model.Skills[i].description[0].content
        }
    }

    // Add injuries if some exist
    if (_model.Injuries.length > 0) {
        returnString += '\n' + '+++ INJURIES +++'

        for (i = 0; i < _model.Injuries.length; i++) {
            returnString += '\n' + '+ ' + '[DB162F]' + _model.Injuries[i].Name + ':[-] ' + _model.Injuries[i].Description[0].Content
        }
    }

    // Add notes if requested
    if (_notes) {
        if (_model.Notes.trim().length > 0) {
            returnString += '\n' + '+++ NOTES +++' + '\n' + _model.Notes
        }
    }

    // Add final row
    returnString += ''
    // ------------------------------------------------------------------------------

    return returnString
}

/**
 * Takes a model and produces a text representation of it
 * for use in Tabletop Simulator.
 * @param _model The model being exported
 * @param _notes If any additional notes exist
 * @param _inside If this export is inside a warband export or on its own
 * @returns Text string representing the export
 */
export function ExportModelDisplayShortTextTTS(_model: WarbandMember, _notes: boolean, _inside: boolean) {

    // TTS Name row
    const NameRow = '+++ [b]' + _model.Name + '[/b] +++'

    // TTS Description Row
    let StartingRow = '[9926A6][b]' + (_model.Model.Object.Name ? _model.Model.Object.Name : '') + '[/b][-]'
    let i = 0
    let n = 0

    if (_model.Model.Object.Tags && _model.Model.Object.Tags.length > 1) {
        StartingRow += ' ('
        for (i = 0; _model.Model.Object.Tags && _model.Model.Object.Tags.length > i; i++) {
            StartingRow += _model.Model.Object.Tags?.[i].tag_name.toUpperCase()
            if (_model.Model.Object.Tags && _model.Model.Object.Tags.length > i + 1) StartingRow += ', '
            else StartingRow += ')'
        }
    }

    let StatsRow = ''
    

    // StatsRow += '[FFC800][b]Base[/b] ' + returnModelBase(_model) + '[-] | '
    // StatsRow += '[FFC800][b]Ducat[/b] ' + GetDucatCost(_model) + '[-] | '
    // StatsRow += '[FFC800][b]Glory[/b] ' + GetGloryCost(_model) + '[-]\n'
    StatsRow += '[FFC800][b]Mov.[/b] ' + returnModelMovement(_model) + '[-] | '
    StatsRow += '[44BA26][b]Armor[/b] ' + returnModelArmour(_model) + '[-]\n'
    StatsRow += '[DB162F][b]Melee[/b] ' + returnModelMelee(_model) + '[-] | '
    StatsRow += '[3185FC][b]Ranged[/b] ' + returnModelRanged(_model) + '[-]\n'

    // ---------------------------- Member Upgrades / Equipment ----------------------

    const AbilitiesSet = []
    const EquipmentSet = []
    const UpgradeSet = []
    const ArmourSet = []
    const RangedSet = []
    const MeleeSet = []
    const MiscSet = []
    let DescText = ''
    let TempItem
    let TempDesc
    let Ability

    // Add Abilities to array
    for (i = 0; _model.Model.Object.Abilities.length > i; i++) {
        Ability = Requester.MakeRequest({ searchtype: 'id', searchparam: { type: 'addons', id: _model.Model.Object.Abilities[i].Content } })
        if (Ability.description != undefined) {
            DescText = '[9926A6][b]' + (Ability.name ? Ability.name : '') + '[/b][-]'
            AbilitiesSet.push(DescText)
        }
    }

    // Add Integrated Equipment to array
    for (i = 1; _model.Model.Object.Equipment.length > i; i++) {
        Ability = Requester.MakeRequest({ searchtype: 'id', searchparam: { type: 'addons', id: _model.Model.Object.Equipment[i].Content } })
        if (Ability.description != undefined) {
            DescText = '[FFC800][b]' + (Ability.name ? Ability.name : '') + '[/b][-]'
            EquipmentSet.push(DescText)
        }
    }

    // Add upgrade text to array
    for (i = 0; i < _model.Upgrades.length; i++) {
        DescText = '[44BA26][b]' + (_model.Upgrades[i].Name ? _model.Upgrades[i].Name : '') + '[/b][-]'
        UpgradeSet.push(DescText)
    }

    // Add equipment text to arrays
    for (i = 0; i < _model.Equipment.length; i++) {
        DescText = ''
        TempItem = _model.Equipment[i].Object
        if (TempItem.Category == 'ranged' || TempItem.Category == 'melee') {
            DescText += ' (' + (TempItem.EquipType ? TempItem.EquipType : '')
            DescText += ', ' + (TempItem.Range ? TempItem.Range : '')
            for (n = 0; n < TempItem.Modifiers.length; n++) {
                DescText += ', ' + (TempItem.Modifiers[n] ? TempItem.Modifiers[n] : '')
            }
            for (n = 0; TempItem.Tags && TempItem.Tags.length > n; n++) {
                DescText += ', ' + (TempItem.Tags[n].tag_name ? TempItem.Tags[n].tag_name.toUpperCase() : '')
            }
            DescText += ')'
        }
        if  (TempItem.Category == 'equipment') {
            if (TempItem.Tags && TempItem.Tags.length > 0) {
                DescText += ' (' 
                for (n = 0; TempItem.Tags && TempItem.Tags.length > n; n++) {
                    if (n>0) DescText += ', '
                    DescText += TempItem.Tags[n].tag_name ? TempItem.Tags[n].tag_name.toUpperCase() : ''
                }
                DescText += ')'
            }
        }
        if (TempItem.Category == 'ranged') {
            RangedSet.push('[3185FC][b]' + (TempItem.Name ? TempItem.Name : '') + '[/b][-]' + DescText)
        }
        if (TempItem.Category == 'melee') {
            MeleeSet.push('[DB162F][b]' + (TempItem.Name ? TempItem.Name : '') + '[/b][-]' + DescText)
        }
        if (TempItem.Category == 'armour') {
            ArmourSet.push('[44BA26][b]' + (TempItem.Name ? TempItem.Name : '') + '[/b][-]' + DescText)
        }
        if (TempItem.Category == 'equipment') {
            MiscSet.push('[FFC800][b]' + (TempItem.Name ? TempItem.Name : '') + '[/b][-]' + DescText)
        }
    }
    // ------------------------------------------------------------------------------

    // ------------------------ Generate Text ---------------------------------------

    // Add discord-friendly comment block characters if needed
    let returnString = ''

    // Starting row
    returnString += NameRow + '\n' + StartingRow + '\n' + StatsRow + '\n'

    // Add abilities/upgrades/equipment if some exist


    if (UpgradeSet.length > 0 || AbilitiesSet.length > 0) {
        returnString += '\n' + '+++ Abilities & Upgrades +++'
    }
    if (UpgradeSet.length > 0) {
        returnString += ''
        for (i = 0; i < UpgradeSet.length; i++) {
            returnString += '\n' + UpgradeSet[i]
        }
    }
    if (AbilitiesSet.length > 0) {
        returnString += ''
        for (i = 0; i < AbilitiesSet.length; i++) {
            returnString += '\n' + AbilitiesSet[i]
        }
    }
    if (_model.Equipment.length > 0) {
        returnString += '\n' + '+++ Equipment +++'
    }
    if (EquipmentSet.length > 0) {
        returnString += ''
        for (i = 0; i < EquipmentSet.length; i++) {
            returnString += '\n' + EquipmentSet[i]
        }
    }
    if (ArmourSet.length > 0) {
        returnString += ''
        for (i = 0; i < ArmourSet.length; i++) {
            returnString += '\n' + ArmourSet[i]
        }
    }
    if (RangedSet.length > 0) {
        returnString += ''
        for (i = 0; i < RangedSet.length; i++) {
            returnString += '\n' + RangedSet[i]
        }
    }
    if (MeleeSet.length > 0) {
        returnString += ''
        for (i = 0; i < MeleeSet.length; i++) {
            returnString += '\n' + MeleeSet[i]
        }
    }
    if (MiscSet.length > 0) {
        returnString += ''
        for (i = 0; i < MiscSet.length; i++) {
            returnString += '\n' + MiscSet[i]
        }
    }

    // Add skills if some exist
    if (_model.Skills.length > 0) {
        returnString += '\n' + '+++ SKILLS +++'
        for (i = 0; i < _model.Skills.length; i++) {
            returnString += '\n' + '[00C2D1]' + _model.Skills[i].name + '[-] '
        }
    }

    // Add injuries if some exist
    if (_model.Injuries.length > 0) {
        returnString += '\n' + '+++ INJURIES +++'

        for (i = 0; i < _model.Injuries.length; i++) {
            returnString += '\n' + '[DB162F]' + _model.Injuries[i].Name + '[-] '
        }
    }

    // Add notes if requested
    if (_notes) {
        if (_model.Notes.trim().length > 0) {
            returnString += '\n' + '+++ NOTES +++' + '\n' + _model.Notes
        }
    }

    // Add final row
    returnString += ''
    // ------------------------------------------------------------------------------

    return returnString
}


/**
 * Generates a unique ID to differentiate
 * otherwise identical warbands.
 * @param _name Base name to use
 * @returns unique ID for the warband
 */
export function CalcID(_name : string) {
    const currentDate = new Date();
    const milliseconds = currentDate.getMilliseconds();
    
    return _name + milliseconds.toString();
}