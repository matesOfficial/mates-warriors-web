import { Box, Button, Center, Heading, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack } from "@chakra-ui/react";
import { useState } from 'react';

import successSVG from "../../../assets/success.svg";
import camelToTitle from "../../../utils/camelToTitle";
import BloodDonor from "./BloodDonor";
import OxygenDonor from "./OxygenDonor";
import PlasmaDonor from "./PlasmaDonor";

const getModal = (id) => {
  switch (id) {
    case 'bloodDonor':
      return <BloodDonor />
    case 'plasmaDonor':
      return <PlasmaDonor />
    case 'oxygenDonor':
      return <OxygenDonor />
    default:
      return <BloodDonor />
  }
}

export default function FormModals({ open, onClose, id }) {

  const [registerResult, setRegisterResult] = useState(false);


  const handleSubmit = () => {
    setRegisterResult(true)

    // SEND TO FIREBASE HERE
    // see blooddonor  and do same with plsama donor


  }

  return (
    <div>
      <Modal isOpen={open} onClose={() => { onClose(); setRegisterResult(false); }} autoFocus={false}
        scrollBehavior="inside" preserveScrollBarGap={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader><Center>{camelToTitle(id)}</Center></ModalHeader>

          <ModalBody pb={6}>
            {(registerResult) ?
              <VStack justify='center'>
                <Image src={successSVG} px={20} py={10} />
                <Heading size="md" color="green" mb={20} >Registered Successfully !</Heading>
              </VStack>
              : getModal(id)}
          </ModalBody>

          <ModalFooter>
            {!registerResult &&
              <Button colorScheme="orange" onClick={handleSubmit}>
                Register as {camelToTitle(id)}
              </Button>}
          </ModalFooter>

        </ModalContent>
      </Modal>
    </div>
  )
}
