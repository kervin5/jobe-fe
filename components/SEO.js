import React from "react";
import NextHead from "next/head";
import { string } from "prop-types";
import appText from "@/lang/appText";

const defaultDescription = "";
const defaultOGURL = "";
const defaultOGImage = "";
const defaultKeywords = `${appText.objects.job.plural}, ${appText.objects.perk.plural}, ${appText.objects.candidate.plural}, ${appText.objects.member.plural}, ${appText.objects.resume.plural}, ${appText.objects.skill.plural}, `;

const Head = (props) => (
  <NextHead>
    <title>{props.title || ""}</title>
    <meta
      name="description"
      content={props.description || defaultDescription}
    />
    <meta name="keywords" content={defaultKeywords + (props.keywords ?? "")} />
    <meta property="og:url" content={props.url || defaultOGURL} />
    <meta property="og:title" content={props.title || ""} />
    <meta
      property="og:description"
      content={props.description || defaultDescription}
    />
    <meta name="twitter:site" content={props.url || defaultOGURL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
  </NextHead>
);

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string,
};

export default Head;
