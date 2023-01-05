import Image from 'next/legacy/image';
import Link from 'next/link';
import React from 'react';
import { FooterProps } from './footer.types';
import '@styles/_footer.scss';

const Footer = ({ footerData }: FooterProps): JSX.Element => {
    return (
        <React.Fragment>
            <footer>
                <div className="footer">
                    <div className="footer__copyright">
                        <span className="footer__text">{footerData.copyRightContent}</span>
                    </div>
                    <div className="footer__brand-logo">
                        <Image
                            src={`${footerData.brandLogo}`}
                            alt={footerData.copyRightContent}
                            layout="fill"
                        />
                    </div>
                    <div className="footer__links">
                        <ul className="footer__list">
                            {footerData.footerQuickLinks.map((element, index) => {
                                return (
                                    <li className="footer__list-items" key={index}>
                                        <Link href={'/'} legacyBehavior>
                                            <a className="footer__list-links">{element}</a>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </footer>
        </React.Fragment>
    );
};

Footer.defaultProps = {
    footerData: {
        copyRightContent: 'Copyright © 2022 Retail AI. All rights reserved.',
        brandLogo: '/header-logo.png',
        footerQuickLinks: ['Privacy', 'Notice', 'FAQ', 'Terms Of Use'],
    },
};

export default Footer;
