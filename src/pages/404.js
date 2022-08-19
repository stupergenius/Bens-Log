import React from 'react'
import { HeadMeta } from '../components/HeadMeta'

const NotFoundPage = () => (
  <div>
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </div>
)

export function Head() {
  return <HeadMeta pageTitle="404" />
}

export default NotFoundPage
