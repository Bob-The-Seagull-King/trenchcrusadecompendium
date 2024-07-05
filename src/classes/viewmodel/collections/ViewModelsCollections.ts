import { ViewCollectionsModel } from "./ViewCollectionsModel";
import { IPlayerModel, PlayerModel } from "../../feature/models/Model";
import { ModelFactory } from "../../../factories/features/ModelFactory";
import { ViewTableItem } from "./ViewTableItem";
import { byPropertiesOf, getColour, sort } from "../../../utility/functions";

class ViewModelsCollection extends ViewCollectionsModel {

     ModelsList: PlayerModel[] = [];
    
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
        this.dataresults.sort(byPropertiesOf<IPlayerModel>(['name', 'faction_id','variant_id','source', 'id']))
        for (i = 0; i < this.dataresults.length; i++) {
            const modelNew = ModelFactory.CreateModel(this.dataresults[i]);
            const ItemNew = new ViewTableItem(modelNew, getColour(modelNew.Team));
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

export {ViewModelsCollection}