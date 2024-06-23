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

interface emailConfirmationProps {
  link: string;
  websiteUrl?: string;
}

export const emailConfirmation = ({
  websiteUrl = "https://jobconiq.live",
  link
}: emailConfirmationProps) => (
  <Html>
    <Head />
    <Preview>Confirm your email address and get started! 🌏
    </Preview>
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
        <Heading style={h1}>Confirm your email address</Heading>
        <Text style={heroText}>
          Thanks for joining Jobconiq! Please take a second to confirm your email:
        </Text>
        <Button style={button} href={link}>
          Confirm email
        </Button>

        <Text style={heroText}>
          If the button above doesn’t work, just copy the link below and paste it into your browser
        </Text>

        <Link
          href={link}
          target="_blank"
          style={{
            display: "block",
            marginBottom: "16px",
          }}
        >
          {link}
        </Link>

        <Text style={heroText}>
          If you didnt request this email, theres nothing to worry about, you
          can safely ignore it.
        </Text>

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
                        src={`${link}/static/jobconiq-twitter.png`}
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
                        src={`${link}/static/jobconiq-facebook.png`}
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
                        src={`${link}/static/jobconiq-linkedin.png`}
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

export default emailConfirmation;

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
  fontSize: "30px",
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
