import fs from 'node:fs'
import { resolve } from 'node:path'

let modulePath = import.meta.url.substring(5)
while (modulePath.includes(':')) {
    modulePath = modulePath.substring(modulePath.indexOf(':') + 1)
}

const pkg = JSON.parse(fs.readFileSync(resolve(modulePath, '../../../', 'package.json'), 'utf-8'))

export function getPackageMetaData() {
    return pkg
}

export function getPackageName() {
    return pkg.name
}