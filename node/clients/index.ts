import { IOClients, IOClientConstructor } from '@vtex/api'
import Analytics from './analytics'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
    public get analytics() {
        console.log('ANALYTICS: request received')
        return this.getOrSet('analytics', Analytics as IOClientConstructor);
    }
}
