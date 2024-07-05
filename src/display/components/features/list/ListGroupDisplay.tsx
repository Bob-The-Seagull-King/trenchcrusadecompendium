import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React from 'react'

import { getColour } from '../../../../utility/functions';
import { ListGroup } from '../../../../classes/feature/list/ListGroup';
import { ListItem } from '../../../../classes/feature/list/ListItem';
import ListItemDisplay from './ListItemDisplay';
import {ITrenchCrusadeItemTag} from '../../../../classes/TrenchCrusadeItem'

import TagDisplay from '../../subcomponents/TagDisplay'
import ModelDescriptionItemDisplay from '../../subcomponents/description/ModelDescriptionItemDisplay';
import ModelStat from '../../subcomponents/description/ModelStat';

const ListGroupDisplay = (props: any) => {
    const ModelObject: ListGroup = props.data
    const bannedModelTags = ["inflict", "type"]

    function returnDescription() {
        return (
            <div>
                {ModelObject.Description.map((item) => (
                    <div key={"descriptionDisplay"+(item.Content? item.Content : "")}>
                        <ModelDescriptionItemDisplay data={item} parent={ModelObject}/>
                    </div>
                ))}
            </div>
        )
    }

    function returnTags() {
        const displaytags = sortTagsForDisplay()

        return (
            <div className="tagBox">
                    {displaytags.map((item) => (
                        <div key={"tagDisplay"+item.tag_name+item.val}>
                            <TagDisplay data={item}/>
                        </div>
                    ))}
            </div>
        )
    }

    function sortTagsForDisplay() {
        const tagarray: ITrenchCrusadeItemTag[] = []

        let i = 0;
        for (i = 0; i < (ModelObject.Tags?.length || 0); i++) {
            if (ModelObject.Tags != undefined) {
                const temptag: ITrenchCrusadeItemTag = ModelObject.Tags[i]

                if ((temptag.tag_name == "blast_size") || (temptag.tag_name == "blast_distance")) {
                    temptag.tag_name = "blast"; }

                if (!bannedModelTags.includes(temptag.tag_name)) {
                    tagarray.push(temptag);
                }}}
        return tagarray;
    }

    return (
        <div className={'modelStructure borderstyler border'+getColour("tc")}>
            <h1 className={'titleShape titlestyler background'+getColour("tc")}>{ModelObject.Name || ""}</h1>
            <div className='modelInternalStructure'>
                
                {ModelObject.Description.length != 0 &&
                    <>
                <div>
                    {returnDescription()}
                </div>
                </>
                }
                <div className="verticalspacer"/>
                <div>
                    <div className="separator">&#x27E1;</div>
                </div> 
                <div className="verticalspacer"/>
                <div className="row row-cols-lg-1 row-cols-md-1 row-cols-sx-1 row-cols-xs-1 row-cols-1">
                    <div className='col-12'>
                        <div className="row row-cols-3">             
                            <div className='col-lg-2 col-md-2 col-sm-2 col-xs-3'>
                                <h1 className='tabletitle'>Result</h1>
                            </div>
                            <div className='col-lg-3 col-md-3 col-sm-3 col-xs-3'>
                                <h1 className='tabletitle'>Name</h1>
                            </div>
                            <div className='col-lg-7 col-md-7 col-sm-7 col-xs-6'>
                                <h1 className='tabletitle'>Description</h1>
                            </div>
                        </div>
                    </div>
                    {ModelObject.ListItems.map((item) => (
                        <div className="col" key={"modelDisplay"+item.ID}>
                            <div>
                                <div className="separator"></div>
                            </div> 
                            <ListItemDisplay data={item}/>
                            <br/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ListGroupDisplay;