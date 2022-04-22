import { Avatar, Button, Flex, Heading, useToast } from "@chakra-ui/react";
import React from "react";
import { useAuthHook } from "../hooks/useAuthHook";
import { useNavigate } from "react-router-dom";
const Topbar = () => {
  let navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuthHook();

  const showToast = useToast();

  const logoutUser = () => {
    logout();
    showToast({
      title: "Success",
      description: "You have successfully logged out.",
      status: "success",
    });
  };

  return (
    <Flex height="16" bg="red.100" alignItems="center" p="2">
      <Heading onClick={() => navigate("/")}>Notes</Heading>
      <Flex flex={1}></Flex>
      {isAuthenticated ? (
        <>
          <Avatar name={user.name} size="sm" />
          <Button onClick={logoutUser} ml="2">
            Logout
          </Button>
        </>
      ) : (
        <>
          <Button onClick={() => navigate("/login")} ml="2">
            Login
          </Button>
          <Button onClick={() => navigate("/register")} ml="2">
            Register
          </Button>
        </>
      )}
    </Flex>
  );
};

export default Topbar;
