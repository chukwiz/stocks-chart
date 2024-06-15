export const createDate = (hours: number, date: number, days: number, weeks: number) => {
    let newDate = new Date(date)
    newDate.setHours(newDate.getHours() + hours)
    newDate.setDate(newDate.getDate() + days + weeks * 7)
    return newDate
}

export const pastHour = () => {
    return new Date(new Date().getTime() - 60 * 60 * 1000).getTime()
}

export const past2Days = () => {
    return new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000).getTime()
}

export const pastDay = () => {
    return new Date(new Date().getTime() - 24 * 60 * 60 * 1000).getTime()
}

export const pastWeek = () => {
    return new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).getTime()
}

export const pastMonth = () => {
    return new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000).getTime()
}

export const pastYear = () => {
    return new Date(new Date().getTime() - 12 * 30 * 24 * 60 * 60 * 1000).getTime()
}

export const today = () => {
    return new Date().getTime()
}