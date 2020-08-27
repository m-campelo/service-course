import { Clients } from '../clients/index'
import Analytics from '../clients/analytics'
import { EventContext } from '@vtex/api'

export async function updateLiveUsers(ctx: EventContext<Clients>) {
    const liveUsersProducts = await (ctx.clients.analytics as Analytics).getLiveUsers();
    console.log('LIVE USERS: ', liveUsersProducts)
    return true
}
