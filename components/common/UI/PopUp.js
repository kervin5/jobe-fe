import Title from "./Title";
import { Card } from "semantic-ui-react";
import Button from "./Button";

const PopUp = props => {
  return (
    props.show && (
      <div className="PopUp">
        <div className="Content">
          <Card>
            <Card.Header>
              <Title inline>{props.title || ""}</Title>
              <Button
                click={() => props.changeHandler(false)}
                iconOnly
                icon="close"
                float={"right"}
              />
            </Card.Header>
            <Card.Content>{props.children}</Card.Content>
          </Card>
        </div>
        <style jsx>{`
          .PopUp {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: 99;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .PopUp :global(.card) {
            width: 100% !important;
            max-width: 500px;
          }

          .PopUp :global(.card .header) {
            margin: 10px;
          }

          .Content {
            z-index: 999;
            position: relative;
          }
        `}</style>
      </div>
    )
  );
};

export default PopUp;
