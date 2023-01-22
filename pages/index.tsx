import '@layout/_homepage.scss';
import { aemHeadlessClient, queries } from 'aemHeadless';
import CardInfo from 'components/card-info';
import FadeInSection from 'components/fading';
import Seo from 'components/seo';
import Teaser from 'components/teaser';
import Text from 'components/text';
import { GetStaticProps } from 'next';
import React from 'react';

const Home = ({ teaserData, cardData, featureData }: { [x: string]: any }): JSX.Element => {
    return (
        <React.Fragment>
            <Seo pageTitle="Home" />
            <section className="homepage">
                <Teaser {...teaserData} />
                <Text textData={cardData?.title} />
                {cardData.categories && (
                    <React.Fragment>
                        <div className="homepage-productsearch">
                            {cardData.categories.map((data: any, index: number) => (
                                <React.Fragment key={index}>
                                    <CardInfo
                                        cardText={data.cardText}
                                        cardSubText={data.cardSubText}
                                        cardIcon={data.cardIcon}
                                        cardType="products"
                                        type={data.type}
                                        modalData={data.modalData}
                                    />
                                </React.Fragment>
                            ))}
                        </div>
                    </React.Fragment>
                )}
                <FadeInSection>
                    <React.Fragment>
                        <div className="homepage-feature">
                            <Text textData={featureData?.title} />
                        </div>
                        {featureData.features && (
                            <div className="homepage-list">
                                <ul>
                                    {featureData.features.map((data: string, index: number) => (
                                        <li key={index}>{data}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </React.Fragment>
                </FadeInSection>
            </section>
        </React.Fragment>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    let homePageJson = await aemHeadlessClient.runPersistedQuery(queries.homePage);
    let { cardCategoryByPath, facilitiesByPath, footerByPath, headerByPath, teaserByPath } =
        homePageJson?.data;
    return {
        props: {
            headerData: headerByPath?.item,
            footerData: footerByPath?.item,
            teaserData: teaserByPath?.item,
            cardData: cardCategoryByPath?.item?.cardInfo,
            featureData: facilitiesByPath?.item,
        },
    };
};

export default Home;
