import React from "react";
import Head from "next/head";
import Prismic from "prismic-javascript";
import { get } from "lodash";
import PrismicClient from "../transport/prismic";

const Home = ({ data }) => {
  return (
    <>
      <Head>
        <title>Lizzie Fulham</title>
      </Head>
      <div className="container">
        <div>
          <h2>{data.site_title}</h2>
        </div>
        <div className="content-section">
          <h1>{data.top_blurb}</h1>
          <div className="button-container">
            <a
              href={get(data, "resume.url")}
              target="_blank"
              className="button"
            >
              {data.resume_link_text}
            </a>
          </div>
        </div>
        <div className="content-section">
          <h3>{data.about_section_title}</h3>
          <p>{data.about_section_text}</p>
          <div className="button-container">
            <a
              href={data.about_section_button_url}
              target="_blank"
              className="button"
            >
              {data.about_section_button_text}
            </a>
          </div>
        </div>
        <div className="content-section">
          <h3>{data.social_links_title}</h3>
          <div className="social-links-section">
            {data.social_links.map((link, index) => {
              return (
                <div key={index} className="social-link">
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
        <div className="bottom-text-container">
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
          color: ${data.text_color};
        }

        a:visited {
          color: ${data.text_color};
        }

        .button-container {
          padding-top: 30px;
          padding-bottom: 70px;
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
          float: right;
        }

        a.button:hover {
          background-color: ${data.text_color};
          color: ${data.background_color};
        }

        span.bottom-text {
          font-family: aktiv-grotesk, sans-serif;
          font-style: italic;
          text-transform: uppercase;
          font-size: 24px;
          font-weight: 500;
        }

        .container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 20px 40px;
          padding-right: 60px;
        }

        .content-section {
          margin-left: 12%;
          margin-top: 100px;
          padding-bottom: 30px;
          position: relative;
        }

        .content-section::before {
          content: "";
          border-bottom: solid 3px ${data.text_color};
          width: 100%;
          position: absolute;
          right: calc(100% + 50px);
          top: 12px;
          z-index: 1;
        }

        .social-links-section {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }

        .social-link {
          grid-column: span 1;
          margin-bottom: 30px;
        }

        .bottom-text-container {
          margin-top: 50px;
          text-align: right;
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 45px;
          }

          h2 {
            font-size: 30px;
          }

          h3 {
            font-size: 30px;
          }

          p {
            font-size: 24px;
          }

          a {
            font-size: 24px;
          }

          .button-container {
            padding-bottom: 0;
            padding-top: 10px;
          }

          a.button {
            font-size: 18px;
            float: none;
          }

          .container {
            padding: 20px;
          }
          .content-section {
            margin-top: 60px;
            margin-left: 0;
          }

          .content-section::before {
            display: none;
          }
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
