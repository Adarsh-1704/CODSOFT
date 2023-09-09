import { Box, styled } from "@mui/material";
import React from "react";

const AboutPageWrapper = styled(Box)`
  padding: 40px;
  & > h3,
  & > h5 {
    margin-top: 50px;
  }
`;

const SectionHeading = styled('h1')`
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
`;

const SectionText = styled('p')`
  font-size: 20px;
  color: #555;
  line-height: 2;
  margin-bottom: 20px;
`;

const Banner = styled(Box)`
  background-image: url(https://www.learnworlds.com/app/uploads/2021/02/blogger-cover.png);
  width: 100%;
  height: 40vh;
  background-position: left 0px bottom -100px;
  background-size: cover;
`;

const About = () => {
  return (
    <Box>
      <Banner />
        <AboutPageWrapper>
          <SectionHeading>
            Welcome to BLOGGERS - Your Platform for Blogging and
            Discussion
          </SectionHeading>
          <SectionText>
            At BLOGGERS, we believe in the power of words and the
            strength of community. We've created a vibrant online space where
            individuals from all walks of life can come together to read, write,
            and engage in thoughtful discussions through blogs.
          </SectionText>

          <SectionHeading>What Sets Us Apart</SectionHeading>
          <SectionText>
            <ol>
              <li>
                <strong>Blogging for Everyone:</strong> Whether you're an
                experienced writer, a novice blogger, or someone who simply
                wants to share their thoughts, our platform is open to all. You
                can create and edit your own blogs with ease, making it
                accessible to writers of all skill levels.
              </li>
              <li>
                <strong>Diverse Content:</strong> Our community boasts a wide
                range of interests, ensuring that you'll find blogs on topics
                that matter to you. From tech enthusiasts to foodies,
                fashionistas to travel aficionados, our platform caters to a
                broad spectrum of interests.
              </li>
              <li>
                <strong>Engaging Discussions:</strong> We foster a culture of
                respectful and constructive discussions. Each blog post is
                accompanied by a comments section, where you can express your
                thoughts, offer insights, or ask questions. It's a place where
                ideas are exchanged and connections are made.
              </li>
              <li>
                <strong>User-Friendly Interface:</strong> We understand that
                your time is valuable, so we've designed a user-friendly
                interface that makes it easy to browse, search, and interact
                with content. Our intuitive editor ensures that writing and
                editing blogs is a hassle-free experience.
              </li>
              <li>
                <strong>Privacy and Security:</strong> Your privacy and data
                security are our top priorities. We've implemented robust
                security measures to protect your personal information and
                maintain a safe online environment.
              </li>
            </ol>
          </SectionText>

          <SectionHeading>Join Our Community Today</SectionHeading>
          <SectionText>
            BLOGGERS is more than just a website; it's a community of
            passionate writers and avid readers. We're excited to have you on
            board and look forward to seeing your creativity flourish.
          </SectionText>

          <SectionText>
            Explore, write, discuss, and connect. Welcome to BLOGGERS, where every word counts, and every voice matters.
          </SectionText>

          <SectionText>
            If you have any questions, feedback, or suggestions, please don't
            hesitate to reach out to our dedicated support team. We're here to
            make your experience on BLOGGERS enjoyable and rewarding.
          </SectionText>
        </AboutPageWrapper>
    </Box>
  );
};

export default About;
