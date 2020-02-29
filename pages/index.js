import React from "react";
import Head from "next/head";
import Prismic from "prismic-javascript";
import { get } from "lodash";
import PrismicClient from "../transport/prismic";

const Home = ({ data }) => {
  console.log(data);
  return (
    <>
      <div>
        <div>
          <h2>{data.site_title}</h2>
        </div>
        <div>
          <h1>{data.top_blurb}</h1>
          <a href={get(data, "resume.url")} target="_blank" className="button">
            {data.resume_link_text}
          </a>
        </div>
        <div>
          <h3>{data.about_section_title}</h3>
          <p>{data.about_section_text}</p>
          <a
            href={data.about_section_button_url}
            target="_blank"
            className="button"
          >
            {data.about_section_button_text}
          </a>
        </div>
        <div>
          <h3>{data.social_links_title}</h3>
          <div>
            {data.social_links.map((link, index) => {
              return (
                <div key={index}>
                  <a
                    href={`${link.email ? "mailto:" : ""}${link.url}`}
                    target={link.email ? "_self" : "_blank"}
                  >
                    {link.text}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <span className="bottom-text">{data.bottom_text}</span>
        </div>
      </div>
      <style jsx global>{`
        body {
          background-color: ${data.background_color};
          color: ${data.text_color} !important;
        }

        h1 {
          font-family: bennet-banner, serif;
          font-size: 60px;
          font-weight: 600;
        }

        h2 {
          font-family: aktiv-grotesk, sans-serif;
          font-style: italic;
          text-transform: uppercase;
          font-size: 36px;
          font-weight: 700;
        }

        h3 {
          font-family: aktiv-grotesk, sans-serif;
          font-style: italic;
          text-transform: uppercase;
          font-size: 36px;
          font-weight: 500;
        }

        p {
          font-family: bennet-banner, serif;
          font-size: 30px;
          font-weight: 400;
        }

        a {
          font-family: bennet-banner, serif;
          font-size: 30px;
          font-weight: 400;
          color: ${data.text_color} !important;
        }

        a:visited {
          color: ${data.text_color} !important;
        }

        a.button {
          font-family: aktiv-grotesk, sans-serif;
          text-transform: uppercase;
          font-size: 24px;
          font-weight: 500;
          text-decoration: none;
          display: inline-block;
          border: 3px solid ${data.text_color};
          padding: 10px 25px;
        }

        span.bottom-text {
          font-family: aktiv-grotesk, sans-serif;
          font-style: italic;
          text-transform: uppercase;
          font-size: 24px;
          font-weight: 500;
        }
      `}</style>
    </>
  );
};

Home.getInitialProps = async () => {
  const pageData = await PrismicClient.query(
    Prismic.Predicates.at("document.type", "home_page")
  );

  return {
    data: get(pageData, "results[0].data")
  };
};

export default Home;
