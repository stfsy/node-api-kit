
export default class {

    constructor() {
        this._objects = {}
    }

    /**
     * @param {Array.<string>} resourceIds 
     * @returns {string}
     * @private
     */
    _join(resourceIds) {
        return resourceIds.join('/')
    }

    /**
     * 
     * @param {Array<string>} resourceIds 
     */
    get(resourceIds) {
        const id = this._join(resourceIds)
        return this._objects[id]
    }

    /**
     * 
     */
    getAll() {
        return Object.values(this._objects)
    }

    /**
     * 
     * @param {Array<string>} resourceIds 
     * @param resource
     */
    create(resourceIds, resource) {
        const id = this._join(resourceIds)
        this._objects[id] = resource
    }

    /**
     * 
     * @param {Array<string>} resourceIds 
     * @param resource
     */
    update(resourceIds, resource) {
        const id = this._join(resourceIds)
        const existingResource = this._objects[id]
        this._objects[id] = Object.assign(existingResource, resource)
    }

    /**
     * 
     * @param {Array<string>} resourceIds 
     */
    delete(resourceIds) {
        const id = this._join(resourceIds)
        delete this._objects[id]
    }

    clear() {
        this._objects = {}
    }
}