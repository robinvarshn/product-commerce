import React from 'react';
import Teaser from 'components/teaser';
import Seo from 'components/seo';
import CardInfo from 'components/card-info';
import Text from 'components/text';
import CardData from '.././sample/cardCategory.json';
import FeatureData from '.././sample/cardFeatures.json';
import '@layout/_homepage.scss';
import FadeInSection from 'components/fading';

const Home = (): JSX.Element => {
    return (
        <React.Fragment>
            <Seo pageTitle="Home" />
            <section className="homepage">
                <Teaser imageURL="/" />
                <Text textData="Browse Products" />
                {CardData && (
                    <React.Fragment>
                        <div className="homepage-productsearch">
                            {CardData.map((data: any, index: number) => (
                                <React.Fragment key={index}>
                                    <CardInfo
                                        cardText={data.cardText}
                                        cardSubText={data.cardSubText}
                                        cardIcon={data.cardIcon}
                                        cardType="products"
                                        type={data.type}
                                    />
                                </React.Fragment>
                            ))}
                        </div>
                    </React.Fragment>
                )}

                <FadeInSection>
                    <React.Fragment>
                        <div className="homepage-feature">
                            <Text textData="Features Provided" />
                        </div>
                        {FeatureData && (
                            <div className="homepage-list">
                                <ul>
                                    {FeatureData.map((data, index) => (
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

export default Home;
