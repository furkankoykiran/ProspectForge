import { deleteAllBusinesses } from '../utils/db'

export default defineEventHandler(() => {
  deleteAllBusinesses()
  return { success: true }
})
