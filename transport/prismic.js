import Prismic from "prismic-javascript";

const accessToken = process.env.PRISMIC_ACCESS_TOKEN;
const PrismicClient = Prismic.client(process.env.PRISMIC_URL, { accessToken });

export default PrismicClient;
