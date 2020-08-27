import { COURSE_ENTITY } from '../utils/constants'

export const productList = async (_: any, { topN }: { topN: number}, { clients: { masterdata } }: Context) => {
    let { data } = await masterdata.scrollDocuments({
        dataEntity: COURSE_ENTITY,
        fields: ['count', 'slug'],
        schema: 'v1',
        size: topN,
        sort: 'count DESC'
    });

    return data
}
