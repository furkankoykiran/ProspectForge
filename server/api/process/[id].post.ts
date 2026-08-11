import { getBusiness, incrementUsage, saveProcessResult } from '../../utils/db'
import { processBusinessWithGemini } from '../../utils/gemini'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isInteger(id)) {
    throw createError({ statusCode: 400, statusMessage: 'Geçersiz id' })
  }

  const business = getBusiness(id)
  if (!business) {
    throw createError({ statusCode: 404, statusMessage: 'İşletme bulunamadı' })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw createError({ statusCode: 500, statusMessage: 'GEMINI_API_KEY tanımlı değil' })
  }

  const result = await processBusinessWithGemini(business, apiKey)
  incrementUsage('process')
  saveProcessResult(id, result)
  return getBusiness(id)
})
