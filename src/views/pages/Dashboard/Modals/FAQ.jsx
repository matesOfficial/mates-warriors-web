import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton, ModalContent,
  ModalFooter, ModalHeader, ModalOverlay
} from "@chakra-ui/react";

export default function FAQModal() {

  return (
    <div>
      <Modal isOpen={open} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader><Center>{camelToTitle(id)}</Center></ModalHeader>

          <ModalBody pb={6}>
              FAQ
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="orange">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
