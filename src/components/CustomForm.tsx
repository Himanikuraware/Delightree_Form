import React, { ChangeEvent, useEffect, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  Button,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Menu,
  Grid,
  GridItem,
  Input,
  Heading,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  InputLeftAddon,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";

import {
  AsyncCreatableSelect,
  AsyncSelect,
  CreatableSelect,
  Select,
} from "chakra-react-select";

const CustomForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setError,
    control,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      contact: "",
      email: "",
      gender: null,
      dob: "",
      tech: [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "tech",
    control,
  });

  const onSubmit = (data: any) => {

    setTimeout(() => {
      console.log(data, 'dataaa'); 
    }, 3000);
  };

  return (
    <>
      <Heading textAlign="center" fontSize="xl" mt={4}>
        User Details
      </Heading>
      <Box
        maxW="75%"
        borderWidth="1px"
        borderRadius="lg"
        p={6}
        m="auto"
        mt={10}
        height="auto"
        bgColor={"#d6d4f3"}
      >
        <Heading size="md" mb={4}>
          Basic Details
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <GridItem>
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                {...register("firstName", { required: true })}
                placeholder="Enter First Name"
              />
              {errors.firstName && <span>First name is required.</span>}
            </GridItem>
            <GridItem>
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                {...register("lastName", { required: true })}
                placeholder="Enter Last Name"
              />
              {errors.lastName && <span>Last name is required.</span>}
            </GridItem>
          </Grid>

          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <GridItem>
              <FormLabel>Contact Number</FormLabel>
              <InputGroup>
                <InputLeftAddon>+91</InputLeftAddon>
                <Input
                  placeholder="Enter contact number"
                  type="text"
                  {...register("contact", { required: true })}
                />
              </InputGroup>
              {errors.contact && <span>Contact number is required.</span>}
            </GridItem>
            <GridItem>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                {...register("email", { required: true })}
                placeholder="Enter email"
              />
              {errors.email && <span>Email is required.</span>}
            </GridItem>
          </Grid>

          <Heading size="md" mt={6} mb={4}>
            Other Information
          </Heading>

          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <GridItem w="100%" h="10">
              <Controller
                control={control}
                name="gender"
                rules={{ required: "Please select gender" }}
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <>
                    <FormLabel>Gender</FormLabel>
                    <Menu>
                      <Select
                        name={name}
                        value={value}
                        onBlur={onBlur}
                        ref={ref}
                        onChange={(e) => {
                          onChange(e);
                        }}
                        placeholder="Select Gender"
                        colorScheme="purple"
                        selectedOptionStyle="check"
                        options={[
                          { label: "Male", value: "male" },
                          { label: "Female", value: "female" },
                          { label: "Other", value: "other" },
                        ]}
                      />
                    </Menu>
                  </>
                )}
              />
              {errors.gender && <span>Please select gender</span>}
            </GridItem>
            <GridItem w="100%" h="10">
              <FormLabel>Date of Birth</FormLabel>
              <Input type="date" {...register("dob", { required: true })} />
              {errors.dob && <span>Date of Birth is required.</span>}
            </GridItem>
          </Grid>

          <Heading size="md" mt={14} mb={4}>
            Tech Stack
            <AddIcon
              fontSize={17}
              onClick={() => append({ value: "" })}
              cursor="pointer"
            />
          </Heading>

          {fields.map((tech, index) => (
            <Grid mt={5} templateColumns="repeat(2, 1fr)" gap={6} key={tech.id}>
              <GridItem w="100%" h="10">
                <InputGroup>
                  <Input
                    placeholder="Enter Tech Stack"
                    type="text"
                    {...register(`tech.${index}.value` as const, {
                      required: true,
                    })}
                    // value={tech}
                  />
                  {index !== 0 && (
                    <InputRightElement>
                      <CloseIcon
                        cursor="pointer"
                        onClick={() => remove(index)}
                      />
                    </InputRightElement>
                  )}
                </InputGroup>
                {errors.tech && errors.tech[index] && (
                  <span>Tech {index + 1} is required</span>
                )}
              </GridItem>
            </Grid>
          ))}

          <Grid mt={20}>
            <Button
              type="submit"
              colorScheme="purple"
              size="md"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default CustomForm;
