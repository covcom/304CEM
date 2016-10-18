const abbreviations = {
  json: 'javascript object notation',
  yaml: 'yet another markup language',
  xml: 'extensible markup language',
  csv: 'comma-separated values'
}

for(let abbr in abbreviations) {
  console.log(abbr)
  console.log(abbreviations[abbr])
}
