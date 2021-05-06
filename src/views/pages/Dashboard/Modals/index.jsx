import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton, ModalContent,
  ModalFooter, ModalHeader, ModalOverlay
} from "@chakra-ui/react";
import camelToTitle from "../../../../utils/camelToTitle";
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
  }
}

export default function FormModals({ open, onClose, id }) {

  return (
    <div>
      <Modal isOpen={open} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader><Center>{camelToTitle(id)}</Center></ModalHeader>

          <ModalBody pb={6}>
            {getModal(id)}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="orange">
              Register as {camelToTitle(id)}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
