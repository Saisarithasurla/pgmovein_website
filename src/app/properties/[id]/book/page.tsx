import { redirect } from "next/navigation";

// This old booking page is replaced by the lead capture popup flow in PGMove
export default function BookPropertyPage({ params }: { params: { id: string } }) {
  redirect(`/properties/${params.id}`);
}
