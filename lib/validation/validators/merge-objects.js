export default function (...objects) {
    return objects.reduce((context, next) => {
        return Object.assign(context, next)
    }, {})
}