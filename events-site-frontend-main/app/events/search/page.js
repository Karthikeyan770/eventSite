import { API_URL } from "@/config/index";
import EventItem from "@/app/ui/EventItems";
import qs from 'qs';
import Link from "next/link";

async function getEvents(term){
  const query = qs.stringify({
    filters: {
      $or: [
        {name: {
          $containsi: term
        }},
        {performers: {
          $containsi: term
        }},
        {description: {
          $containsi: term
        }},
        {venue: {
          $containsi: term
        }}
      ]
    }
  }, {encode: false});
  const res = await fetch(`${API_URL}/api/all-events?${query}&populate=*`, {cache: 'no-store'});
  return res.json();
}
async function SearchPage({searchParams}) {
  const events = await getEvents(searchParams.term);
  return (
    <div className="flex flex-col w-full gap-3 p-10">
      <Link href='/events' className=" text-blue-700">Go Back</Link>
      <h1 className="text-2xl font-bold">Search results for {`${searchParams.term}`}</h1>
      {events.data.length == 0 ? <p>No events</p> : (
        events.data.map((evt) => (
          <EventItem key={evt.id} evt={evt.attributes} />
        ))
      )}
    </div>
  )
}

export default SearchPage