const statuses = ['active', 'pending', 'completed']


export function randomStatus() {
return statuses[Math.floor(Math.random() * statuses.length)]
}


export function makeFakeDate() {
const now = Date.now()
const days = Math.floor(Math.random() * 120) // last 4 months
const d = new Date(now - days * 24 * 60 * 60 * 1000)
return d.toISOString()
}