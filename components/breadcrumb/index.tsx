import '@styles/_breadcrumb.scss';
import { useFetchCartData } from 'components/cart/FetchCart';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BreadcrumbData, BreadcrumbTypes } from './breadcrumb';

type sessionStorageTypes = Storage & {
    getItem: (key: string) => string;
};

const Breadcrumb = ({ list }: BreadcrumbTypes & Partial<sessionStorageTypes>): JSX.Element => {
    const [cartId, setCartId] = useState<string>({} as string);
    const [cartQuantity, setCartQuantity] = useState<number>({} as number);
    const { getFetchData, loading, data, error } = useFetchCartData(cartId);

    const listenStorageChange = () => {
        const id = sessionStorage.getItem('cartId');
        id && setCartId(id);
    };

    const ishref = list?.filter((x) => x.isHref);
    const anchorProps = {
        ...(ishref.length && { target: '_parent' }),
    };

    // listening to local storage changes
    useEffect(() => {
        if (sessionStorage.getItem('cartId')) {
            const cartId: any = sessionStorage.getItem('cartId');
            setCartId(cartId);
        } else {
            window.addEventListener('storage', listenStorageChange);
        }

        return () => window.removeEventListener('storage', listenStorageChange);
    }, []);

    // fetching the total quantity in cart
    useEffect(() => {
        if (cartId) {
            getFetchData();
        }
    }, [cartId]);

    useEffect(() => {
        if (data) {
            setCartQuantity(data?.cart?.total_quantity);
        }
    }, [data]);

    return (
        <div className="breadcrumb">
            <ul className="breadcrumb-list">
                <React.Fragment>
                    {list.map((x: BreadcrumbData, index: number) => {
                        return (
                            <li className="breadcrumb-item" key={index}>
                                {index !== list.length - 1 ? (
                                    <React.Fragment>
                                        <Link href={x.route} legacyBehavior>
                                            <a className="breadcrumb-trail" {...anchorProps}>
                                                {x.routeName}
                                            </a>
                                        </Link>
                                    </React.Fragment>
                                ) : (
                                    <span className="breadcrumb-lead">{x.routeName}</span>
                                )}
                            </li>
                        );
                    })}
                </React.Fragment>
                {!loading && !error && (
                    <React.Fragment>
                        <li className="breadcrumb-item__cart">
                            <Link href="/cart-page" legacyBehavior>
                                <a className="breadcrumb-item__cart-link">
                                    <span className="breadcrumb-item_carticon">
                                        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M15.32 2.405H4.887C3 2.405 2.46.805 2.46.805L2.257.21C2.208.085 2.083 0 1.946 0H.336C.1 0-.064.24.024.46l.644 1.945L3.11 9.767c.047.137.175.23.32.23h8.418l-.493 1.958H3.768l.002.003c-.017 0-.033-.003-.05-.003-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92c.99 0 1.805-.75 1.91-1.712l5.55.076c.12.922.91 1.636 1.867 1.636 1.04 0 1.885-.844 1.885-1.885 0-.866-.584-1.593-1.38-1.814l2.423-8.832c.12-.433-.206-.86-.655-.86"
                                                fill="#000"
                                            ></path>
                                        </svg>
                                    </span>
                                    <span className="breadcrumb-item_cartcount">
                                        {`(${cartQuantity})`}
                                    </span>
                                    <span className="breadcrumb-item_carttext">Cart</span>
                                </a>
                            </Link>
                        </li>
                    </React.Fragment>
                )}
            </ul>
        </div>
    );
};

export default Breadcrumb;
