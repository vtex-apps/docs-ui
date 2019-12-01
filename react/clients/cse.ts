import axios from 'axios'
import { CSE_CX, CSE_KEY } from '../utils/constants'

export const cseSearch = async (query: string) => {
  const res = await axios(`
     https://www.googleapis.com/customsearch/v1?q=${query}&cx=${CSE_CX}&key=${CSE_KEY}
  `)
  const results = await res.data.items
  return results
}
