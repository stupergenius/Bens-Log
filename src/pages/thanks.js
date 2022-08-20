import React from "react";
import { HeadMeta } from '../components/HeadMeta'
import MinPageContent from "../components/layout/MainPageContent";

const Thanks = () => (
  <>
    <header className="header">
      <h1 className="header-title center" itemprop="headline">Thanks.</h1>
      <MinPageContent>
        Thanks to all the people that helped and guided me along the way. Those who pulled me out of my comfort zone, who helped me understand the complexities of the world, and those who gave me the motivation to keep going.
      </MinPageContent>
    </header>
  </>
)

export default Thanks

export function Head() {
  return <HeadMeta pageTitle="Thanks" />
}
