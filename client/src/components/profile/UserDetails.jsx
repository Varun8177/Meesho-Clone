import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import ProfilePhoto from "./ProfilePhoto";
import ProfileDetails from "./ProfileDetails";
import UserUpdateForm from "./UserUpdateForm";

const UserDetails = () => {
  const [showDetails, setShowDetails] = useState(true);
  const ToggleShowDetails = (val) => setShowDetails(val);

  return (
    <Box alignItems={"center"}>
      <ProfilePhoto />
      {showDetails ? (
        <ProfileDetails ToggleShowDetails={ToggleShowDetails} />
      ) : (
        <UserUpdateForm ToggleShowDetails={ToggleShowDetails} />
      )}
    </Box>
  );
};

export default UserDetails;
