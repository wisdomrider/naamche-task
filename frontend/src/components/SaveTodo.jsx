import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import axios from "../configs/axiosConfig";
import { useLoadingHook } from "../hooks/useLoadingHook";
import { parseBackendErrors } from "../utils/parseBackendErrors";
import { useLocation, useNavigate } from "react-router-dom";

const SaveTodo = () => {
  const { end, isLoading, start } = useLoadingHook();
  const [content, setContent] = useState("");
  const [sharedWith, setSharedWith] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const showToast = useToast();
  const query = useLocation().search;
  const navigate = useNavigate();

  const loadOptions = async (text) => {
    const userNames = await axios.get("/users/names/" + text);
    return userNames.data.map((user) => ({
      value: user._id,
      label: user.username,
    }));
  };

  const saveNote = async (e) => {
    e.preventDefault();
    try {
      start();
      let body = {
        content,
        sharedWith: sharedWith.map((user) => user.value),
      };
      if (selectedId) body._id = selectedId;
      await axios.post("/notes/save", body);
      showToast({
        title: "Success",
        description: `Note ${selectedId ? "edited" : "added"} successfully`,
        status: "success",
      });
      navigate("/");
    } catch (e) {
      parseBackendErrors(e, showToast);
    } finally {
      end();
    }
  };

  useEffect(() => {
    if (query === "") return;
    const id = new URLSearchParams(query).get("id");
    axios.get("/notes/" + id).then((res) => {
      setSelectedId(res.data._id);
      setContent(res.data.content);
      setSharedWith(
        res.data.sharedWith.map((user) => ({
          value: user._id,
          label: user.username,
        }))
      );
    });
  }, [query]);

  return (
    <form onSubmit={saveNote}>
      <Container p="3" mt="3">
        <Heading>{selectedId ? "Edit" : "Add"} Note </Heading>

        <FormControl mt="4">
          <FormLabel>Note</FormLabel>
          <Textarea
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter your note"
          ></Textarea>
        </FormControl>
        <FormControl mt="4">
          <FormLabel>Share With(Type user username)</FormLabel>
          <AsyncSelect
            value={sharedWith}
            onChange={(e) => setSharedWith(e)}
            isMulti={true}
            loadOptions={loadOptions}
          />
        </FormControl>
        <Button
          type="submit"
          isLoading={isLoading}
          isDisabled={isLoading}
          mt="4"
          bg="blue.300"
          color="white"
        >
          {selectedId ? "Edit" : "Add"} Note
        </Button>
      </Container>
    </form>
  );
};

export default SaveTodo;
