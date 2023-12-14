import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  link: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  link,
}) => (
  <div>
    <h1>Hey, {firstName}!</h1> <br />
    <p>
      Password reset link :{" "}
      <a style={{ color: "blue", textDecoration: "none" }} href={link}>
        Reset password now
      </a>{" "}
    </p>
    <br />
    <p>Link valid for only 10 minutes !</p>
  </div>
);
