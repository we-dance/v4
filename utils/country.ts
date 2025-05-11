import * as lookup from 'country-code-lookup'
import { prisma } from '~/server/prisma'

function getCountryInternetCode(name: string) {
  const countryMap: any = {
    Türkiye: 'tr',
    'Cabo Verde': 'cv',
  }

  if (countryMap[name]) {
    return countryMap[name]
  }

  const countryLookup = lookup.byCountry(name)
  if (!countryLookup) {
    throw new Error(`Country not found: ${name}`)
  }

  return countryLookup.internet.toLowerCase()
}

export async function getCountryCode(name: string) {
  let country = await prisma.country.findFirst({
    where: { name },
  })

  if (country) {
    return country.code
  }

  const code = getCountryInternetCode(name)

  country = await prisma.country.findFirst({
    where: { code },
  })

  if (country) {
    return country.code
  }

  const result = await prisma.country.create({
    data: {
      code,
      name,
    },
  })

  return result.code
}
