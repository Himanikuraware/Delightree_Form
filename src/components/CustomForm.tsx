import React, { useState } from "react";
import { isAfter, differenceInYears } from "date-fns";
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
  InputLeftAddon,
  Spinner,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";

import { Select } from "chakra-react-select";
import UserDetail from "./UserDetail";

const CustomForm: React.FC = () => {
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [showUserDetail, setShowUserDetail] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    control,
    getValues,
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

  const validateDate = (value: string) => {
    const currentDate = new Date();

    if (isNaN(Date.parse(value))) {
      return "Invalid date format. Please enter a valid date.";
    }

    const enteredDate = new Date(value);

    if (isAfter(enteredDate, currentDate)) {
      return "Date cannot be a future date.";
    }

    const age = differenceInYears(currentDate, enteredDate);

    if (age < 10) {
      return "Date must be at least 10 years older than the current date.";
    }

    return true;
  };

  const formData = isValid ? getValues() : null;

  const onSubmit = async (data: any) => {
    setIsFormSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsFormSubmitting(false);
    setShowUserDetail(true);
  };

  return (
    <>
      <Heading textAlign="center" fontSize={"25px"} mt={4}>
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
              <FormControl isInvalid={errors.firstName && true}>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  {...register("firstName", {
                    required: "First name is required.",
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message:
                        "First name is incorrect. Please use alphabets only.",
                    },
                  })}
                  placeholder="Enter First Name"
                />

                <FormErrorMessage color="red">
                  {errors.firstName && errors.firstName.message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.lastName && true}>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  {...register("lastName", {
                    required: "Last name is required.",
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message:
                        "Last name is incorrect. Please use alphabets only.",
                    },
                  })}
                  placeholder="Enter Last Name"
                />

                <FormErrorMessage color="red">
                  {errors.lastName && errors.lastName.message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>
          </Grid>

          <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={6}>
            <GridItem>
              <FormControl isInvalid={errors.contact && true}>
                <FormLabel>Contact Number</FormLabel>
                <InputGroup>
                  <InputLeftAddon>+91</InputLeftAddon>
                  <Input
                    placeholder="Enter contact number"
                    type="text"
                    {...register("contact", {
                      required: "Mobile number is required.",
                      pattern: {
                        value: /^\d{10}$/,
                        message:
                          "Mobile format is incorrect. Please enter a valid 10-digit number.",
                      },
                    })}
                  />
                </InputGroup>
                <FormErrorMessage color="red">
                  {errors.contact && errors.contact.message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.email && true}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  {...register("email", {
                    required: "Email is required.",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message:
                        "Email format is incorrect. Please enter a valid email address.",
                    },
                  })}
                  placeholder="Enter email"
                />
                <FormErrorMessage color="red">
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>
          </Grid>

          <Heading size="md" mt={6} mb={4}>
            Other Information
          </Heading>

          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <GridItem w="100%" h="10">
              <FormControl isInvalid={errors.gender && true}>
                <Controller
                  control={control}
                  name="gender"
                  rules={{ required: "Please select gender" }}
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => (
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
                <FormErrorMessage color="red">
                  Gender is required.
                </FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem w="100%" h="10">
              <FormControl isInvalid={errors.dob && true}>
                <FormLabel>Date of Birth</FormLabel>
                <Input
                  type="date"
                  {...register("dob", {
                    required: "Date of birth is required.",
                    pattern: {
                      value: /^\d{4}-\d{2}-\d{2}$/,
                      message:
                        "Invalid date. Please enter a valid date in the format YYYY-MM-DD.",
                    },
                    validate: validateDate,
                  })}
                />
                <FormErrorMessage color="red">
                  {errors.dob && errors.dob.message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>
          </Grid>

          <Heading size="md" mt={16} mb={4}>
            Tech Stack
            <AddIcon
              fontSize={17}
              onClick={() => append({ value: "" })}
              cursor="pointer"
              ml={2}
            />
          </Heading>

          {fields.map((tech, index) => (
            <Grid mt={5} templateColumns="repeat(2, 1fr)" gap={6} key={tech.id}>
              <GridItem w="100%" h="10">
                <FormControl
                  isInvalid={errors.tech && errors.tech[index] && true}
                >
                  <InputGroup>
                    <Input
                      placeholder="Enter Tech Stack"
                      type="text"
                      {...register(`tech.${index}.value` as const, {
                        required: true,
                      })}
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
                  <FormErrorMessage color="red">
                    Tech {index + 1} is required
                  </FormErrorMessage>
                </FormControl>
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
              {isFormSubmitting ? <Spinner /> : "Submit"}
            </Button>
          </Grid>
        </form>
      </Box>

      {isValid && formData && showUserDetail && <UserDetail data={formData} />}
    </>
  );
};

export default CustomForm;
