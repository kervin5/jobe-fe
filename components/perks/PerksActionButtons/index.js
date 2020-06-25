import React from "react";
import { Button } from "semantic-ui-react";
import ActivatePerkButton from "./ActivatePerkButton";
import InactivatePerkButton from "./InactivatePerkButton";

const PerksActionButtons = ({ perk, refetchQueries }) => {
  return (
    <div className="PerksActionButton">
      <Button.Group>
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
      </Button.Group>
      <style jsx>{`
        .PerksActionButton {
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default PerksActionButtons;
