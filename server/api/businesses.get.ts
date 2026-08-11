import { listBusinesses } from '../utils/db'

export default defineEventHandler(() => {
  return listBusinesses()
})
