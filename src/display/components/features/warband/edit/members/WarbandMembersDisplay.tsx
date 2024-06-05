import 'bootstrap/dist/css/bootstrap.css'
import '../../../../../../resources/styles/_icon.scss'
import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { Warband } from '../../../../../../classes/lists/Warband';
import { WarbandManager } from '../../../../../../classes/lists/warbandmanager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const WarbandMembersDisplay = (props: any) => {
    const WarbandItem: Warband = props.data;
    const UpdateFunction = props.updater;
    const Manager : WarbandManager = props.manager;

    // Creation of New warband member ---------------------------


    // ----------------------------------------------------------

    // List of Warband Members ----------------------------------


    // ----------------------------------------------------------

    return (
        <>
            <div className="row"> {/* New Member Adder */}

                <div className="col-md-6 col-lg-6 col-12"> {/* Model Select */}

                </div>
                <div className="col-md-6 col-lg-6 col-12"> {/* Member Name */}

                </div>
                <div className="col-md-9 col-lg-9 col-12"> {/* Edit Cost */}

                </div>
                <div className="col-md-3 col-lg-3 col-12"> {/* Add Member */}

                </div>

            </div>
            <div className="row"> {/* Elite Members */}
                {WarbandItem.Members.filter((item) => item.Elite == true).map((item) => (
                    <p>{item.Name}</p>
                ))}
            </div>
            <div className="row"> {/* Non-Elite Members */}
                {WarbandItem.Members.filter((item) => item.Elite == false).map((item) => (
                    <p>{item.Name}</p>
                ))}
            </div>
        </>
    )
}

export default WarbandMembersDisplay;