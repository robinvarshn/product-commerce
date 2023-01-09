import '@styles/_header.scss';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { HeaderProps } from './header';

const Header = ({ headerLogo }: HeaderProps): JSX.Element => {
    return (
        <header className="header">
            <nav className="header__container">
                <ul className="header__list">
                    <li className="header__item">
                        <Link href={'/'} legacyBehavior>
                            <a className="header__logo">
                                <Image
                                    className="header__image"
                                    src={headerLogo}
                                    layout="fill"
                                    alt={''}
                                />
                            </a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
