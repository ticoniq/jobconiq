import {
  Body,
  Container,
  Column,
  Button,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface jobApplicationEmailProps {
  email: string,
  fullName: string,
  title: string,
  phone: string,
  resume: string
  websiteUrl?: string;
}

export const jobApplicationEmail = ({
  email,
  fullName,
  title,
  phone,
  resume,
  websiteUrl,
}: jobApplicationEmailProps) => (
  <Html>
    <Head />
    <Preview>Your application for the {title} job was submitted successfully.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
          <Img
            src={`${websiteUrl}/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.524f6004.png&w=256&q=75`}
            alt="JobConiq Logo"
            width={160}
            height={32}
          />
        </Section>
        <Heading style={h1}>Your application for the {title} job was submitted successfully.</Heading>
        <Text
          style={{
            display: "block",
            marginBottom: "16px",
          }}
        >
          {"Here's a copy of your application data for safekeeping."}
        </Text>

        <Text style={heroText}>
          Personal information
        </Text>

        <Section>
          <Row>
            <Column>
              <Text
                style={{
                  display: "block",
                  marginBottom: "16px",
                }}
              >
                Name
              </Text>
            </Column>
            <Column>
              <Text
                style={{
                  display: "block",
                  marginBottom: "16px",
                }}
              >
                {fullName}
              </Text>
            </Column>
          </Row>
          <Row>
            <Column>
              <Text
                style={{
                  display: "block",
                  marginBottom: "16px",
                }}
              >
                Email
              </Text>
            </Column>
            <Column>
              <Text
                style={{
                  display: "block",
                  marginBottom: "16px",
                }}
              >
                {email}
              </Text>
            </Column>
          </Row>
          <Row>
            <Column>
              <Text
                style={{
                  display: "block",
                  marginBottom: "16px",
                }}
              >
                Phone
              </Text>
            </Column>
            <Column>
              <Text
                style={{
                  display: "block",
                  marginBottom: "16px",
                }}
              >
                {phone}
              </Text>
            </Column>
          </Row>
          <Row>
            <Column>
              <Text
                style={{
                  display: "block",
                  marginBottom: "16px",
                }}
              >
                Resume
              </Text>
            </Column>
            <Column>
              <Link href={resume}>Resume</Link>
            </Column>
          </Row>
        </Section>

        <Section>
          <Row style={footerLogos}>
            <Column style={{ width: "66%" }}>
              <Img
                src={`${websiteUrl}/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.524f6004.png&w=256&q=75`}
                alt="JobConiq Logo"
                width={160}
                height={32}
              />
            </Column>
            <Column>
              <Section>
                <Row>
                  <Column>
                    <Link href="/">
                      <Img
                        src={`${websiteUrl}/static/jobconiq-twitter.png`}
                        width="32"
                        height="32"
                        alt="jobconiq"
                        style={socialMediaIcon}
                      />
                    </Link>
                  </Column>
                  <Column>
                    <Link href="/">
                      <Img
                        src={`${websiteUrl}/static/jobconiq-facebook.png`}
                        width="32"
                        height="32"
                        alt="jobconiq"
                        style={socialMediaIcon}
                      />
                    </Link>
                  </Column>
                  <Column>
                    <Link href="/">
                      <Img
                        src={`${websiteUrl}/static/jobconiq-linkedin.png`}
                        width="32"
                        height="32"
                        alt="jobconiq"
                        style={socialMediaIcon}
                      />
                    </Link>
                  </Column>
                </Row>
              </Section>
            </Column>
          </Row>
        </Section>

        <Section>
          <Link
            style={footerLink}
            href={`${websiteUrl}/`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Our blog
          </Link>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <Link
            style={footerLink}
            href={`${websiteUrl}/legal`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Policies
          </Link>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <Link
            style={footerLink}
            href={`${websiteUrl}/help`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Help center
          </Link>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <Link
            style={footerLink}
            href={`${websiteUrl}/Community`}
            target="_blank"
            rel="noopener noreferrer"
            data-auth="NotApplicable"
            data-linkindex="6"
          >
            jobconiq Community
          </Link>
          <Text style={footerText}>
            ©2022 Jobconiq, LLC, a Salesforce company.<br />
            <br />
            All rights reserved.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default jobApplicationEmail;

const footerText = {
  fontSize: "12px",
  color: "#b7b7b7",
  lineHeight: "15px",
  textAlign: "left" as const,
  marginBottom: "50px",
};

const footerLink = {
  color: "#b7b7b7",
  textDecoration: "underline",
};

const footerLogos = {
  marginBottom: "32px",
  paddingLeft: "8px",
  paddingRight: "8px",
  width: "100%",
};

const socialMediaIcon = {
  display: "inline",
  marginLeft: "32px",
};

const main = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "0px 20px",
};

const logoContainer = {
  marginTop: "32px",
};

const h1 = {
  color: "#1d1c1d",
  fontSize: "25px",
  fontWeight: "700",
  margin: "30px 0",
  padding: "0",
  lineHeight: "42px",
};

const heroText = {
  fontSize: "20px",
  lineHeight: "28px",
  marginBottom: "30px",
};

const button = {
  backgroundColor: "#007ee6",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};
