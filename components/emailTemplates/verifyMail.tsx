import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  link: string;
  project_name: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  link,
  project_name
}) => (
  <div>
    <h1>Hey, {firstName}!</h1> <br />
    <p>
      this mail is sent to verify your e-mail for {project_name} :{" "}
      <a style={{ color: "blue", textDecoration: "none" }} href={link}>
       Verify your e-mail 
      </a>{" "}
    </p>
    <br />
    <p>Link valid for only 10 minutes !</p>
  </div>
);
