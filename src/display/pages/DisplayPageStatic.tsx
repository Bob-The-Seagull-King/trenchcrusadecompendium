import { FilterManager } from "../../classes/viewmodel/collections/filters/FilterManager"
import {FilterTagItem, FilterTextItem, FilterMiscItem} from "../components/subcomponents/filters/FilterItems"
import GenericDisplay from "../components/generics/GenericDisplay"
import React from 'react'
import QuickRuleDisplay from "../../display/components/features/rules/QuickRuleDisplay"
import ListGroupDisplay from "../../display/components/features/list/ListGroupDisplay"
import ListItemDisplay from "../../display/components/features/list/ListItemDisplay"
import ScenarioDisplay from "../../display/components/features/scenario/ScenarioDisplay"
import EquipmentDisplay from "../../display/components/features/equipment/EquipmentDisplay"
import FactionDisplay from "../../display/components/features/faction/FactionDisplay"
import ModelDisplay from "../../display/components/features/models/ModelDisplay"

export interface DisplayCollectionType {
    searchId      : string,
    returnDisplay: (item: any) => JSX.Element
    returnFilterSelect: (manager : FilterManager, update : NoneToNoneFunction, close : NoneToNoneFunction) => JSX.Element,
    width : number;
}

export interface DisplayCollectionDataTable {[moveid: Lowercase<string>]: DisplayCollectionType}

type NoneToNoneFunction = () => void;

export const DisplayCollectionDataDex : DisplayCollectionDataTable = {
    campaignrules: {
        searchId: 'campaignrules',
        width: 12,
        returnDisplay(item: any) {
            return (
                <GenericDisplay  d_colour={"tc"} d_name={item.Name} d_type={""} d_method={() => <QuickRuleDisplay data={item}/>}/>
            )
        },
        returnFilterSelect(manager : FilterManager, update : NoneToNoneFunction, close : NoneToNoneFunction) {
            return (
                <>
                </>
            )
        }
    },
    equipment: {
        searchId: 'equipment',
        returnDisplay(item: any) {
            return (
                <GenericDisplay  d_colour={"tc"} d_name={item.Name} d_type={""} d_method={() => <EquipmentDisplay data={item}/>}/>
            )
        },
        width: 7,
        returnFilterSelect(manager : FilterManager, update : NoneToNoneFunction, close : NoneToNoneFunction) {
            return (
                <div className="col-12">
                    <div className="separator"><h3>Name</h3></div>
                    <div className="row">
                        {manager.ReturnTextFilters().map((item) => (
                            <FilterTextItem data={item} key="name"/>
                        ))}
                    </div>
                    <div className="separator"><h3>Tags</h3></div>
                    <div className="row">
                        <div className="filterbox centerPosition">
                            {manager.ReturnTagFilters().map((item) => (
                                <FilterMiscItem key={"tag"+item.Name} data={item}/>
                            ))}
                        </div>
                    </div>
                    <div className="separator"><h3>Category</h3></div>
                    <div className="row">
                        <div className='filterbox centerPosition'>
                            {manager.ReturnMiscFilters().filter((value) => (value.Group == "category")).map((item) => (
                                <FilterMiscItem key={"misccategory"+item.Name} data={item} />
                            ))}
                        </div>
                    </div>
                    <div className="separator"><h3>Type</h3></div>
                    <div className="row">
                        <div className='filterbox centerPosition'>
                            {manager.ReturnMiscFilters().filter((value) => (value.Group == "equip_type")).map((item) => (
                                <FilterMiscItem key={"miscequiptype"+item.Name} data={item} />
                            ))}
                        </div>
                    </div>
                    <div className="separator"><h3>Sources</h3></div>
                    <div className="row">
                        <div className='filterbox centerPosition'>
                            {manager.ReturnMiscFilters().filter((value) => (value.Group == "source")).map((item) => (
                                <FilterMiscItem key={"miscsource"+item.Name} data={item} />
                            ))}
                        </div>
                    </div>
                    <div className='separator toppad'></div>
                    <div className="row float-end">
                        <div className='col-12 float-end'>
                            <div className='hovermouse filterclosebutton' onClick={() => {close()}}>CONFIRM</div>
                        </div>
                    </div>
                </div>
            )
        }
    },
    exploration: {
        searchId: 'exploration',
        returnDisplay(item: any) {
            return (
                <GenericDisplay  d_colour={"tc"} d_name={item.Name} d_type={""} d_method={() => <ListGroupDisplay data={item}/>}/>
            )
        },
        width: 7,
        returnFilterSelect(manager : FilterManager, update : NoneToNoneFunction, close : NoneToNoneFunction) {
            return (
                
                <div className="col-12">
                    <div className="separator"><h3>Name</h3></div>
                    <div className="row">
                        {manager.ReturnTextFilters().map((item : any) => (
                            <FilterTextItem data={item} key="name"/>
                        ))}
                    </div>
                    <div className="separator"><h3>Tags</h3></div>
                    <div className="row">
                        <div className="filterbox centerPosition">
                            {manager.ReturnTagFilters().map((item : any) => (
                                <FilterMiscItem key={"tag"+item.Name} data={item}/>
                            ))}
                        </div>
                    </div>
                    <div className='separator toppad'></div>
                    <div className="row float-end">
                        <div className='col-12 float-end'>
                            <div className='hovermouse filterclosebutton' onClick={() => {close()}}>CONFIRM</div>
                        </div>
                    </div>
                </div>
            )
        }
    },
    faction: {
        searchId: 'faction',
        returnDisplay(item: any) {
            return (
                <GenericDisplay  d_colour={item.Team} d_name={item.Name} d_type={""} d_method={() => <FactionDisplay data={item}/>}/>
            )
        },
        width: 9,
        returnFilterSelect(manager : FilterManager, update : NoneToNoneFunction, close : NoneToNoneFunction) {
            return (
                <div className="col-12">
                    <div className="separator"><h3>Name</h3></div>
                    <div className="row">
                        {manager.ReturnTextFilters().map((item) => (
                            <FilterTextItem data={item} key="name"/>
                        ))}
                    </div>
                    <div className="separator"><h3>Tags</h3></div>
                    <div className="row">
                        <div className="filterbox centerPosition">
                            {manager.ReturnTagFilters().map((item) => (
                                <FilterMiscItem key={"tag"+item.Name} data={item}/>
                            ))}
                        </div>
                    </div>
                    <div className='separator toppad'></div>
                    <div className="row float-end">
                        <div className='col-12 float-end'>
                            <div className='hovermouse filterclosebutton' onClick={() => {close()}}>CONFIRM</div>
                        </div>
                    </div>
                </div>
            )
        }
    },
    injuries: {
        searchId: 'injuries',
        width: 7,
        returnDisplay(item: any) {
            return (
                <ListItemDisplay data={item}/>
            )
        },
        returnFilterSelect(manager : FilterManager, update : NoneToNoneFunction, close : NoneToNoneFunction) {
            return (
                <>
                </>
            )
        }
    },
    models: {
        searchId: 'models',
        width: 7,
        returnDisplay(item: any) {
            return (
                <GenericDisplay  d_colour={item.Team} d_name={item.Name} d_type={""} d_method={() => <ModelDisplay data={item}/>}/>
            )
        },
        returnFilterSelect(manager : FilterManager, update : NoneToNoneFunction, close : NoneToNoneFunction) {
            return (
                <div className="col-12">
                    <div className="separator"><h3>Name</h3></div>
                    <div className="row">
                        {manager.ReturnTextFilters().map((item) => (
                            <FilterTextItem data={item} key="name"/>
                        ))}
                    </div>
                    <div className="separator"><h3>Tags</h3></div>
                    <div className="row">
                        <div className="filterbox centerPosition">
                            {manager.ReturnTagFilters().map((item) => (
                                <FilterMiscItem key={"tag"+item.Name} data={item}/>
                            ))}
                        </div>
                    </div>
                    <div className="separator"><h3>Factions</h3></div>
                    <div className="row">
                        <div className='filterbox centerPosition'>
                            {manager.ReturnMiscFilters().filter((value) => (value.Group == "faction_id")).map((item) => (
                                <FilterMiscItem key={"misclass"+item.Name} data={item} />
                            ))}
                        </div>
                    </div>
                    <div className="separator"><h3>Variants</h3></div>
                    <div className="row">
                        <div className='filterbox centerPosition'>
                            {manager.ReturnMiscFilters().filter((value) => (value.Group == "variant_id")).map((item) => (
                                <FilterMiscItem key={"misclass"+item.Name} data={item} />
                            ))}
                        </div>
                    </div>
                    <div className="separator"><h3>Statistics</h3></div>
                    <div className="subltenotetext">{"You can specify stat's value in the text box. Leave blank to find all of that stat."}
                    </div>
                    <div className='toppad'></div>
                    <div className="row">
                        <div className="filterbox centerPosition">
                            {manager.ReturnStatFilters().map((item) => (
                                <FilterTagItem key={"tag"+item.TagType.Name} data={item}/>
                            ))}
                        </div>
                    </div>
                    <div className="separator"><h3>Sources</h3></div>
                    <div className="row">
                        <div className='filterbox centerPosition'>
                            {manager.ReturnMiscFilters().filter((value) => (value.Group == "source")).map((item) => (
                                <FilterMiscItem key={"miscsource"+item.Name} data={item} />
                            ))}
                        </div>
                    </div>
                    <div className='separator toppad'></div>
                    <div className="row float-end">
                        <div className='col-12 float-end'>
                            <div className='hovermouse filterclosebutton' onClick={() => {close()}}>CONFIRM</div>
                        </div>
                    </div>
                </div>
            )
        }
    },
    quickrules: {
        searchId: 'quickrules',
        width: 12,
        returnDisplay(item: any) {
            return (
                <GenericDisplay  d_colour={"tc"} d_name={item.Name} d_type={""} d_method={() => <QuickRuleDisplay data={item}/>}/>
            )
        },
        returnFilterSelect(manager : FilterManager, update : NoneToNoneFunction, close : NoneToNoneFunction) {
            return (
                <>
                </>
            )
        }
    },
    scenario: {
        searchId: 'scenario',
        width: 9,
        returnDisplay(item: any) {
            return (
                <GenericDisplay  d_colour={"tc"} d_name={item.Name} d_type={""} d_method={() => <ScenarioDisplay data={item}/>}/>
            )
        },
        returnFilterSelect(manager : FilterManager, update : NoneToNoneFunction, close : NoneToNoneFunction) {
            return (
                <div className="col-12">
                    <div className="separator"><h3>Name</h3></div>
                    <div className="row">
                        {manager.ReturnTextFilters().map((item) => (
                            <FilterTextItem data={item} key="name"/>
                        ))}
                    </div>
                    <div className="separator"><h3>Tags</h3></div>
                    <div className="row">
                        <div className="filterbox centerPosition">
                            {manager.ReturnTagFilters().map((item) => (
                                <FilterMiscItem key={"tag"+item.Name} data={item}/>
                            ))}
                        </div>
                    </div>
                    <div className='separator toppad'></div>
                    <div className="row float-end">
                        <div className='col-12 float-end'>
                            <div className='hovermouse filterclosebutton' onClick={() => {close()}}>CONFIRM</div>
                        </div>
                    </div>
                </div>
            )
        }
    },
    skills: {
        searchId: 'skills',
        returnDisplay(item: any) {
            return (
                <GenericDisplay  d_colour={"tc"} d_name={item.Name} d_type={""} d_method={() => <ListGroupDisplay data={item}/>}/>
            )
        },
        width: 7,
        returnFilterSelect(manager : FilterManager, update : NoneToNoneFunction, close : NoneToNoneFunction) {
            return (
                <div className="col-12">
                    <div className="separator"><h3>Name</h3></div>
                    <div className="row">
                        {manager.ReturnTextFilters().map((item : any) => (
                            <FilterTextItem data={item} key="name"/>
                        ))}
                    </div>
                    <div className="separator"><h3>Tags</h3></div>
                    <div className="row">
                        <div className="filterbox centerPosition">
                            {manager.ReturnTagFilters().map((item : any) => (
                                <FilterMiscItem key={"tag"+item.Name} data={item}/>
                            ))}
                        </div>
                    </div>
                    <div className='separator toppad'></div>
                    <div className="row float-end">
                        <div className='col-12 float-end'>
                            <div className='hovermouse filterclosebutton' onClick={() => {close()}}>CONFIRM</div>
                        </div>
                    </div>
                </div>
            )
        }
    },
    tablereference: {
        searchId: 'tablechart',
        width: 7,
        returnDisplay(item: any) {
            return (
                <GenericDisplay  d_colour={"tc"} d_name={item.Name} d_type={""} d_method={() => <ListGroupDisplay data={item}/>}/>
            )
        },
        returnFilterSelect(manager : FilterManager, update : NoneToNoneFunction, close : NoneToNoneFunction) {
            return (
                <>
                </>
            )
        }
    }
}