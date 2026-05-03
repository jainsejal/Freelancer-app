import { freelancers } from "@/app/lib/data";

function findFreelancer(id: number) {
  return freelancers.find((f) => f.id === id);
}

//Get single freelancer
export async function GET({ params }: { params: { id: string } }) {
  const freelancer = findFreelancer(parseInt(params.id));
  if (!freelancer) {
    return Response.json({ error: "Freelancer not found" }, { status: 404 });
  }
  return Response.json(freelancer);
}

//Delete a freelancer
export async function DELETE({ params }: { params: { id: string } }) {
  const index = freelancers.findIndex((f) => f.id === parseInt(params.id));
  if (index !== -1) {
    freelancers.splice(index, 1);
    return Response.json({ success: true });
  }
  return Response.json({ error: "Freelancer not found" }, { status: 404 });
}

//Update a freelancer
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const body = await req.json();
    const freelancer = findFreelancer(parseInt(params.id));
    if(!freelancer) {
        return Response.json({ error: "Freelancer not found" }, { status: 404 });
    }
    // Merges/updates the freelancer object with new properties from the request body. It copies all properties from body into freelancer.
    Object.assign(freelancer, body);
    return Response.json(freelancer);
}