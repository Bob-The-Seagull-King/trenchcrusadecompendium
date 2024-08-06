import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React from 'react'

const ItemStat = (props: any) => {
    const Title = props.title;
    const Content = props.value;

    return (
        <div className="col">
            <div className="stattitle">{Title}</div>
            <div className="statbody">{Content}</div>
            <div className="verticalspacer"/>
        </div>
    )
}

export default ItemStat;