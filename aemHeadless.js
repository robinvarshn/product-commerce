import { AEMHeadless } from "@adobe/aem-headless-client-nodejs";

export let aemHeadlessClient = new AEMHeadless({
  serviceURL: `${process.env.AEM_HOST_URI}`,
  endpoint: `${process.env.AEM_GRAPHQL_ENDPOINT}`,
  auth: [`${process.env.AEM_ID}`, `${process.env.AEM_PW}`],
});

export let queries = {
  homePage: "nxt-js-poc/HomePage",
  productPage: "nxt-js-poc/ProductPage",
  productList: "nxt-js-poc/productListQuery",
  articlePage: "nxt-js-poc/Article Page",
  articleList: "nxt-js-poc/articleListQuery",
};
