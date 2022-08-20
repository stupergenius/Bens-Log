import React from "react";
import Link from 'gatsby-link'
import { HeadMeta } from '../components/HeadMeta'
import ProfilePic from '../components/ProfilePic'
import PageHeader from "../components/layout/PageHeader";
import MainPageContent from "../components/layout/MainPageContent";

const About = () => (
  <>
    <PageHeader title="Colophon" />
    <div className="author" style={{margin: 0}}>
      <ProfilePic />
    </div>
    <MainPageContent>
      <p>I'm an iOS developer by trade, and otherwise identify as a husband, cyclist, vegan and nerd. Technology is my life, and mobile technology is where I choose to direct my focus. Mobile technology is how the world interacts, and so being at the forefront of this trend is equal parts challenging and rewarding.</p>
      <p>I'm not currently looking for work, but I always <Link to="/contact">welcome connections</Link>.</p>
    </MainPageContent>
  </>
)

export default About

export function Head() {
  return <HeadMeta pageTitle="About Me" />
}
