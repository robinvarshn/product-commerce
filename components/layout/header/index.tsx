import '@styles/_header.scss';
import getConfig from 'next/config';
import Image from 'next/legacy/image';
import Link from 'next/link';
import React from 'react';
import { HeaderProps } from './header';

const Header = ({ headerLogo, isHref }: HeaderProps): JSX.Element => {
    const { publicRuntimeConfig } = getConfig();
    const anchorProps = {
        ...(isHref && { target: '_parent' }),
    };
    return (
        <React.Fragment>
            <header className="header">
                <nav className="header__container">
                    <ul className="header__list">
                        <li className="header__item">
                            <Link href={'/'} legacyBehavior>
                                <a className="header__logo" {...anchorProps}>
                                    <Image
                                        className="header__image"
                                        src={`${publicRuntimeConfig.aemPublishUrl}${headerLogo._path}`}
                                        layout="fill"
                                        alt={''}
                                    />
                                </a>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </React.Fragment>
    );
};

export default Header;
