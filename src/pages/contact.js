import React from 'react'
import { HeadMeta } from '../components/HeadMeta'
import MainPageContent from '../components/layout/MainPageContent'
import PageHeader from '../components/layout/PageHeader'

const Contact = () => (
  <>
    <PageHeader title="Contact" />
    <MainPageContent>
      <p>Feel free to get at me at one of the following sites::</p>
      <ul>
        <CI><a href="https://twitter.com/benatbensnider">Twitter</a></CI>
        <CI><a href="https://github.com/stupergenius">GitHub</a></CI>
        <CI><a href="https://www.linkedin.com/in/bensnider">LinkedIn</a></CI>
        <CI><a href="https://stackoverflow.com/users/265648/bensnider">Stack Overflow</a></CI>
        <CI><a href="https://coderwall.com/bensnider">Coderwall</a></CI>
      </ul>
    </MainPageContent>
  </>
)

const CI = ({children}) => (
  <li style={{ marginBottom: '0.25rem' }}>
    {children}
  </li>
)

export default Contact

export function Head() {
  return <HeadMeta pageTitle="Contact" />
}
