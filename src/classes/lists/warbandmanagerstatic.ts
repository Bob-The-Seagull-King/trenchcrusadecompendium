import { Warband } from "./Warband";
import { WarbandMember } from "./WarbandMember";

export function GetGloryCost(_member : WarbandMember) {
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

export function GetDucatCost(_member : WarbandMember) {
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
    
export function TotalCostDucats(_band : Warband) {
    let totalducats = _band.DucatLost;

    let i = 0;
    
    for (i = 0; i < _band.Armoury.length ; i++) {
        if (_band.Armoury[i].CostType == "ducats") {
            totalducats += _band.Armoury[i].Cost;
        }
    }

    for (i = 0; i < _band.Members.length ; i++) {
        totalducats += Number(GetDucatCost(_band.Members[i]))
    }

    return totalducats;
}

export function TotalCostGlory(_band : Warband) {
    let totalglory = _band.GloryLost;

    let i = 0;
    
    for (i = 0; i < _band.Armoury.length ; i++) {
        if (_band.Armoury[i].CostType == "glory") {
            totalglory += _band.Armoury[i].Cost;
        }
    }

    for (i = 0; i < _band.Members.length ; i++) {
        totalglory += Number(GetGloryCost(_band.Members[i]))
    }

    return totalglory;
}



export function ExportDisplayText(_warband : Warband, _notes : boolean) {
    const StartingRow = " " + _warband.Name + " | " + _warband.Faction.Name + " "

    const startrowlength = StartingRow.length;

    let returnRow = ("```" + "\n") + ("-".repeat(10)) + StartingRow + ("-".repeat(90-((startrowlength < 90)? startrowlength : 0)));

    if (_notes) {
        if (_warband.Notes.trim().length > 0){
        returnRow += "\n" + "[ NOTES ]" + "\n" + _warband.Notes + "\n"
        }
    }

    const ducatTotal = "Total : " + _warband.DucatTotal.toString();
    const ducatCost = "Spent : " + TotalCostDucats( _warband).toString() + " (" + _warband.DucatLost.toString() + " Lost)";
    const gloryTotal = "Total : " + _warband.GloryTotal.toString();
    const gloryCost = "Spent : " + TotalCostGlory(_warband).toString() + " (" + _warband.GloryCost.toString() + " Lost)";

    const totalRow = (ducatTotal.length > gloryTotal.length)? ducatTotal.length : gloryTotal.length;
    const costRow = (ducatCost.length > gloryCost.length)? ducatCost.length : gloryCost.length;

    const DucatRow = ducatTotal + (" ".repeat(((totalRow - ducatTotal.length) > 0)? totalRow - ducatTotal.length : 0)) + " | " + ducatCost + (" ".repeat(((costRow - ducatCost.length) > 0)? costRow - ducatCost.length : 0)) + " | Available : " + (_warband.DucatTotal - TotalCostDucats(_warband)).toString()
    const GloryRow = gloryTotal + (" ".repeat(((totalRow - gloryTotal.length) > 0)? totalRow - gloryTotal.length : 0)) + " | " + gloryCost + (" ".repeat(((costRow - gloryCost.length) > 0)? costRow - gloryCost.length : 0)) + " | Available : " + (_warband.GloryTotal - TotalCostGlory(_warband)).toString()

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
            returnRow += "\n" + "\n" + ExportModelDisplayText(_warband.Members[i], _notes, true);
        }
    }

    returnRow += "\n" + "\n" + "[ INFANTRY ]"

    for (i = 0; i < _warband.Members.length; i ++) {
        if (!(_warband.Members[i].Elite)) {
            returnRow += "\n" + "\n" + ExportModelDisplayText(_warband.Members[i], _notes, true);
        }
    }

    returnRow += "\n" + "\n" + ("-".repeat(100)) + ("\n" + "```")

    return returnRow;
}

export function ExportModelDisplayText(_model : WarbandMember, _notes : boolean, _inside : boolean) {
    const StartingRow = _model.Name + " | " + (GetDucatCost(_model) + " ducats") + " | " + (GetGloryCost(_model) + " glory")
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

export function ExportDisplayTextBasic(_warband : Warband, _notes : boolean) {
    const StartingRow = " " + _warband.Name + " | " + _warband.Faction.Name + " "

    const startrowlength = StartingRow.length;

    let returnRow = ("```" + "\n") + ("-".repeat(10)) + StartingRow + ("-".repeat(90-((startrowlength < 90)? startrowlength : 0)));

    const ducatTotal = "Total : " + _warband.DucatTotal.toString();
    const ducatCost = "Spent : " + TotalCostDucats( _warband).toString() + " (" + _warband.DucatLost.toString() + " Lost)";
    const gloryTotal = "Total : " + _warband.GloryTotal.toString();
    const gloryCost = "Spent : " + TotalCostGlory(_warband).toString() + " (" + _warband.GloryCost.toString() + " Lost)";

    const totalRow = (ducatTotal.length > gloryTotal.length)? ducatTotal.length : gloryTotal.length;
    const costRow = (ducatCost.length > gloryCost.length)? ducatCost.length : gloryCost.length;

    const DucatRow = ducatTotal + (" ".repeat(((totalRow - ducatTotal.length) > 0)? totalRow - ducatTotal.length : 0)) + " | " + ducatCost + (" ".repeat(((costRow - ducatCost.length) > 0)? costRow - ducatCost.length : 0)) + " | Available : " + (_warband.DucatTotal - TotalCostDucats(_warband)).toString()
    const GloryRow = gloryTotal + (" ".repeat(((totalRow - gloryTotal.length) > 0)? totalRow - gloryTotal.length : 0)) + " | " + gloryCost + (" ".repeat(((costRow - gloryCost.length) > 0)? costRow - gloryCost.length : 0)) + " | Available : " + (_warband.GloryTotal - TotalCostGlory(_warband)).toString()

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
            returnRow +=  "\n" + ExportModelDisplayTextBasic(_warband.Members[i], _notes, true);
        }
    }

    if (_warband.Members.filter((value) => (value.Elite != true)).length > 0) {
        returnRow += "\n" + "[ INFANTRY ]"
    }

    for (i = 0; i < _warband.Members.length; i ++) {
        if (!(_warband.Members[i].Elite)) {
            returnRow +=  "\n" + ExportModelDisplayTextBasic(_warband.Members[i], _notes, true);
        }
    }

    returnRow += "\n" + "\n" + ("-".repeat(100)) + ("\n" + "```")

    return returnRow;
}

export function ExportModelDisplayTextBasic(_model : WarbandMember, _notes : boolean, _inside : boolean) {
    const StartingRow = _model.Name + " | " + _model.Model.Object.Name + " | " + (GetDucatCost(_model) + " ducats") + " " + (GetGloryCost(_model) + " glory")
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

export function CalcID(_name : string) {
    const currentDate = new Date();
    const milliseconds = currentDate.getMilliseconds();
    
    return _name + milliseconds.toString();
}