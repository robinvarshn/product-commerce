import Dataset from '../../sample/dataset.json';

export type ResultSet = {
    keyword: string;
    category: string;
};

const KeywordMapper = (prediction: string): ResultSet => {
    const result = {} as ResultSet;

    Dataset.forEach((x) => {
        if (prediction.toLowerCase().indexOf(x.keyword) > -1) {
            result['keyword'] = x.keyword;
            result['category'] = x.category;
            return;
        }
    });
    return result;
};

export { KeywordMapper };
