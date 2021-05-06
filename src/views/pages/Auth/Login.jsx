import { Alert, AlertDescription, AlertIcon } from '@chakra-ui/alert'
import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { AddIcon, PhoneIcon } from '@chakra-ui/icons'
import { Image } from '@chakra-ui/image'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input'
import { Divider, VStack } from '@chakra-ui/layout'
import { Box, Center, Flex, Text } from '@chakra-ui/layout'
import { useMediaQuery } from '@chakra-ui/media-query'
import { Collapse } from '@chakra-ui/transition'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import LoginSVG from '../../../assets/login.svg'
import mauLogo from '../../../assets/MAU-logo.png'
import androidLogo from "../../../assets/Icons/android.svg"
import appleLogo from "../../../assets/Icons/apple.svg"
import { userLogin, setCurUser } from '../../../store/auth'
import { validatePhone } from '../../../utils/regex'

const styles = {
  alert: { position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', width: 'fit-content' }
}

function Login() {
  const [openOtp, setOpenOtp] = useState(false)
  const [mobileInput, setMobileInput] = useState('')
  const [otpInput, setOtpInput] = useState('')
  const [error, setError] = useState(null)
  const history = useHistory();

  const [sm] = useMediaQuery("(max-width: 1024px)")

  const dispatch = useDispatch();

  useEffect(() => {
    if (!openOtp) setTimeout(() => setError(null), 2000)
  }, [error, openOtp])

  const handleSubmit = (e) => {
    e.preventDefault();
    validatePhone(mobileInput) ? setOpenOtp(true) : setError("Please enter valid phone number");

    if (openOtp) {
      dispatch(setCurUser(mobileInput))
      history.push('/')
    }
  }

  return (
    <>
      {!!error &&
        <Alert status="error" style={styles.alert}>
          <AlertIcon />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      }
      <Center minH="100vh">
        <Box w='75vw' borderWidth="1px" borderRadius="lg" minH="80vh"
          bgColor="#fff"
        >
          <Flex direction={sm ? 'column' : 'row'}>
            <Center w={sm ? "100%" : '50%'} minH={sm ? "" : '80vh'}>
              <Image src={LoginSVG}
                boxSize={sm ? '200px' : "500px"}
                objectFit="cover"
              />
            </Center>

            <Box flex="1" p={sm ? '2rem' : '4rem'}>
              <VStack justify='space-between' h="100%">
                <Box width="100%">
                  <FormControl id="mobile" isRequired>
                    <FormLabel >Enter Mobile Number</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<PhoneIcon color="gray.300" />}
                      />
                      <Input size="md" variant="filled"
                        type="tel"
                        placeholder="+91 xxxxxxxxxx"
                        isInvalid={!!error}
                        value={mobileInput}
                        onChange={e => setMobileInput(e.target.value)}
                      />
                    </InputGroup>
                  </FormControl>
                  <br />
                  <FormControl id="otp" isRequired>
                    <Collapse in={openOtp} animateOpacity>
                      <FormLabel >Enter OTP</FormLabel>
                      <InputGroup >
                        <Input size="md" variant="filled"
                          placeholder="OTP"
                          value={otpInput}
                          onChange={e => setOtpInput(e.target.value)}
                        />
                      </InputGroup>
                      <br />
                    </Collapse>
                  </FormControl>

                  <Button
                    my="1rem"
                    width="100%"
                    colorScheme="yellow"
                    onClick={handleSubmit}
                  >
                    {!openOtp ? "Get OTP" : "Proceed"}
                  </Button>
                  <Flex align="center">
                    <Divider my="4" flex="1" />
                    <Text color="gray.500" mx='4'>OR</Text>
                    <Divider my="4" flex="1" />
                  </Flex>
                </Box>

                <Flex width="100%" justify="space-between" direction={sm ? 'column' : 'row'}>
                  <Button leftIcon={<Image src={androidLogo} boxSize="20px" objectFit="scale-down" />}
                    colorScheme="whatsapp" my="2"
                  >
                    Download Android App
                  </Button>
                  <Button leftIcon={<Image src={appleLogo} boxSize="20px" objectFit="scale-down" />}
                    colorScheme="blackAlpha" my="2"
                  >
                    Download iOS App
                  </Button>
                </Flex>

                <br />
                <br />
                <Center>
                  <VStack spacing={0}>
                    <Text fontSize="sm">Intiative By</Text>
                    <Image
                      src={mauLogo}
                      boxSize="80px"
                      objectFit="scale-down"
                    />
                  </VStack>
                </Center>
              </VStack>
            </Box>
          </Flex>
        </Box>
      </Center>
    </>
  )
}

export default Login
