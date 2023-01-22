import '@styles/_breadcrumb.scss';
import Link from 'next/link';
import React from 'react';
import { BreadcrumbData, BreadcrumbTypes } from './breadcrumb';

const Breadcrumb = ({ list }: BreadcrumbTypes): JSX.Element => {
    const ishref = list?.filter((x) => x.isHref);
    const anchorProps = {
        ...(ishref.length && { target: '_parent' }),
    };
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
            </ul>
        </div>
    );
};

export default Breadcrumb;
