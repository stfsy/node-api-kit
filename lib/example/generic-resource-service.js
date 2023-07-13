
export default class {

    constructor() {
        this._objects = {}
    }

    /**
     * @private
     * @param {Array.<String>} resourceIds 
     * @returns {String}
     */
    _join(resourceIds) {
        return resourceIds.join('/')
    }

    /**
     * 
     * @param {Array<String>} resourceIds 
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
     * @param {Array<String>} resourceIds 
     */
    create(resourceIds, resource) {
        const id = this._join(resourceIds)
        this._objects[id] = resource
    }

    /**
     * 
     * @param {Array<String>} resourceIds 
     */
    update(resourceIds, resource) {
        const id = this._join(resourceIds)
        const existingResource = this._objects[id]
        this._objects[id] = Object.assign(existingResource, resource)
    }

    /**
     * 
     * @param {Array<String>} resourceIds 
     */
    delete(resourceIds) {
        const id = this._join(resourceIds)
        delete this._objects[id]
    }

    clear() {
        this._objects = {}
    }
}