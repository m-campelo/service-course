import Analytics from '../clients/analytics'

export async function analytics(ctx: Context, next: () => Promise<any>) {
  if (ctx.method.toUpperCase() === 'GET') {
    const {
      clients: { analytics }
    } = ctx;

    ctx.status = 200;
    ctx.body = await (analytics as Analytics).getLiveUsers();
    ctx.set('cache-control', 'no-cache')
  }

  await next()
}
