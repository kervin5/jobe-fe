import React, { useState } from "react";
import Link from "next/link";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import appText from "@/lang/appText";
import TableGraphql from "@/common/UI/Tables/TableGraphqlWithQuery";
import {
  CANDIDATES_QUERY,
  CANDIDATES_CONNECTION_QUERY,
} from "@/graphql/queries/candidates";

import DropdownGraphqlInput from "@/common/UI/Input/CustomInput/DropdownGraphqlInput";

const Candidates = (props) => {
  const [skills, setSkills] = useState([]); //TODO: Allow multiple selection of skills

  return (
    <TableGraphql
      dataQuery={CANDIDATES_QUERY}
      countQuery={CANDIDATES_CONNECTION_QUERY}
      variables={{ ...(skills.length ? { skills } : {}) }}
      searchFilter={(value) => ({ query: value })}
      rowFormat={(candidate, queries) => {
        const hasResume = candidate.resumes.length > 0;
        const resumeSkills = candidate.resumes[0].skills.slice(0, 5);

        return {
          name: candidate.name,
          email: <a href={`mailto:${candidate.email}`}>{candidate.email}</a>,
          phone: candidate.phone,
          title: hasResume ? (
            candidate.resumes[0].title
          ) : (
            <p>{appText.messages.resume.doesntHave}</p>
          ),
          "Active Applications": candidate.applications?.filter((app) => {
            return app.status !== "HIRED" && app.status !== "ARCHIVED";
          }).length,
          skills: resumeSkills.map((skill) => (
            <Chip
              label={skill.name}
              color="primary"
              key={`SkillTag${skill.name + new Date()}`}
            />
          )),

          resume: hasResume && (
            <Button
              color="default"
              onClick={(e) => {
                e.preventDefault();
                window.open(
                  "/resumes/" + candidate?.resumes[0]?.file?.path?.split("/")?.pop()
                );
              }}
            >
              {appText.actions.download} {appText.objects.resume.singular}
            </Button>
          ),
          actions: (
            <Link
              href="/admin/candidates/[cid]"
              as={`/admin/candidates/${candidate.id}`}
              passHref
            >
              <IconButton
                aria-label="ver perfil"
                as="a"
                color="primary"
                href={`/admin/candidates/${candidate.id}`}
              >
                <VisibilityIcon />
              </IconButton>
            </Link>
          ),
        };
      }}
      toolbar={
        <DropdownGraphqlInput
          onChange={(e, data) => {
            setSkills(data.value);
          }}
          
          name="jobSkills"
          placeholder={
            appText.actions.filterBy + " " + appText.objects.skill.plural
          }
          multiple
          label="Habilidades"
          minWidth={"150px"}
          graphql={{
            query: `query ALL_SKILLS( $query: String! ) { skills(where: {name: {contains: $query}} orderBy: {name: asc}) { id name } }`,
          }}
        />
      }
    />
  );
};

export default Candidates;
