import { redirect } from "next/navigation";

export default function CityAreasPage({ params }: { params: { city: string } }) {
  // Redirect all area city pages to the main properties page
  redirect(`/properties`);
}
