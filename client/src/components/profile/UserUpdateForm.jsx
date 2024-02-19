import { Button, Flex, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentUser } from "../../redux/actions/userActions";
import UseResponseHandler from "../utils/UseResponseHandler";

const inputStyle = {
  mb: "25px",
  borderX: "0",
  borderTop: "0",
  borderRadius: "0",
  outline: "none",
};

const UserUpdateForm = ({ ToggleShowDetails }) => {
  const { user } = useSelector((state) => state.userReducer);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { handleResponse } = UseResponseHandler();

  const [EditedDetails, setEditedDetails] = useState({
    name: user?.name,
    email: user?.email,
    mobile: user?.mobile,
  });

  const handleLoading = (val) => setLoading(val);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLoading(true);
    updateCurrentUser(
      EditedDetails,
      dispatch,
      handleLoading,
      handleResponse,
      ToggleShowDetails
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Name"
        onChange={handleInputChange}
        name="name"
        {...inputStyle}
        value={EditedDetails.name}
      />
      <Input
        type="email"
        placeholder="email"
        onChange={handleInputChange}
        name="email"
        {...inputStyle}
        value={EditedDetails.email}
        isRequired
      />
      <Input
        type="tel"
        placeholder="enter your mobile number"
        onChange={handleInputChange}
        name="mobile"
        {...inputStyle}
        value={EditedDetails.mobile}
        isRequired
      />
      <Flex w="full" justify="right">
        <Button
          textAlign={"center"}
          bgColor="rgb(244, 51, 151)"
          variant="outline"
          color={"white"}
          w="fit-content"
          _hover={{ bg: "rgb(199, 60, 157)" }}
          onClick={() => ToggleShowDetails(true)}
        >
          back
        </Button>
        <Button
          textAlign={"center"}
          bgColor="rgb(244, 51, 151)"
          variant="outline"
          color={"white"}
          width={"fit-content"}
          _hover={{ bg: "rgb(199, 60, 157)" }}
          type="submit"
          isLoading={loading}
          isDisabled={
            user?.name === EditedDetails.name &&
            user?.mobile === EditedDetails.mobile &&
            user?.email === EditedDetails.email
          }
        >
          Save Address And Continue
        </Button>
      </Flex>
    </form>
  );
};

export default UserUpdateForm;
