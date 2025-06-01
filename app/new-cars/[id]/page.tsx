import CarDetailsClientPage from "./CarDetailsClientPage"

// Generate static params for static export
export async function generateStaticParams() {
  // In a real app, you would fetch all car IDs from your API/database
  // For now, we'll return a comprehensive list of sample IDs to cover common cases
  const carIds = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
  ]

  return carIds.map((id) => ({
    id: id,
  }))
}

export default function CarDetailsPage({ params }: { params: { id: string } }) {
  return <CarDetailsClientPage params={params} />
}
