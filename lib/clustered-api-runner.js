import cluster from 'node:cluster';
import { cpus } from 'node:os';

const MAX_FORKS = 4

if (cluster.isPrimary) {
    cpus().forEach((_, index) => {
        if (index < MAX_FORKS) {
            cluster.fork()
        }
    })
} else {
    import('./index.js')
}
