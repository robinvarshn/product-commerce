import { useForm } from 'react-hook-form';

import '@styles/_default.scss';
import '@styles/_shipping.scss';

const AddressComponent = (props: {
    title: string;
    containerType: string;
    defaultValues: any;
    submitHandler: Function;
}) => {
    const { title, defaultValues, submitHandler, containerType } = props;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues,
    });
    const onSubmit = (data: any) => submitHandler(data);
    console.log(errors);

    // <input type="text" placeholder="First name" {...register("First name", {required: true, maxLength: 80})} />

    return (
        <>
            <div className={containerType}>
                <h1>{title}</h1>
                <form id="shippingAddress" onSubmit={handleSubmit(onSubmit)}>
                    <ul className="shipping-container__address">
                        <li>
                            <label>
                                <span>First Name</span>
                                <input
                                    type="text"
                                    placeholder="First name"
                                    {...register('firstname', { required: true, maxLength: 80 })}
                                />
                            </label>
                        </li>
                        <li>
                            <label>
                                <span>Last Name</span>
                                <input
                                    type="text"
                                    placeholder="Last name"
                                    {...register('lastname', { required: true, maxLength: 80 })}
                                />
                            </label>
                        </li>
                        <li>
                            <label>
                                <span>company</span>
                                <input
                                    type="text"
                                    placeholder="Company"
                                    {...register('company', { required: true, maxLength: 80 })}
                                />
                            </label>
                        </li>
                        <li>
                            <label>
                                <span>street</span>
                                <input
                                    type="text"
                                    placeholder="Street"
                                    {...register('street', { required: true, maxLength: 80 })}
                                />
                            </label>
                        </li>
                        <li>
                            <label>
                                <span>City</span>
                                <input
                                    type="text"
                                    placeholder="City"
                                    {...register('city', { required: true, maxLength: 80 })}
                                />
                            </label>
                        </li>
                        <li>
                            <label>
                                <span>Region</span>
                                <input
                                    type="text"
                                    placeholder="Region"
                                    {...register('region', { required: true, maxLength: 80 })}
                                />
                            </label>
                        </li>
                        <li>
                            <label>
                                <span>region_id</span>
                                <input
                                    type="text"
                                    placeholder="region_id"
                                    {...register('region_id', { required: true, maxLength: 80 })}
                                />
                            </label>
                        </li>
                        <li>
                            <label>
                                <span>Postcode</span>
                                <input
                                    type="text"
                                    placeholder="Postcode"
                                    {...register('postcode', { required: true, maxLength: 80 })}
                                />
                            </label>
                        </li>
                        <li>
                            <label>
                                <span>Country Code</span>
                                <input
                                    type="text"
                                    placeholder="Countrycode"
                                    {...register('country_code', {
                                        maxLength: 80,
                                        required: true,
                                    })}
                                />
                            </label>
                        </li>
                        <li>
                            <label>
                                <span>Telephone</span>
                                <input
                                    type="text"
                                    placeholder="Telephone"
                                    {...register('telephone', {
                                        maxLength: 80,
                                        required: true,
                                    })}
                                />
                            </label>
                        </li>
                    </ul>
                </form>
            </div>
        </>
    );
};

export default AddressComponent;
