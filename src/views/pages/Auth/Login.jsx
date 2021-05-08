import { Alert, AlertDescription, AlertIcon } from '@chakra-ui/alert'
import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { PhoneIcon } from '@chakra-ui/icons'
import { Image } from '@chakra-ui/image'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input'
import { Box, Center, Divider, Flex, Text, VStack } from '@chakra-ui/layout'
import { useMediaQuery } from '@chakra-ui/media-query'
import { Collapse } from '@chakra-ui/transition'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import androidLogo from "../../../assets/Icons/android.svg"
import appleLogo from "../../../assets/Icons/apple.svg"
import LoginSVG from '../../../assets/login.svg'
import mauLogo from '../../../assets/logos.svg'
import { useAuth } from '../../../hooks/AuthContext'
import { formatPhoneNumber, validatePhone } from '../../../utils/regex'

const styles = {
  alert: { position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', width: 'fit-content' }
}

function Login() {
  const [mobileInput, setMobileInput] = useState('')
  const [otpInput, setOtpInput] = useState('')
  const [error, setError] = useState(null)

  const { login, firebaseError, otpSent, submitOtp, isLoading } = useAuth();

  const [sm] = useMediaQuery("(max-width: 1024px)")

  useEffect(() => {
    if (mobileInput && !mobileInput?.startsWith("+")) {
      setMobileInput(p => "+91" + p)
    }
  }, [mobileInput])

  useEffect(() => {
    const interval = setInterval(() => setError(null), 2000)
    return clearInterval(interval)
  }, [error, otpSent])

  const handlePhone = async (e) => {
    e.preventDefault();

    if (otpSent) {
      if (!otpInput) return
      await submitOtp(otpInput)
    }
    else {
      if (validatePhone(mobileInput)) {
        await login(mobileInput);
      } else setError("Please enter valid phone number");
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
      {!!firebaseError &&
        <Alert status="error" style={styles.alert}>
          <AlertIcon />
          <AlertDescription>{firebaseError.split(".")[0]}</AlertDescription>
        </Alert>
      }
      <div id="recaptcha-verifier-container"></div>
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
                  <form>
                    <FormControl id="mobile" isRequired>
                      <FormLabel >Enter Mobile Number</FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<PhoneIcon color="gray.300" />}
                        />
                        <Input size="md" variant="filled"
                          type="tel"
                          placeholder="Phone Number"
                          isInvalid={!!error}
                          value={mobileInput}
                          onChange={e => setMobileInput(e.target.value)}
                        />
                      </InputGroup>
                    </FormControl>
                    <br />
                    <FormControl id="otp" isRequired>
                      <Collapse in={otpSent} animateOpacity>
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
                      isLoading={isLoading}
                      isDisabled={(otpSent && !otpInput)}
                      type="submit"
                      onClick={handlePhone}
                    >
                      {!otpSent ? "Get OTP" : "Proceed"}
                    </Button>
                    <Flex align="center">
                      <Divider my="4" flex="1" />
                      <Text color="gray.500" mx='4'>OR</Text>
                      <Divider my="4" flex="1" />
                    </Flex>
                  </form>

                </Box>

                {/* <Center> */}
                <Flex width="100%" justify="center" direction={sm ? 'column' : 'row'}>
                  <Button leftIcon={<Image src={androidLogo} boxSize="20px" objectFit="scale-down" />}
                    colorScheme="whatsapp" my="2" as={Link}
                    to={'https://mait.ac.in/images/mates_warriors_v1.0.0.apk'}
                  >
                    Download Android App
                  </Button>
                </Flex>
                {/* </Center> */}

                <br />
                <br />
                <Center>
                  <VStack spacing='2'>
                    <Text fontSize="sm">Intiative By</Text>
                    <Image
                      src={mauLogo}
                      width="75%"

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
