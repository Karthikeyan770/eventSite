import { getJWT } from "@/app/action"
import { API_URL } from "@/config";
import DashboardEvents from "@/app/ui/DashboardEvents";
import { redirect } from "next/navigation";

const page = async () => {
  const token = getJWT();
  if(!token){
    redirect('/account/login');
  }
  const res = await fetch(`${API_URL}/api/all-events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  }, {next: {tags: ['dashboard']}});
  const data = await res.json();
  return (
    <div className="mx-10 my-15 flex flex-col gap-5">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <h3 className="text-xl font-bold text-orange-600">My Events</h3>
      <div className="flex flex-col gap-8">
        {data.length === 0? <p>No Upcoming events</p> : (
          data.map((evt) => (
            <DashboardEvents key={evt.id} evt={evt} token={token.value} />
          ))
        )}
      </div>
    </div>
  )
}

export default page