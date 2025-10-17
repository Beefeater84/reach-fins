import { LAMBDA_URL } from '../const'

export const getReachFinns = async (query: string) => {
  try {
    const response = await fetch(LAMBDA_URL, {
      method: 'POST',
      body: JSON.stringify({ query }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching Reach Finns data:', error)
    throw error
  }
}
