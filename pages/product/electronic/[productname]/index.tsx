import Breadcrumb from 'components/breadcrumb';

const ElectronicCategory = () => {
    return (
        <section>
            Electronic
            {/* <PDPTemplate
                TabInfo={[
                    {
                        tag: 'stores',
                        data: {
                            title: 'ok',
                            locationData: '',
                        },
                    },
                ]}
            /> */}
        </section>
    );
};

ElectronicCategory.getLayout = () => {
    return <Breadcrumb list={[]} />;
};

export default ElectronicCategory;
