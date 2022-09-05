const normalizeString = (value: string) => {
  if (!value) {
    throw new Error('String inválida')
  }

  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export { normalizeString }