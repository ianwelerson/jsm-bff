const idFromEmail = (email: string) => {
  const stringParts = email.split('@')

  if (stringParts.length !== 2) {
    throw new Error('Erro ao criar ID')
  }

  const normalizedId = stringParts[0].normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  return normalizedId
}

export {
  idFromEmail
}