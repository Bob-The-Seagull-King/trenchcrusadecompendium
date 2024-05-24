// Import typescript classes
import { IconpendiumItem } from "../../../classes/IconpendiumItem";

class ViewTableItem {

    readonly HeldItem: IconpendiumItem;
    readonly Colour: string;
    IsActive = false;

    /**
     * Empty constructor
     */
    constructor(item: IconpendiumItem, colourName: string){
        this.HeldItem = item;
        this.Colour = colourName;
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