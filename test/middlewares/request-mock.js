export default ({ headers, method, query, path, originalUrl }) => {
    return { headers, method, path, pathname: path, originalUrl, query }
}