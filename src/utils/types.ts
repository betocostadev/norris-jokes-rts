export type jokeCategoriesApiDataType = {
  data: string[]
}

export type jokeSearchType = {
  result: []
  total: number
}

export type jokeByCategoryType = {
  categories: string[]
  created_at: string
  icon_url: string
  id: string
  updated_at: string
  url: string
  value: string
}

export interface IJoke{
  id: string;
  icon_url: string;
  value: string;
}
