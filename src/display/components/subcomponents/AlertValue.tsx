import 'bootstrap/dist/css/bootstrap.css'
import '../../../resources/styles/_icon.scss'
import React, {useState } from 'react'
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import logo from '../../../resources/images/companion_logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

function AlertDismissible() {
  const [show, setShow] = useState(true);

  return (
    <>
      <Alert show={show} variant="warning">
        <Alert.Heading>Something New Is Here!</Alert.Heading>
        
        <img src={logo} style={{maxWidth:"100%"}} onClick={() =>  window.open("https://trench-companion.com/", '_blank')}  />
        <p>
          After months of development the new and improved tool for Trench Crusade is here, the Trench Companion! With a new and improved UI, highly advanced warband builder, and the ability to access warbands across multiple devices, you&apos;re not going to want to miss out!
        </p>
        <p>
          We will keep the Trench Compendium up until October 31st (the spookiest time of year), at which point this site will automatically redirect you to the Trench Companion.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-error">
            Close me
          </Button>
          <Button onClick={() =>  window.open("https://trench-companion.com/", '_blank')} variant="outline-success">
            Go There Now!
          </Button>
        </div>
      </Alert>

      {!show && <Button variant="warning" onClick={() => setShow(true)}><FontAwesomeIcon icon={faTriangleExclamation} /></Button>}
    </>
  );
}

export default AlertDismissible;