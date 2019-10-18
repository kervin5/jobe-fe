import { useContext } from "react";
import { Card } from "semantic-ui-react";
import { PopUpProvider } from "./PopUpContext";
import PopUpContext from "./PopUpContext";
import Title from "../Title";
import Button from "../Button";

const PopUp = props => {
  const popup = {
    title: props.title,
    setTitle: function(title) {
      this.title = title;
    }
  };
  return (
    props.show && (
      <PopUpProvider value={popup}>
        <PopupContent {...props} />
      </PopUpProvider>
    )
  );
};

function PopupContent({ children, changeHandler }) {
  const popUpContext = useContext(PopUpContext);
  return (
    <div className="PopUp">
      <div className="Content">
        <Card>
          <Card.Header>
            <Title inline>{popUpContext.title}</Title>
            <Button
              onClick={() => changeHandler(false)}
              iconOnly
              icon="close"
              float={"right"}
            />
          </Card.Header>
          <Card.Content>{children}</Card.Content>
        </Card>
      </div>
      <style jsx>{`
        .PopUp {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: rgba(0, 0, 0, 0.4);
          z-index: 199;
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
  );
}

PopUp.defaultProps = { title: "" };

export default PopUp;
