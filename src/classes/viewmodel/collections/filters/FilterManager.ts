// Import typescript classes
import {FilterText, FilterTag, FilterItem} from './FilterInterfaces'

abstract class FilterManager {
    
    TextOptions: FilterText[] = [];
    TagOptions: FilterTag[] = [];
    MiscOptions: FilterItem[] = []

    constructor() {
        undefined;
    }

    /**
     * @returns Array of all text-type filters
     */
    ReturnTextFilters () { return this.TextOptions; }

    /**
     * @returns Array of all tag-type filters
     */
    ReturnTagFilters() { return this.TagOptions; }

    /**
     * @returns Array of all misc filters
     */
    ReturnMiscFilters() { return this.MiscOptions; }

    /**
     * @returns Array of all currently active text-type filters
     */
    ReturnActiveTextFilters() { return this.TextOptions.filter((value) => value.Val.trim().length > 0); }

    /**
     * @returns Array of all currently active tag-type filters
     */
    ReturnActiveTagFilters() { return this.TagOptions.filter((value) => value.TagType.IsActive == true); }

    /**
     * @returns Array of all currently active misc filters
     */
    ReturnActiveMiscFilters() { return this.MiscOptions.filter((value) => value.IsActive == true);}

    /**
     * @returns Integer count of all the filters that currently exist
     */
    ReturnCount() { return this.ReturnMiscFilters.length + this.ReturnTagFilters.length + this.ReturnTextFilters.length; }

    /**
     * @returns Integer count of all the filters that are currently active
     */
    ReturnActiveCount() { return this.ReturnActiveMiscFilters.length + this.ReturnActiveTagFilters.length + this.ReturnActiveTextFilters.length; }
}

export {FilterManager}