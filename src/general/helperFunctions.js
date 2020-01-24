export const objectToQueryString = obj =>
  '?' +
  Object.keys(obj)
    .map(key => key + '=' + obj[key])
    .join('&')

export const titleCase = str => {
  if (typeof str === 'string' || str instanceof String) {
    str = str.toLowerCase().split(' ')
    const final = []
    for (const word of str) {
      final.push(word.charAt(0).toUpperCase() + word.slice(1))
    }
    return final.join(' ')
  } else {
    return null
  }
}

export const getTranslatedRole = role => {
  switch (role) {
    case 'ADMIN':
      return 'Κεντρικός Διαχειρηστής'
    case 'UNIT_ADMIN':
      return 'Διαχειριστής Μονάδας'
    case 'TEACHER':
      return 'Καθηγητής'
    case 'USER':
      return 'Χρήστης'
    default:
      return ''
  }
}

export const getBranchInitials = branch => {
  switch (branch) {
    case 'army':
      return 'ΣΞ'
    case 'navy':
      return 'ΠΝ'
    case 'airforce':
      return 'ΠΑ'
    default:
      return ''
  }
}

export const getBranchName = branch => {
  switch (branch) {
    case 'army':
      return 'Στρατός Ξηράς'
    case 'navy':
      return 'Πολεμικό Ναυτικό'
    case 'airforce':
      return 'Πολεμική Αεροπορία'
    default:
      return ''
  }
}
