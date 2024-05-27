"use client"
import { useEffect, useState } from "react";
import { Button, Modal } from "flowbite-react";
import Link from "next/link";

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
        <Modal.Header>Welcome to <span className="blueText">REC</span> Jaipur Property</Modal.Header>
        <Modal.Body className="overflow-y-auto max-h-80">
          <div>
           <img
            src="../../img/AstrologyBanner.png"
            />
           <h1 className="mt-2 text-lg font-semibold">Unlock Your Dream Home: Tailored Properties for Every Zodiac Sign</h1>
           <p>Aligning Stars with Homes: Finding Your Perfect Property Match by Zodiac Signs</p>
           <p>
                Let your astrological guide unveil homes that resonate with your cosmic energy, blending the celestial with the terrestrial in perfect harmony.
           </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
        <Link href="/#zodiac-id">
          <Button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-small rounded-lg text-sm w-full sm:w-auto px-2.5 py-0.75 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            onClick={() => setOpenModal(false)}

          >
            Click Here
          </Button>
        </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NotifyUserModal;
