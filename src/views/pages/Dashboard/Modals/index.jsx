import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  Center,
  FormControl,
  Image,
  Input,
  Select,
  Stack,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Formik,
  Form,
  Field,
  validateName,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import camelToTitle from "../../../../utils/camelToTitle";
import { cities } from "../../../../utils/cities";
import { bloodgroups } from "../../../../utils/bloodgroups";

import BloodDrop from "../../../../assets/bloodDrop.svg";
import OxygenDrop from "../../../../assets/oxygen.svg";
import PlasmaDrop from "../../../../assets/plasmaDrop.svg";
import {v4 as uuid} from "uuid";
import firebase from 'firebase';
import {db} from '../../../.././firebase' 

function FormModals({ open, onClose, id }) {
  
  const [scrollBehavior, setScrollBehavior] = useState("inside");
  const [modalBody, setModalBody] = useState();
  
  useEffect(() => {
    getModalBody(id);
    reset();
  }, [id]);


  // ----------------------------react form setup------------------
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  
  // -------------------------------------on submit function-----------------------------------------------
  const onSubmit = (data) => {
    console.log(data);
   
      db.collection("users").add(data);
  


  };

  //----------------css for input box--------------------------------------------------------------------
  const cssOfInput = {
    width: "100%",
    background: "#edf2f7",
    border: "1px ",
    padding: "5px 16px",
    borderRadius: "10px",
    font: "1rem 20px Arial",
    transition: "all 0.2s ease 0s",
  };

//--------------------------------------------------to get the modal body---------------------------------------------
  const getModalBody = (id) => {
    var modalBody;
    //(id=1  for blood donor)
    if (id === "bloodDonor") {
      modalBody = (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Center>
            <Image src={BloodDrop} boxSize="100px" objectFit="cover" />
          </Center>
         
          <FormControl mt={4}>
            <input
              style={cssOfInput}
              type="text"
              placeholder="Name"
              {...register("name", { required: true, maxLength: 80 })}
            />
          </FormControl>
          <FormControl mt={4}>
            <input
              style={cssOfInput}
              type="tel"
              placeholder="Phone Number"
              {...register("phone_number", {
                required: true,
                minLength: 6,
                maxLength: 12,
              })}
            />
          </FormControl>
          <FormControl mt={4}>
            <select
              style={cssOfInput}
              {...register("blood_group", { required: true })}
            >
              <option value="">Blood Group</option>;
              {bloodgroups.map((item) => {
                return <option value={item}>{item}</option>;
              })}
            </select>
          </FormControl>
          <FormControl mt={4}>
            <select
              {...register("city", { required: true, maxLength: 100 })}
              style={cssOfInput}
              variant="filled"
            >
              <option value="">Select City</option>;
              {cities.map((item) => {
                return <option value={item}>{item}</option>;
              })}
            </select>
          </FormControl>
          <FormControl mt={4}>
            <input
              style={cssOfInput}
              type="number"
              placeholder="Pin-Code"
              {...register("pin_code", { required: true, maxLength: 100 })}
            />
          </FormControl>

          <FormControl mt={4}>
            <select
              placeholder="Mates Affiliation"
              style={cssOfInput}
              {...register("mates_affiliation", { required: true })}
            >
                            <option value="">Mates Affiliation</option>

              <option value="Student">Student</option>
              <option value="Alumni">Alumni</option>
              <option value="Faculty">Faculty</option>
              <option value="Administrative Staff">Administrative Staff</option>
              <option value="Trustee">Trustee</option>
              <option value="Other">Other</option>
            </select>
          </FormControl>

          <FormControl mt={4}>
            <input
              style={cssOfInput}
              type="date"
              {...register("last_blood_donation_timestamp", {
                required: true,
              })}
            />
          </FormControl>
          <FormControl mt={10}>
          <ModalFooter>
          <Button type="submit" colorScheme="orange">Register as {camelToTitle(id)}</Button>
             </ModalFooter>
          </FormControl>
        </form>
      );
    }

    // --------------------------------------------------this is for plasma donor-----------------------------
    if (id === "plasmaDonor") {
      modalBody = (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Center>
            <Image src={PlasmaDrop} boxSize="100px" objectFit="cover" />
          </Center>
          <FormControl mt={4}>
        <FormLabel>Check Eligibility</FormLabel>
        < input type ="checkbox" {...register("eligibilityCheck",{required:true})}/>
          <span style={{marginLeft:"5px"}}>
          I am eligible for plasma donation


          </span>
      </FormControl>
          <FormControl mt={4}>
            <input
              style={cssOfInput}
              type="text"
              placeholder="Name"
              {...register("name", { required: true, maxLength: 80 })}
            />
          </FormControl>
          <FormControl mt={4}>
            <input
              style={cssOfInput}
              type="tel"
              placeholder="Phone Number"
              {...register("phone_number", {
                required: true,
                minLength: 6,
                maxLength: 12,
              })}
            />
          </FormControl>
          <FormControl mt={4}>
            <select
              style={cssOfInput}
              {...register("blood_group", { required: true })}
            >
              <option value="">Blood Group</option>;
              {bloodgroups.map((item) => {
                return <option value={item}>{item}</option>;
              })}
            </select>
          </FormControl>
          <FormControl mt={4}>
            <select
              {...register("city", { required: true, maxLength: 100 })}
              style={cssOfInput}
              variant="filled"
            >
              <option value="">Select City</option>;
              {cities.map((item) => {
                return <option value={item}>{item}</option>;
              })}
            </select>
          </FormControl>
          <FormControl mt={4}>
            <input
              style={cssOfInput}
              type="number"
              placeholder="Pin-Code"
              {...register("pin_code", { required: true, maxLength: 100 })}
            />
          </FormControl>

          <FormControl mt={4}>
            <select
              placeholder="Mates Affiliation"
              style={cssOfInput}
              {...register("mates_affiliation", { required: true })}
            >
             <option value="">Mates Affiliation</option>
              <option value="Student">Student</option>
              <option value="Alumni">Alumni</option>
              <option value="Faculty">Faculty</option>
              <option value="Administrative Staff">Administrative Staff</option>
              <option value="Trustee">Trustee</option>
              <option value="Other">Other</option>
            </select>
          </FormControl>

          <FormControl mt={4}>
            <input
              style={cssOfInput}
              type="date"
              {...register("last_blood_donation_timestamp", {
                required: true,
              })}
            />
          </FormControl>
          <FormControl mt={10}>
          <ModalFooter>
          <Button type="submit" colorScheme="orange">Register as {camelToTitle(id)}</Button>
             </ModalFooter>
          </FormControl>
        </form>
      );
    }

    //-------------------------------------------------this is for oxygen donor-------------------------
    if (id === "oxygenDonor") {
      modalBody = (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Center>
            <Image src={OxygenDrop} boxSize="100px" objectFit="cover" />
          </Center>
          <FormControl mt={4}>
            <select
              style={cssOfInput}
              placeHolder="What do you want to donate"
              {...register("supply_type", { required: true })}
            >
              <option value="">What do you want to donate</option>;
              <option value="Oxygen Cylinder">Oxygen Cylinder</option>
              <option value="Oxygen Concentrator">Oxygen Concentrator</option>
            </select>
          </FormControl>
          <FormControl mt={4}>
            <input
              style={cssOfInput}
              type="text"
              placeholder="Name"
              {...register("name", { required: true, maxLength: 80 })}
            />
          </FormControl>
          <FormControl mt={4}>
            <input
              style={cssOfInput}
              type="tel"
              placeholder="Phone Number"
              {...register("phone_number", {
                required: true,
                minLength: 6,
                maxLength: 12,
              })}
            />
          </FormControl>
          
          <FormControl mt={4}>
            <select
              {...register("city", { required: true, maxLength: 100 })}
              style={cssOfInput}
              variant="filled"
            >
              <option value="">Select City</option>;
              {cities.map((item) => {
                return <option value={item}>{item}</option>;
              })}
            </select>
          </FormControl>
          <FormControl mt={4}>
            <input
              style={cssOfInput}
              type="number"
              placeholder="Pin-Code"
              {...register("pin_code", { required: true, maxLength: 100 })}
            />
          </FormControl>

          <FormControl mt={4}>
            <select
              placeholder="Mates Affiliation"
              style={cssOfInput}
              {...register("mates_affiliation", { required: true })}
            >
                            <option value="">Mates Affiliation</option>

              <option value="Student">Student</option>
              <option value="Alumni">Alumni</option>
              <option value="Faculty">Faculty</option>
              <option value="Administrative Staff">Administrative Staff</option>
              <option value="Trustee">Trustee</option>
              <option value="Other">Other</option>
            </select>
          </FormControl>

          <FormControl mt={4}>
            <input
              style={cssOfInput}
              type="number"
              placeHolder="Quantity of product"
              {...register("quantity", {
                required: true,
              })}
            />
          </FormControl>
          <FormControl mt={10}>
            <ModalFooter>
          <Button type="submit" colorScheme="orange">Register as {camelToTitle(id)}</Button>
             </ModalFooter>
          </FormControl>
        </form>
      );
    }
    setModalBody(modalBody);
  };
  
  return (
    <div>
      <Modal isOpen={open} onClose={onClose} scrollBehavior={scrollBehavior}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>
            <Center>{camelToTitle(id)}</Center>
          </ModalHeader>

          <ModalBody pb={6}>{modalBody}</ModalBody>
          
        </ModalContent>
      </Modal>
    </div>
  );
}

export default FormModals;
