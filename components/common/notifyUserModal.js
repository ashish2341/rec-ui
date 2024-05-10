"use client"
import { useEffect, useState } from "react";
import { Button, Modal } from "flowbite-react";

const NotifyUserModal = () => {
    const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const isBannerAlreadyShown = sessionStorage.getItem('showBanner')
    var timer;
    if(!isBannerAlreadyShown){
        timer = setTimeout(() => {
          sessionStorage.setItem('showBanner','yes')
            setOpenModal(true);
        }, 10000); 
    }
     

    return () => clearTimeout(timer); 
  }, []);

  return (
    <>
        <Modal dismissible className="bg-transparent/[.5]" show={openModal} onClose={ () => setOpenModal(false)}>
        <Modal.Header>Message</Modal.Header>
        <Modal.Body>
          <div>
           <h1>Welcome to Rec Jaipur Property</h1>
           
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-small rounded-lg text-sm w-full sm:w-auto px-2.5 py-0.75 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            onClick={() => setOpenModal(false)}
            
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NotifyUserModal;
