import { ViewCollectionsModel } from "./ViewCollectionsModel";
import { IPlayerFaction, PlayerFaction } from "../../../classes/feature/factions/Faction";
import { FactionFactory } from "../../../factories/features/FactionFactory";
import { ViewTableItem } from "./ViewTableItem";
import { byPropertiesOf, getColour, sort } from "../../../utility/functions";

class ViewFactionCollection extends ViewCollectionsModel {

     ModelsList: PlayerFaction[] = [];
    
    /**
     * Empty constructor
     */
    constructor(){ 
        super()
        this.ModelsList = []
    }

    /**
     * After the search has been run, create model objects
     * and assign them to the collection
     */
    public RunSearch() {
        super.RunSearch();
        this.PostSearch();
    }

    /**
     * For each entry in the data results, create an Model object
     * and add it to the internal list.
     */
    PostSearch() {
        this.CleanupModels();
        this.CleanupCollection();
        let i = 0;
        this.dataresults.sort(byPropertiesOf<PlayerFaction>(['Name']))
        for (i = 0; i < this.dataresults.length; i++) {
            const modelNew = FactionFactory.CreateFactory(this.dataresults[i]);
            const ItemNew = new ViewTableItem(modelNew, getColour("purple"));
            this.itemcollection.push(ItemNew);
        }
    }

    /**
     * When destroyed, delete all model objects
     */
    destructor() {
        this.CleanupModels() 
    }

    /**
     * Delete each model object stored in the collection
     */
    CleanupModels() {
        let i = 0;
        for (i = 0; i < this.ModelsList.length; i ++) {
            delete this.ModelsList[i]
        }
        this.ModelsList = []
    }

    CleanupCollection() {
        let i = 0;
        for (i = 0; i < this.itemcollection.length; i ++) {
            delete this.itemcollection[i]
        }
        this.itemcollection = []
    }

    /**
     * Basic get function
     */
    public ReturnModels() {
        this.UpdateList();
        return this.ModelsList;
    }

    /**
     * Basic return function
     */
    public ReturnItems() {
        return this.itemcollection;
    }
    
    /**
     * Updates the list of models to be displayed
     * on screen.
     */
    UpdateList() {
        let i = 0;
        this.ModelsList = []
        for (i = 0; i < this.itemcollection.length; i++) {
            if (this.itemcollection[i].IsActive) {
                this.ModelsList.push(this.itemcollection[i].HeldItem)
            }
        }
    }
}

export {ViewFactionCollection}