import React from "react";
import styled from "styled-components";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";

const shareObjects = {
  Facebook: {
    color: "#3b5998",
    Button: FacebookShareButton,
    Icon: FacebookIcon,
  },
  LinkedIn: {
    color: "rgb(0, 127, 177)",
    Button: LinkedinShareButton,
    Icon: LinkedinIcon,
  },
  Twitter: {
    color: "rgb(0, 172, 237);",
    Button: TwitterShareButton,
    Icon: TwitterIcon,
  },
  Whatsapp: {
    color: "#25D366",
    Button: WhatsappShareButton,
    Icon: WhatsappIcon,
  },
  Email: { color: "#7f7f7f", Button: EmailShareButton, Icon: EmailIcon },
};

const StyledShareButtons = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

const StyledShareButton = styled.div`
  background-color: ${(props) => props.mainColor};
  padding: 0 20px 0 10px;
  border-radius: 25px;
  overflow: hidden;
  transition: 100ms;
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
  @media (max-width: 700px) {
    padding: 0;
    .Label {
      display: none;
    }
  }
  & > * {
    display: flex;
    align-items: center;
    justify-items: center;
    .Label {
      color: ${(props) => props.theme.lightColor} !important;
      font-size: 0.8em;
    }
  }
`;

const Share = ({ url }) => {
  return (
    <StyledShareButtons className="ShareButtons">
      {Object.entries(shareObjects).map(
        ([ShareServiceName, ShareService], index) => {
          return (
            <StyledShareButton
              key={ShareServiceName + index}
              mainColor={ShareService.color}
            >
              <ShareService.Button url={url}>
                <ShareService.Icon
                  size={40}
                  bgStyle={{ fill: ShareService.color }}
                />
                <span className="Label">{ShareServiceName}</span>
              </ShareService.Button>
            </StyledShareButton>
          );
        }
      )}
    </StyledShareButtons>
  );
};

export default Share;
