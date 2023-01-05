import Image from 'next/legacy/image';
import Link from 'next/link';
import '@styles/_header.scss';

const Header = (): JSX.Element => {
    return (
        <header className="header">
            <nav className="header__container">
                <ul className="header__list">
                    <li className="header__item">
                        <Link href={'/'} legacyBehavior>
                            <a className="header__logo">
                                <Image
                                    className="header__image"
                                    src={'/header-logo.png'}
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
