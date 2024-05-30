

export function capitalize(statement) {
    if (!statement) return ''
    const words = statement.split(/[_\s+]/)
    return words.map(word => `${word[0].toUpperCase()}${word.substring(1).toLowerCase()}`).join(' ')
}

export function format(word) {
    if (! word) return
    return word.toUpperCase().replace(/[//s+-]/, '_')
}