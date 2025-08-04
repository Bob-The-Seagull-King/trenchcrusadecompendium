import 'bootstrap/dist/css/bootstrap.css'
import '../../../resources/styles/_icon.scss'
import React, {useState } from 'react'
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import logo from '../../../resources/images/companion_logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

const AlertDismissible = (props: any) => {
  const [show, setShow] = useState(true);

  function close() {
    setShow(false)
    props.func();
  }
  function open() {
    setShow(true)
    props.func();
  }

  return (
    <>
    <Alert show={show} variant="warning" className="shadow-lg p-4 mb-4 rounded">
      <Alert.Heading className="d-flex align-items-center">
        <FontAwesomeIcon icon={faTriangleExclamation} className="me-2" />
        Something New Available!
      </Alert.Heading>

        <img 
          src={logo} 
          alt="Trench Companion Logo"
          className="img-fluid mb-3" 
          style={{cursor: "pointer", borderRadius: "10px"}}
          onClick={() => window.open("https://trench-companion.com/", '_blank')} 
        />

        <p className="text-secondary mb-4">
        After months of development the new and improved tool for Trench Crusade is here, the Trench Companion! With a new and improved UI, highly advanced warband builder, and the ability to access warbands across multiple devices, you&apos;re not going to want to miss out!
        </p>
        
        <p className="text-secondary">
        We will keep the Trench Compendium up until October 31st (the spookiest time of year), at which point this site will automatically redirect you to the Trench Companion.
        </p>

        <hr />

      <div className="d-flex justify-content-between align-items-center">
        <Button onClick={() => close()} variant="outline-danger" className="me-2">
          Close
        </Button>
        <Button onClick={() => window.open("https://trench-companion.com/", '_blank')} variant="success" className="shadow">
          Explore Now!
        </Button>
      </div>
    </Alert>
    
    {!show && (
      
      <div className={"floatingButton backgroundtc"}>
      <Button variant="" onClick={() => open()} className="shadow">
        <FontAwesomeIcon icon={faTriangleExclamation} />
        Discover the Update!
      </Button>
      </div>
    )}
  </>
  );
}

export default AlertDismissible;