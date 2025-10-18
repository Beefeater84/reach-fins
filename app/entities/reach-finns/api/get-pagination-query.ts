import { SUPABASE_ANON_KEY, SUPABASE_PROJECT_URL } from '../const'

export const getPaginationQuery = async (
  generatedQuery: string,
  page: number = 1,
) => {
  try {
    if (!generatedQuery || !generatedQuery.trim()) return null

    // Parse the generatedQuery to extract endpoint and parameters
    const queryPath = generatedQuery.replace(/^"/, '').replace(/"$/, '') // Remove quotes if present

    // Extract existing parameters from the query
    const [endpoint, queryString] = queryPath.split('?')
    const params = new URLSearchParams(queryString || '')

    // Extract existing limit or set default
    const limit = parseInt(params.get('limit') || '20')

    // Calculate offset based on page number
    const offset = (page - 1) * limit

    // Add offset to parameters
    params.set('offset', offset.toString())

    // Construct the full URL
    const fullUrl = `${SUPABASE_PROJECT_URL}${endpoint}?${params.toString()}`

    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching paginated Reach Finns data:', error)
    throw error
  }
}
