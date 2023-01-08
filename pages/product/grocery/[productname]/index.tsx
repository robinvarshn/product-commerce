import Breadcrumb from 'components/breadcrumb';
import React from 'react';

const GroceryCategory = () => {
    return <section>Grocery</section>;
};

GroceryCategory.getLayout = () => {
    return (
        <React.Fragment>
            {/* {page} */}
            <Breadcrumb list={[]} />
        </React.Fragment>
    );
};

export default GroceryCategory;
