import {
  Center, FormControl,
  Image, Input,
  Select
} from "@chakra-ui/react";
import React from "react";
import BloodDrop from '../../../../assets/bloodDrop.svg';

let cities = ['Delhi', 'Gurgaon', 'Bangalore', 'Pune', 'Ahmedabad', 'Mumbai', 'Thane', 'Nashik', 'Kolkata', 'Lucknow', 'Noida', 'Faridabad', 'Prayagraj', 'Patna', 'Ranchi', 'Jaipur', 'Agra', 'Chandigarh', 'Nagpur', 'Chennai', 'Bhopal', 'Indore', 'Hyderabad', 'Kerala', 'Bihar', 'Gujarat', 'Maharashtra', 'Karnataka', 'Madhya Pradesh', 'Orissa', 'Uttar Pradesh', 'Telangana', 'Andhra Pradesh', 'Chhatisgarh', 'Tamil Nadu', 'West Bengal', 'Haryana', 'Uttrakhand', 'J&K', 'Himachal Pradesh', 'Jharkhand', 'Rajasthan', 'Goa', 'Assam', 'Punjab', 'Saurashtra & South Gujarat', 'Uttar Pradesh East', 'Uttar Pradesh West', 'Bundelkhand', 'Other']

let bloodgroups = ['O-', 'O+', 'B-', 'B+', 'A-', 'A+', 'AB-', 'AB+']

export default function BloodDonor() {
  return (
    <>
      <Center>
        <Image src={BloodDrop}
          boxSize="100px"
          objectFit="cover"
        />
      </Center>
      <FormControl mt={4}  >
        <Input variant='filled' placeholder=" Name" />
      </FormControl>
      <FormControl mt={4}>
        <Select variant='filled' placeholder="Select City">
          {cities.map(item => {
            return (
              <option value="option1">{item}</option>
            )
          })}
        </Select>
      </FormControl>
      <FormControl mt={4}>
        <Input variant='filled' placeholder="Pin-Code" />
      </FormControl>
      <FormControl mt={4}>
        <Input variant='filled' placeholder="Phone Number" />
      </FormControl>
      <FormControl mt={4}>
        <Select variant='filled' placeholder="Select BloodGroup">
          {bloodgroups.map(item => {
            return (
              <option value="option1">{item}</option>
            )
          })}
        </Select>
      </FormControl>
      <FormControl mt={4}>
        <Input variant='filled' placeholder="Mates Affiliation" />
      </FormControl>
      <FormControl mt={4} >
        <Input variant='filled' placeholder="Date of last of Blood Donation" />
      </FormControl>
    

    
    </>
  )
}
