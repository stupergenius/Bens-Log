import React from 'react'
import { useSiteMetadata } from '../hooks/use-site-metadata'

export const HeadMeta = ({ pageTitle, description, pathname, children }) => {
  const { title, description: defaultDescription, image, siteUrl, twitterUsername } = useSiteMetadata()
  const seo = {
    title: pageTitle == null
    ? title
    : `${pageTitle} | ${title}`,
    siteTitle: title,
    description: description || defaultDescription,
    image: `${image}`,
    url: `${siteUrl}${pathname || ``}`,
    twitterUsername,
  }

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:creator" content={seo.twitterUsername} />

      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="application-name" content={seo.siteTitle} />
      <meta name="apple-mobile-web-app-status-bar-style" content="#fff" />
      <meta name="apple-mobile-web-app-title" content={seo.siteTitle} />
      <meta name="theme-color" content="#2c2c2c" />

      <script>{`
        function initTheme(state) {
          var body = document.body;
          var data = body.getAttribute("data-theme");

          if (state === "dark") {
            body.setAttribute("data-theme", "dark");
          } else if (state === "light") {
            body.removeAttribute("data-theme");
          } else {
            localStorage.setItem("theme", data);
          }
        }

        initTheme(localStorage.getItem("theme"));
      `}</script>

      {children}
    </>
  )
}