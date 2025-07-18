export default eventHandler(async (event) => {
  const query = getQuery(event)
  const type = query.type
  let result

  if (type === '1') {
    result = await useStorage('assets:emails')
      .getItemRaw(`forgot-password.mjml`)
      .then((content) => new TextDecoder().decode(content))
  }

  if (type === '2') {
    result =
      await useStorage('assets:emails').getItemRaw(`forgot-password.mjml`)
  }

  return result
})
