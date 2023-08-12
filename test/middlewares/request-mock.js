export default ({ headers, method, body, query, params, path, originalUrl }) => {
    return { headers, method, body, params, path, pathname: path, originalUrl, query }
}