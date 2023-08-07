export const getLandList = async (itemIDs: number[]): Promise<[]> => {
  if (itemIDs.length === 0) return Promise.resolve([])

  const url = 'https://apis.zigbang.com/v2/items/list'
  const searchParams = {
    domain: 'zigbang',
    item_ids: itemIDs,
    withCoalition: true,
  }

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(searchParams),
  })

  const data = await response.json()

  return data.items
}
