import CarDetailsClientPage from "./UsedCarDetailsClientPage"

export async function generateStaticParams() {

  const regularIds = Array.from({ length: 400 }, (_, i) => (i + 1).toString())

  const specificIds = ["209", "210", "211", "212", "213", "214", "215"]

  const carIds = [...regularIds, ...specificIds]

  return carIds.map((id) => ({
    id: id,
  }))
}

export default function CarDetailsPage({ params }: { params: { id: string } }) {
  return <CarDetailsClientPage params={params} />
}
