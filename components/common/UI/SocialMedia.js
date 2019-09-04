import React from "react";
import Title from "./Title";
import { Button, Icon } from "semantic-ui-react";

const socialMedia = props => {
  const url = props.url;
  const shareServices = {
    facebook: {
      name: "Facebook",
      url: "https://www.facebook.com/sharer/sharer.php?u="
    },
    twitter: {
      name: "Twitter",
      url:
        "https://twitter.com/intent/tweet?text=Look%20at%20this%20amazing%20opportunity!%20"
    },
    linkedin: {
      name: "LinkedIn",
      url: "https://www.linkedin.com/shareArticle?mini=true&url="
    },
    mailto: {
      name: "Email",
      url: "mailto:change@thisaddress.com?&subject=&body=",
      icon: "mail outline",
      color: "grey"
    }
  };
  let newUrl = url.replace(" ", "-");

  return (
    <div className="SocialButtons">
      <Title size="s">Share this Job:</Title>
      <div className="DesktopSocial">
        <Button.Group>
          {Object.keys(shareServices).map((serviceName, index) => {
            const serviceData = shareServices[serviceName];
            return (
              <Button
                color={serviceData.color || serviceName}
                as="a"
                target="_blank"
                href={serviceData.url + newUrl}
                key={serviceName + index}
              >
                <Icon name={serviceData.icon || serviceName} />{" "}
                {serviceData.name}
              </Button>
            );
          })}
        </Button.Group>
      </div>
      <div className="MobileSocial">
        {Object.keys(shareServices).map((serviceName, index) => {
          const serviceData = shareServices[serviceName];
          return (
            <Button
              circular
              color={serviceData.color || serviceName}
              as="a"
              target="_blank"
              href={serviceData.url + newUrl}
              key={serviceName + index + "Mobile"}
              icon={serviceData.icon || serviceName}
            />
          );
        })}
      </div>
      <style jsx>{`
        @media (min-width: 720px) {
          .MobileSocial {
            display: none;
          }
        }

        @media (max-width: 720px) {
          .DesktopSocial {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default socialMedia;
