export type UserType = {
  id: number
  name: string
  date: string
  address: string
  phone: string
}

export enum SearchTypeEnum {
  CASE_SENSITIVE = 'caseSensitive',
  PARTIAL_MATCH = 'partialMatch',
  REGEX = 'regex',
  NONE = 'none'
}
