import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { FilterText } from '../../../../classes/viewmodel/collections/filters/FilterInterfaces'

const FilterTextItem = (prop: any) => {
    const ItemFilter: FilterText = prop.data

    const [_currentstate, returnactivetext] = useState(ItemFilter.IsStrict);
    
    function updateName(value: string) {
        ItemFilter.Val = value;
    }

    function updateStrict(value: any) {
        ItemFilter.IsStrict = !ItemFilter.IsStrict
        returnactivetext(ItemFilter.IsStrict)
    }

    // Return result -----------------------------
    return (
        <div className="col">
            <div className="centerPosition">
                <InputGroup className="mb-3 bordersubpurple filtertextinput">
                    <Form.Control onChange={e => updateName(e.target.value)} className='' aria-label="Text input with checkbox" defaultValue={ItemFilter.Val}/>
                    <InputGroup.Text className=''>Exact Match?</InputGroup.Text>
                    <InputGroup.Checkbox checked={_currentstate}  onChange={e => updateStrict(e.target.checked)}  className='' aria-label="Checkbox for following text input" ></InputGroup.Checkbox>
                </InputGroup>
            </div>
        </div>
    )
    // -------------------------------------------
}

export default FilterTextItem