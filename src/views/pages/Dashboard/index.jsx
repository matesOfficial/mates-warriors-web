import { Button } from '@chakra-ui/button'
import { ChevronDownIcon, ChevronUpIcon, LinkIcon } from '@chakra-ui/icons'
import { Image } from '@chakra-ui/image'
import { Link as Alink, Avatar, Box, Collapse, Divider, Flex, Heading, HStack, Text, Tooltip, VStack, Wrap, WrapItem } from "@chakra-ui/react"
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import BloodDrop from '../../../assets/bloodDrop.svg'
import Doctor from '../../../assets/doctor.svg'
import FAQ from '../../../assets/faq.svg'
import DonorLogo from '../../../assets/Icons/health-care.svg'
import TakerLogo from '../../../assets/Icons/organ-donation.svg'
import YoutubeIcon from '../../../assets/Icons/youtube.svg'
import Organ from '../../../assets/organ.svg'
import Oxygen from '../../../assets/oxygen.svg'
import PlasmaDrop from '../../../assets/plasmaDrop.svg'
import Footer from '../../components/Footer'
import FormModals from '../../components/Modals'
import NavBar from '../../components/NavBar'

const DonorLayer = {
  'bloodDonor': { name: 'Blood', image: BloodDrop, disabled: false },
  'plasmaDonor': { name: 'Plasma', image: PlasmaDrop, disabled: false },
  'oxygenDonor': { name: 'Oxygen', image: Oxygen, disabled: true },
  'consultancy': { name: 'Consultancy', image: Doctor, disabled: true },
  'organDonor': { name: 'Organ', image: Organ, disabled: true },
}

export default function Dashboard() {
  const [openModal, setOpenModal] = useState(null);
  const [isDonor, setIsDonor] = useState(false);

  // const [recentDonors, setRecentDonors] = useState([])

  // const getRecentDonors = async () => {
  //   const snapshot = await db.collection('users').limit(4).get()
  //   return snapshot.docs.map(doc => doc.data());
  // }

  // useEffect(() => {
  //   getRecentDonors().then((data) => {
  //     setRecentDonors(data);
  //   })
  // }, [])

  const closeModal = () => { setOpenModal(null) };

  return (
    <Flex direction="column" minH="100vh">
      {/* NAVBAR */}
      <FormModals
        open={!!openModal}
        onClose={closeModal}
        id={openModal}
      />
      <NavBar />
      {/* MAIN DASHBOARD */}

      <Box position="absolute" bottom="8" right="8" >
        <Tooltip label="FAQ" >
          <Avatar size="md" m="1"
            as="a"
            href="https://youtu.be/Zm4ptkIXlTA"
            target="_blank"
            showBorder="true"
            src={FAQ}
          />
        </Tooltip>
      </Box>

      <Box mx="auto" my="8" flex="1" >
        <Box p="6" w={{ base: '99vw', md: '90vw' }}
          borderWidth="1px" borderRadius="lg" bgColor="#fff"
        >
          <Flex flexDirection='column'>
            <Button style={{ display: 'flex', justifyContent: 'space-between' }}
              size="lg"
              isFullWidth
              rightIcon={isDonor ? <ChevronUpIcon boxSize="1.5em" /> : <ChevronDownIcon boxSize="1.5em" />}
              onClick={() => setIsDonor(p => !p)}
            >
              <HStack spacing="5">
                <Image boxSize="1.5rem" src={DonorLogo} />
                <Heading size="md" flex="1"
                  color={!isDonor ? "grey" : 'default'}
                >
                  Become a Donor
                </Heading>
              </HStack>
            </Button>
            <Collapse in={isDonor}>
              <Box my='6' mx='2'>
                <Wrap spacing='10' justify={{ base: "center", sm: "start" }}>
                  {Object.keys(DonorLayer).map(type => (
                    <Tooltip key={type} isDisabled={!DonorLayer[type].disabled}
                      label="Coming Soon" fontSize="md"
                    >
                      <WrapItem flex="1" maxW="10rem">
                        <Button flex="1"
                          onClick={() => setOpenModal(type)}
                          isDisabled={DonorLayer[type].disabled}
                          variant="outline"
                          _focus={{ borderColor: "var(--chakra-colors-yellow-400)" }}
                          borderWidth='2px' borderColor='rgba(238, 238, 238, 1)'
                          p='12px' minH='8rem' minW='8rem'
                        >
                          <VStack spacing={4} >
                            <Image
                              src={DonorLayer[type].image}
                              boxSize="4rem" objectFit="scale-down"
                            />
                            <Text>{DonorLayer[type].name}</Text>
                          </VStack>
                        </Button>
                      </WrapItem>
                    </Tooltip>
                  ))}
                </Wrap>
              </Box>
            </Collapse>

            <Divider width='85vw' my="4" align='center' mx="auto" />

            <Button style={{ display: 'flex', justifyContent: 'space-between' }}
              size="lg"
              isFullWidth
              rightIcon={!isDonor ? <ChevronUpIcon boxSize="1.5em" /> : <ChevronDownIcon boxSize="1.5em" />}
              onClick={() => setIsDonor(p => !p)}
            >
              <HStack spacing="5">
                <Image boxSize="1.5rem" src={TakerLogo} />
                <Heading size="md" flex="1"
                  color={isDonor ? "grey" : 'default'}
                >
                  Looking for Donor
                </Heading>
              </HStack>
            </Button>
            <Collapse in={!isDonor}>
              <Box my='6' mx='2'>
                <Wrap spacing='10' justify={{ base: "center", sm: "start" }} >
                  {Object.keys(DonorLayer).map(type => (
                    <Tooltip key={type} isDisabled={!DonorLayer[type].disabled}
                      label="Coming Soon" fontSize="md"
                    >
                      <WrapItem flex="1" maxW="10rem">
                        <Button flex="1"
                          isDisabled={DonorLayer[type].disabled}
                          as={Link}
                          to={`/donors?type=${type}`}
                          variant="outline"
                          _focus={{ borderColor: "var(--chakra-colors-yellow-400)" }}
                          borderWidth='2px' borderColor='rgba(238, 238, 238, 1)'
                          p='12px' minH='8rem' minW='8rem'
                        >
                          <VStack spacing={4} >
                            <Image
                              src={DonorLayer[type].image}
                              boxSize="4rem" objectFit="scale-down"
                            />
                            <Text>{DonorLayer[type].name}</Text>
                          </VStack>
                        </Button>
                      </WrapItem>
                    </Tooltip>
                  ))}
                </Wrap>

                {/* <VStack display={{ base: 'none', xl: 'block' }}>
                  <HStack spacing={6} mt='6' mb="3" ml="1"  >
                    <Text size="sm" >Try our most recent and verified leads</Text>
                  </HStack>
                  <HStack spacing='10' height='100%' >
                    {recentDonors.map((rd, idx) => (
                      <Box p='5' key={idx} borderWidth="1px" height='100%' width="18vw" borderRadius="lg"
                        backgroundColor={rd.is_blood_donor ? '#FFF5F5' : "FFFFF0"}
                      >
                        <Text fontWeight="bold" isTruncated mb={2} >{rd.is_blood_donor ? 'Blood' : "Plasma"} Available</Text>

                        <Text fontSize="14px" isTruncated ><i>Name :</i> <b>{rd.name}</b></Text>
                        <Text fontSize="14px" isTruncated ><i>Phone No. :</i> <b>{rd.phone_number}</b></Text>
                        <Text fontSize="14px" isTruncated ><i>Blood Group :</i> <b>{rd.blood_group}</b></Text>
                        <Text fontSize="14px" isTruncated ><i>Location :</i> <b>{rd.city}, {rd.state}</b></Text>
                      </Box>
                    ))}
                  </HStack>
                </VStack> */}

              </Box>
            </Collapse>
          </Flex>
        </Box>
      </Box>


      {/* Footer */}
      <Footer />
    </Flex>
  )
}
