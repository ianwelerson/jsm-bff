import { normalizeString } from './'

const idFromEmail = (email: string) => {
  const stringParts = email.split('@')

  if (stringParts.length !== 2) {
    throw new Error('Erro ao criar ID')
  }

  return normalizeString(stringParts[0])
}

export {
  idFromEmail
}