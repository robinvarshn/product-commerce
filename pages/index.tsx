import '@layout/_homepage.scss';
import CardInfo from 'components/card-info';
import FadeInSection from 'components/fading';
import Seo from 'components/seo';
import Teaser from 'components/teaser';
import Text from 'components/text';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React from 'react';
import 'regenerator-runtime/runtime';
import CardData from '.././sample/cardCategory.json';
import FeatureData from '.././sample/cardFeatures.json';
import FooterData from '.././sample/footer.json';
import HeaderData from '.././sample/header.json';
import TeaserData from '.././sample/homePage.json';

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

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext,
) => {
    return {
        props: {
            headerData: HeaderData,
            footerData: FooterData,
            teaserData: TeaserData?.teaser,
            cardData: CardData?.cardInfo,
            featureData: FeatureData,
        },
    };
};

export default Home;
