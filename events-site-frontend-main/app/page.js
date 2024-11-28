import { API_URL } from "@/config/index";
import EventItem from "@/app/ui/EventItems";
import Link from "next/link";
async function getEvents(){
  const res = await fetch(`${API_URL}/api/all-events?populate=*&pagination[limit]=3&sort=date`, 
  {cache: 'no-store'});
  return res.json();
}

export default async function Home() {
  const events = await getEvents();
  console.log(events);
  return (
    <div>
      <div className="showcase_wrapper mb-7">
        <div className="overlay flex flex-col gap-3 font-bold text-center items-center justify-center
        text-white w-full h-full">
          <h1 className="text-5xl">Welcome to the party!</h1>
          <p className="text-xl">Find the hottest events.</p>
        </div>
      </div>
      <div className="flex-col justify-between mx-24">
        <h1 className="font-bold text-2xl mb-7">Upcoming events</h1>
        <div className="flex flex-col w-full gap-4">
          {events.length == 0? <p>No Upcoming events</p> : (
            events.data.map((evt) => (
              <EventItem key={evt.id} evt={evt.attributes} />
            ))
          )}
          <Link href='/events' className="bg-slate-800 hover:bg-slate-700 transition-colors text-white font-bold py-2 px-4 rounded w-1/6 text-center">
              View all events
        </Link>
        </div>
      </div>
    </div>
  )
}
