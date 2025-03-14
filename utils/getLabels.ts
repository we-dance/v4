export function getLabel(list, value) {
  if (list.length) {
    const item = list.find((i) => i.value === value)

    return item?.label
  }

  return list[value]
}

export function getLabels(list, values) {
  if (!values) {
    return ''
  }

  return Object.keys(values)
    .map((v) => getLabel(list, v))
    .join(', ')
}
