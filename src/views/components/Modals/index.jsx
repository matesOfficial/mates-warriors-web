import { Button, Center, Heading, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack } from "@chakra-ui/react";
import { useState } from 'react';
import { useForm } from "react-hook-form";
import successSVG from "../../../assets/success.svg";
import { db } from "../../../firebase";
import { useAuth } from "../../../hooks/AuthContext";
import camelToTitle from "../../../utils/camelToTitle";
import BloodDonor from "./BloodDonor";
import OxygenDonor from "./OxygenDonor";
import PlasmaDonor from "./PlasmaDonor";



const getModal = (id, formControl) => {
  switch (id) {
    case 'bloodDonor':
      return <BloodDonor formControl={formControl} />
    case 'plasmaDonor':
      return <PlasmaDonor formControl={formControl} />
    case 'oxygenDonor':
      return <OxygenDonor formControl={formControl} />
    default:
      return <BloodDonor formControl={formControl} />
  }
}

export default function FormModals({ open, onClose, id }) {

  const [registerResult, setRegisterResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const { curUser } = useAuth();

  const formControl = useForm({
    defaultValues: { phone_number: curUser.phoneNumber },
    mode: "onBlur",
  });

  const { handleSubmit } = formControl;

  const onSubmit = async (data) => {
    console.log(data);
    setIsLoading(true)

    db.collection('users').doc(curUser.uid).set(data).then(() => {
      setRegisterResult(true);
      setIsLoading(false);
    })
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
              : getModal(id, formControl)}
          </ModalBody>

          <ModalFooter>
            {!registerResult &&
              <Button colorScheme="orange"
                isLoading={isLoading}
                onClick={handleSubmit(onSubmit)}
              >
                Register as {camelToTitle(id)}
              </Button>}
          </ModalFooter>

        </ModalContent>
      </Modal>
    </div>
  )
}
