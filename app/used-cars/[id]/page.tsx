import CarDetailsClientPage from "./UsedCarDetailsClientPage"

// Generate static params for static export
export async function generateStaticParams() {
  // In a real app, you would fetch all car IDs from your API/database
  // For now, we'll return a comprehensive list of sample IDs to cover common cases

  // Generate IDs 1-30
  const regularIds = Array.from({ length: 400 }, (_, i) => (i + 1).toString())

  // Add specific high IDs that might be accessed
  const specificIds = ["209", "210", "211", "212", "213", "214", "215"]

  // Combine all IDs
  const carIds = [...regularIds, ...specificIds]

  return carIds.map((id) => ({
    id: id,
  }))
}

export default function CarDetailsPage({ params }: { params: { id: string } }) {
  return <CarDetailsClientPage params={params} />
}
