import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../resources/styles/_icon.scss'
import React from 'react'

import { WarbandMember } from '../../../../../classes/lists/WarbandMember'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandFist, faPersonRifle, faScrewdriverWrench, faShapes, faUserInjured } from '@fortawesome/free-solid-svg-icons'
import { FacetTagsType, FacetTagsDataDex } from './static/StaticEditFacetTags'
import GenericPopupSimple from '../../../generics/GenericPopupSimple'
import PartialItemDisplay from '../../partialitem/PartialItemDisplay'
import FullItemDisplay from '../../list/FullItemDisplay'
import UpgradeDisplay from '../../equipment/UpgradeDisplay'
import EquipmentDisplay from '../../equipment/EquipmentDisplay'
import AddonDisplay from '../../addons/AddonDisplay'

const ItemMemberFacetTags = (props: any) => {
    const WarbandMember : WarbandMember = props.member;
    const SelfItem = props.data;
    const FacetTypes : FacetTagsType = FacetTagsDataDex[props.type]

    const ListOfTags : {[_name : string] : any} = FacetTypes.returnItems(WarbandMember, SelfItem);

    return (
        <div className="row row-cols-8 row-sm-cols-6">
        {ListOfTags['addon'] &&
            <>
                {ListOfTags['addon'].map((item: any) => (
                    <div className="col-1" key={"componentaddon"+item.Name}>
                        <GenericPopupSimple  d_colour={WarbandMember.Model.Object.Team} d_name={item.Name} d_type={""} d_button={(show : any) => <FontAwesomeIcon icon={faShapes} className="setTc hovermouse" style={{fontSize:"2em"}} onClick={() => show()} />} d_method={() => <AddonDisplay data={item}/> }/>
                    </div>
                ))}
            </>
        }
        {ListOfTags['equipment'] &&
            <>
                {ListOfTags['equipment'].map((item: any) => (
                    <div className="col-1" key={"componentequipment"+item.Name}>
                        <GenericPopupSimple  d_colour={WarbandMember.Model.Object.Team} d_name={item.Name} d_type={""} d_button={(show : any) => <FontAwesomeIcon icon={faPersonRifle} className="setTc hovermouse" style={{fontSize:"2em"}} onClick={() => show()} />} d_method={() => <EquipmentDisplay data={item}/> }/>
                    </div>
                ))}
            </>
        }
        {ListOfTags['upgrade'] &&
            <>
                {ListOfTags['upgrade'].map((item: any) => (
                    <div className="col-1" key={"componentupgrade"+item.Name}>
                        <GenericPopupSimple  d_colour={WarbandMember.Model.Object.Team} d_name={item.Name} d_type={""} d_button={(show : any) => <FontAwesomeIcon icon={faScrewdriverWrench} className="setTc hovermouse" style={{fontSize:"2em"}} onClick={() => show()} />} d_method={() => <UpgradeDisplay data={item}/> }/>
                    </div>
                ))}
            </>
        }
        {ListOfTags['skill'] &&
            <>
                {ListOfTags['skill'].map((item: any) => (
                    <div className="col-1" key={"componentskill"+item.name}>
                        <GenericPopupSimple  d_colour={WarbandMember.Model.Object.Team} d_name={item.name} d_type={""} d_button={(show : any) => <FontAwesomeIcon icon={faHandFist} className="setTc hovermouse" style={{fontSize:"2em"}} onClick={() => show()} />} d_method={() => <PartialItemDisplay data={item}/> }/>
                    </div>
                ))}
            </>
        }
        {ListOfTags['injury'] &&
            <>
                {ListOfTags['injury'].map((item: any) => (
                    <div className="col-1" key={"componentinjury"+item.Name}>
                        <GenericPopupSimple  d_colour={WarbandMember.Model.Object.Team} d_name={item.Name} d_type={""} d_button={(show : any) => <FontAwesomeIcon icon={faUserInjured} className="setTc hovermouse" style={{fontSize:"2em"}} onClick={() => show()} />} d_method={() => <FullItemDisplay data={item}/> }/>
                    </div>
                ))}
            </>
        }
        </div>
    )
}


export default ItemMemberFacetTags;