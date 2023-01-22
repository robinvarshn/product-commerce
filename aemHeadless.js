import { AEMHeadless } from '@adobe/aem-headless-client-nodejs';

export let aemHeadlessClient = new AEMHeadless({
    serviceURL: `${process.env.NEXT_AEM_HOST_URI}`,
    endpoint: `${process.env.NEXT_AEM_GRAPHQL_ENDPOINT}`,
    auth: [`${process.env.NEXT_AEM_ID}`, `${process.env.NEXT_AEM_PW}`],
});

export let queries = {
    homePage: 'retail-ai/Home%20Page',
    productDetail: 'retail-ai/Product Detail',
};
