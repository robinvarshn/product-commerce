import '@styles/_breadcrumb.scss';
import Link from 'next/link';
import React from 'react';
import { BreadcrumbData, BreadcrumbTypes } from './breadcrumb';

const Breadcrumb = ({ list }: BreadcrumbTypes): JSX.Element => {
    return (
        <div className="breadcrumb">
            <ul className="breadcrumb-list">
                <React.Fragment>
                    {list.map((x: BreadcrumbData, index: number) => {
                        return (
                            <li className="breadcrumb-item" key={index}>
                                {index !== list.length - 1 ? (
                                    <Link className="breadcrumb-trail" href={x.route}>
                                        {x.routeName}
                                    </Link>
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
