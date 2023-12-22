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
  <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: 'auto', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
    <h1 style={{ color: '#333', textAlign: 'center' }}>Hey, {firstName}!</h1>
    <p style={{ color: '#555' }}>
      This email is sent to verify your email for {project_name}. Please click the following link to verify your email address:
    </p>
    <a href={link} style={{ color: 'blue', textDecoration: 'none', display: 'inline-block', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', borderRadius: '3px', margin: '10px 0', fontSize: '16px', cursor: 'pointer' }}>
      Verify your email
    </a>
    <p style={{ color: '#555' }}>The link is valid for only 10 minutes.</p>
  </div>
);
