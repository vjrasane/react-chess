export const columnToFile = i => String.fromCharCode(97 + i)
export const fileToColumn = i => i.charCodeAt(0) - 97

export const notation = (x, y) => columnToFile(x) + (parseInt(y, 10) + 1)
export const coordinates = n => [fileToColumn(n), n[1] - 1]

export const maybe = (obj, func, def) => obj ? func(obj) : def
