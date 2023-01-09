import '@styles/_offline-stores.scss';
import Image from 'next/image';
import { OfflineStoreProps } from './offline-stores';

const OfflineStoreWrapper = ({ title, vendors }: OfflineStoreProps): JSX.Element => {
    return (
        <div className="offline-store">
            <p className="offline-store__title">{title}</p>
            <ul className="offline-store__stores">
                {vendors.map((x, i) => (
                    <li key={i}>
                        <Image src={`/${x}.png`} alt="" width={100} height={100} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OfflineStoreWrapper;
