import { Box, Button, Flex, Skeleton, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthHook } from "../hooks/useAuthHook";
import useSWR from "swr";
import Note from "./Note";
const Homepage = () => {
  const { isAuthenticated } = useAuthHook();
  const navigate = useNavigate();
  const { data } = useSWR("/notes");

  return isAuthenticated ? (
    <Box p="2">
      <Flex pl="2" alignItems="center" mb="3">
        <Text flex={1}>Note List</Text>
        <Button onClick={() => navigate("/add-todo")}>Add Note</Button>
      </Flex>
      {!data ? (
        <Skeleton height="20"></Skeleton>
      ) : (
        data.map((note) => <Note key={note._id} {...note} />)
      )}
    </Box>
  ) : (
    <Box p="2">Login to see your todos</Box>
  );
};

export default Homepage;
