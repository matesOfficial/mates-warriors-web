import { Button, Center, Heading, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import successSVG from "../../../assets/success.svg";
import { convertDate, db } from "../../../firebase";
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
  const [dbError, setDbError] = useState(null)
  const { curUser } = useAuth();

  useEffect(() => {
    const interval = setInterval(() => { setDbError(null) }, 2000)
    return () => clearInterval(interval)
  }, [dbError])

  const formControl = useForm({
    defaultValues: { phone_number: curUser.phoneNumber },
    mode: "onBlur",
  });

  const { handleSubmit } = formControl;

  const onSubmit = async (data) => {
    console.log(data);
    setIsLoading(true)

    db.collection('users').doc(curUser.uid).update({
      ...data,
      last_blood_donation_date: convertDate(data.last_blood_donation_date)
    })
      .then(() => {
        setRegisterResult(true);
      }).catch(err => {
        setDbError("Can't register as a donor. Please try again later.")
      }).finally(() => setIsLoading(false))
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

          <ModalBody pb={6} className="custom-scroll">
            {(registerResult) ?
              <VStack justify='center'>
                <Image src={successSVG} px={20} py={10} />
                <Heading size="md" color="green" mb={20} >Registered Successfully !</Heading>
              </VStack>
              : getModal(id, formControl)}
          </ModalBody>

          <ModalFooter>
            <VStack justify='center' w="100%">
              {!!dbError &&
                <Text color="red.500" mb="5">{dbError}</Text>
              }
              {!registerResult &&
                <Button colorScheme="orange"
                  isLoading={isLoading}
                  onClick={handleSubmit(onSubmit)}
                >
                  Register as {camelToTitle(id)}
                </Button>
              }
            </VStack>

          </ModalFooter>

        </ModalContent>
      </Modal>
    </div>
  )
}
