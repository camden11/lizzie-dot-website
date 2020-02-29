import React from "react";
import Head from "next/head";
import Prismic from "prismic-javascript";
import { get } from "lodash";
import PrismicClient from "../transport/prismic";

const Home = ({ data }) => {
  return (
    <div>
      <div>
        <h2>{data.site_title}</h2>
      </div>
      <div>
        <h1>{data.top_blurb}</h1>
        <a href={get(data, "resume.url")} target="_blank">
          {data.resume_link_text}
        </a>
      </div>
      <div>
        <h3>{data.about_section_title}</h3>
        <p>{data.about_section_text}</p>
        <a href={data.about_section_button_url} target="_blank">
          {data.aboout_section_button_text}
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
        <span>{data.bottom_text}</span>
      </div>
    </div>
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
