"use client";

import React from "react";

import { Card, Col, Row, Typography } from "antd";
import { Flex } from "antd/lib";

import PageTitle from "@/components/PageTitle";
import { BACKEND_REPO, FRONTEND_REPO, LOG_URL, SWAGGER_URL } from "@/configs/serveo";

const { Title, Link } = Typography;

const ReadmePage = () => {
  return (
    <>
      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <PageTitle title="Readme" />
      </Flex>
      <Row gutter={16}>
        <Col span={12}>
          <Card
            title={
              <Flex justify="space-between" align="center">
                <Title level={2} style={{ margin: "8px 0" }}>
                  Backend
                </Title>
                <Link href={BACKEND_REPO} target="_blank" rel="noopener noreferrer">
                  [Repo]
                </Link>
              </Flex>
            }
          >
            <Title level={3}>Stack used</Title>
            <ul>
              <li>Node.js with NestJS + Express.js</li>
              <li>MongoDB with Mongoose</li>
              <li>Authentication with JWT and Passport.js</li>
              <li>
                Logging with Winston{" "}
                <Link href={LOG_URL} target="_blank" rel="noopener noreferrer">
                  [Logs]
                </Link>{" "}
                Login: admin, Password: scraping_admin
              </li>
              <li>
                API documentation with Swagger{" "}
                <Link href={SWAGGER_URL} target="_blank" rel="noopener noreferrer">
                  [Link]
                </Link>
              </li>
              <li>Environment configuration with @nestjs/config</li>
              <li>Validation with class-validator and class-transformer</li>
              <li>Cron jobs with @nestjs/schedule</li>
            </ul>

            <Title style={{ marginTop: 16 }} level={3}>
              Key Features
            </Title>
            <ul>
              <li>User registration and login with JWT authentication</li>
              <li>CRUD operations for companies and sites</li>
              <li>Web scraping functionality</li>
              <li>Paginated API responses</li>
              <li>Secure cookie handling for refresh tokens</li>
              <li>Automated cleanup of expired tokens with cron jobs</li>
            </ul>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title={
              <Flex justify="space-between" align="center">
                <Title level={2} style={{ margin: "8px 0" }}>
                  Frontend
                </Title>
                <Link href={FRONTEND_REPO} target="_blank" rel="noopener noreferrer">
                  [Repo]
                </Link>
              </Flex>
            }
          >
            <Title level={3}>Stack used</Title>
            <ul>
              <li>React with Next.js framework</li>
              <li>Axios + TanStack Query for API requests</li>
              <li>Ant Design for UI components</li>
              <li>React Hook Form for form handling</li>
              <li>State management with Zustand</li>
              <li>Internationalization with next-intl</li>
              <li>Custom hooks for pagination and API interactions</li>
              <li>Modals for user interactions</li>
            </ul>

            <Title style={{ marginTop: 16 }} level={3}>
              Key Features
            </Title>
            <ul>
              <li>User authentication and protected routes</li>
              <li>Dashboard with manual scraping trigger</li>
              <li>Scraping history for pair company and site</li>
              <li>Companies management with create functionality</li>
              <li>Sites management with paginated listing</li>
              <li>User management</li>
            </ul>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ReadmePage;
