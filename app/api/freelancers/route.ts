import { freelancers } from "@/app/lib/data";

let bookings: any[] = [];

export async function GET() {
  return Response.json({ freelancers, bookings });
}

export async function POST(request: Request) {
  const body = await request.json();
  const newFreelancers = {
    id: Date.now(),
    ...body,
  };
  bookings.push(newFreelancers);
  return Response.json({ success: true, newFreelancers });
}
