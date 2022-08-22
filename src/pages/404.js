import { Link } from 'gatsby'
import React from 'react'
import { HeadMeta } from '../components/HeadMeta'
import MainPageContent from '../components/layout/MainPageContent'

const NotFoundPage = () => (
  <MainPageContent>
    <div className="not-found">
      <div className="container">
        <div className="title">404</div>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        <Link to="/">Go back home</Link>
      </div>
    </div>
  </MainPageContent>
)

export function Head() {
  return <HeadMeta pageTitle="404" />
}

export default NotFoundPage
