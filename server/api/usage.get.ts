import { getTodayUsage } from '../utils/db'

export default defineEventHandler(() => {
  return getTodayUsage()
})
