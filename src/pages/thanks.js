import React from "react";
import { HeadMeta } from '../components/HeadMeta'
import MainPageContent from "../components/layout/MainPageContent";
import PageHeader from "../components/layout/PageHeader";

const Thanks = () => (
  <PageHeader title="Thanks">
    <MainPageContent>
      Thanks to all the people that helped and guided me along the way. Those who pulled me out of my comfort zone, who helped me understand the complexities of the world, and those who gave me the motivation to keep going.
    </MainPageContent>
  </PageHeader>
)

export default Thanks

export function Head() {
  return <HeadMeta pageTitle="Thanks" />
}
