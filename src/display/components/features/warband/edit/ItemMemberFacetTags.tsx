import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../resources/styles/_icon.scss'
import React from 'react'

import { ListEquipment } from '../../../../../classes/lists/ListEquipment'
import { Warband } from '../../../../../classes/lists/Warband'
import { WarbandManager } from '../../../../../classes/lists/warbandmanager'
import { WarbandMember } from '../../../../../classes/lists/WarbandMember'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const ItemMemberFacetTags = (props: any) => {
    const WarbandItem: Warband = props.warband;
    const WarbandMember : WarbandMember | null = props.member;
    const UpdateFunction = props.updater;
    const Manager : WarbandManager = props.manager;
    const ModelEquip: ListEquipment = props.data;

    return (
        <>
        </>
    )
}


export default ItemMemberFacetTags;