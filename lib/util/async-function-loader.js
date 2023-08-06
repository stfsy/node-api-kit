import { async as asyncCacheable } from "./cacheable.js";
import { logDebug } from "./logger.js";

export default function (path) {
    logDebug(`Path ${path} registered for lazy loading`)
    const getFromCache = asyncCacheable(async () => import(path))
    return async (...args) => {
        const fn = await getFromCache()
        return fn.call(null, args)
    }
}