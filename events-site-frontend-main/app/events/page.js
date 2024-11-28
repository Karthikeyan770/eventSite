import { API_URL } from "@/config/index";
import EventItem from "@/app/ui/EventItems";
import Pagination from "../ui/Pagination";
import { PER_PAGE } from "@/config/index";

async function getEvents(pageNo){
  const start = (+pageNo - 1)*PER_PAGE;
  const res = await fetch(`${API_URL}/api/all-events?populate=*&sort=date&pagination[start]=${start}&pagination[limit]=${PER_PAGE}`, 
  {cache: 'no-store'},{next: {tags: ['collections']}});
  return res.json();
}
async function page({searchParams}) {
  const pageNo = searchParams.page || 1;
  const events = await getEvents(pageNo);
  const total = events.meta.pagination.total;
  return (
    <div className="flex flex-col w-full gap-3 p-10">
      <h1 className="text-3xl font-bold">All events</h1>
      {events.length == 0 ? <p>No Upcoming events</p> : (
        events.data.map((evt) => (
          <EventItem key={evt.id} evt={evt.attributes} />
        ))
      )}
      <div className="mx-auto my-0 w-1/12 mt-9">
        <Pagination pageNo={pageNo} total={total}/>
      </div>
    </div>
  )
}

export default page
