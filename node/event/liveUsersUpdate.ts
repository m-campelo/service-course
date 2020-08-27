import { Clients } from '../clients/index'
import Analytics, { LiveUsersProduct } from '../clients/analytics'
import { EventContext } from '@vtex/api'
import { COURSE_ENTITY } from '../utils/constants';

interface DataModel {
    id: string
}

interface LiveUsersProductModel extends DataModel {
    count: number
    slug: string
}

export async function updateLiveUsers(ctx: EventContext<Clients>) {
    const liveUsersProducts = await (ctx.clients.analytics as Analytics).getLiveUsers();
    console.log('LIVE USERS from API: ', liveUsersProducts)

    await Promise.all(
        liveUsersProducts.map(async (entry: LiveUsersProduct) => {
            try {
                const [ savedProduct ] = await ctx.clients.masterdata.searchDocuments<LiveUsersProductModel>({
                    dataEntity: COURSE_ENTITY,
                    fields: ['id', 'count', 'slug'],
                    pagination: {
                        page: 1,
                        pageSize: 1
                    },
                    schema: 'v1',
                    where: `slug=${entry.slug}`
                })

                if (entry.slug == savedProduct.slug && entry.liveUsers == savedProduct.count) {
                    console.log(`ignoring product: ${entry.slug}`)
                    return
                }

                await ctx.clients.masterdata.createOrUpdateEntireDocument({
                    dataEntity: COURSE_ENTITY,
                    fields: {
                        count: entry.liveUsers,
                        slug: entry.slug
                    },
                    id: savedProduct?.id
                })

                console.log(`${savedProduct.id ? 'updated' : 'created'} product: ${entry.slug}`);
            } catch (error) {
                console.log(`failed to update product: ${entry.slug}`)
                console.error(error)
            }
        })

    )

    return true
}
