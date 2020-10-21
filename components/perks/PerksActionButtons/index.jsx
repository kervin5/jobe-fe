import React from "react";
import styled from "styled-components";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ActivatePerkButton from "./ActivatePerkButton";
import InactivatePerkButton from "./InactivatePerkButton";

const StyledPerkActionButtons = styled.div`
  width: 100%;
`;

const PerksActionButtons = ({ perk, refetchQueries }) => {
  return (
    <StyledPerkActionButtons className="PerksActionButton">
      <ButtonGroup>
        {perk.status === "ACTIVE" ? (
          <InactivatePerkButton
            perkId={perk.id}
            message={`Are you sure that you want to delete the perk "${perk.name}"?`}
            refetchQueries={refetchQueries || []}
          />
        ) : (
          <ActivatePerkButton
            perkId={perk.id}
            message={`Are you sure that you want to activate the perk "${perk.name}" ?`}
            refetchQueries={refetchQueries || []}
          />
        )}
      </ButtonGroup>
    </StyledPerkActionButtons>
  );
};

export default PerksActionButtons;
