import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React from 'react'

import { ListGroup } from '../../../../classes/feature/list/ListGroup';
import { returnDescription } from '../../../../utility/util';

import ListItemDisplay from './ListItemDisplay';

const ListGroupDisplay = (props: any) => {
    const ModelObject: ListGroup = props.data

    return (
        <div className='modelInternalStructure'>
            {ModelObject.Description.length != 0 &&
                <>
            <div>
                {returnDescription(ModelObject, ModelObject.Description)}
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
                        <div className='col-lg-2 col-md-2 col-sm-2 col-xs-3'>
                            <h1 className='tabletitle'>Name</h1>
                        </div>
                        <div className='col-lg-8 col-md-8 col-sm-8 col-xs-6'>
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
            
    )
}

export default ListGroupDisplay;