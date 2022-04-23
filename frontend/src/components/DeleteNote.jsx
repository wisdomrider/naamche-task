import React, { useEffect } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { useLoadingHook } from "../hooks/useLoadingHook";
import { parseBackendErrors } from "../utils/parseBackendErrors";
import axios from "../configs/axiosConfig";
import { useLocation, useNavigate } from "react-router-dom";
import { useSWRConfig } from "swr";
const DeleteModal = () => {
  const [selectedId, setSelectedId] = React.useState(null);
  const { start, end, isLoading } = useLoadingHook();
  const showToast = useToast();
  const query = useLocation().search;
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();
  useEffect(() => {
    if (query === "") return;
    setSelectedId(new URLSearchParams(query).get("id"));
  }, [query]);

  const deleteNote = async () => {
    try {
      start();
      await axios.delete(`/notes/${selectedId}`);
      showToast({
        title: "Success",
        description: "Note deleted successfully",
        status: "success",
      });
      mutate("/notes");
      navigate("/");
    } catch (err) {
      parseBackendErrors(err, showToast);
    } finally {
      end();
    }
  };

  const onClose = () => {
    navigate("/");
  };
  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Note?</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this note? This action cannot be
          undone.
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={deleteNote}
            isLoading={isLoading}
            isDisabled={isLoading}
            variantColor="red"
            mr={3}
          >
            Delete
          </Button>
          <Button onClick={onClose} variant="ghost">
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
