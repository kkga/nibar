const parse = (data) => {
  try {
    return JSON.parse(data)
  } catch (e) {
    return {}
  }
}

export default parse
