// Import typescript classes
import { TrenchCrusadeItem } from "../../../classes/TrenchCrusadeItem";
import { getColour } from "../../../utility/functions";

class ViewTableItem {

    readonly HeldItem: TrenchCrusadeItem;
    readonly Colour: string;
    IsActive = false;

    /**
     * Empty constructor
     */
    constructor(item: TrenchCrusadeItem, colourName: string){
        this.HeldItem = item;
        this.Colour = getColour(colourName);
    }

    /**
     * Swaps the current active-state of the tablt item
     */
    SwitchStates() {
        if (this.IsActive) {
            this.IsActive = false;
        } else {
            this.IsActive = true;
        }
    }
}

export {ViewTableItem}