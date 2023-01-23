import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React from 'react';
import FooterData from '../../../../sample/footer.json';
import HeaderData from '../../../../sample/header.json';
const AddToCart = ({ productid, ...props }: { productid: string }) => {
    return <React.Fragment>{productid}</React.Fragment>;
};
export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext,
) => {
    return {
        props: {
            headerData: HeaderData,
            footerData: FooterData,
            productid: context.query?.productID,
        },
    };
};
export default AddToCart;
