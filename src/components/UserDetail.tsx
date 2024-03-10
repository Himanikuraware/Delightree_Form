import { Box, Heading } from "@chakra-ui/react";
import React from "react";

interface UserDetailProps {
  data: {
    firstName: string;
    lastName: string;
    contact: string;
    email: string;
    gender: {
      label: string;
      value: string;
    } | null;
    dob: string;
    tech: {
      value: string;
    }[];
  };
}

const UserDetail: React.FC<UserDetailProps> = ({ data }) => {
  return (
    <Box
      maxW="75%"
      borderWidth="1px"
      borderRadius="lg"
      p={6}
      m="auto"
      mt={10}
      height="50%"
      bgColor={"#d6d4f3"}
    >
      <Heading textAlign="center" fontSize={"25px"} mt={4}>
        First Name: {data?.firstName}
      </Heading>
      <Heading textAlign="center" fontSize={"25px"} mt={4}>
        Last Name: {data?.lastName}
      </Heading>
      <Heading textAlign="center" fontSize={"25px"} mt={4}>
        Contact: {data?.contact}
      </Heading>
      <Heading textAlign="center" fontSize={"25px"} mt={4}>
        Email: {data?.email}
      </Heading>
      <Heading textAlign="center" fontSize={"25px"} mt={4}>
        Gender: {data?.gender?.label}
      </Heading>
      <Heading textAlign="center" fontSize={"25px"} mt={4}>
        Date of Birth: {data?.dob}
      </Heading>
      <Heading textAlign="center" fontSize={"25px"} mt={4}>
        Tech: {data?.tech.map((item: any) => item.value).join(", ")}
      </Heading>
    </Box>
  );
};

export default UserDetail;
