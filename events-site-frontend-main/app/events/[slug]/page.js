import { API_URL } from "@/config/index";
import Image from "next/image";
import Dashboard from "@/app/ui/Dashboard";
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { getJWT } from "@/app/action";

async function getEvent(eventName){
    const res = await fetch(`${API_URL}/api/all-events?filters[slug][$eq]=${eventName}&populate=*`, {cache: 'no-store'},
    {next: {tags: ['edit']}});
    return res.json();
}

async function EventPage ({params}) {
    const {data} = await getEvent(params.slug);
    const evt = data[0].attributes;
    const id = data[0].id;
    const token = getJWT();
    return (
            <div className="w-full flex flex-col gap-6 p-4">
                <Dashboard id={id} token={token ? token.value: null}/>
                <div className="flex flex-col gap-2">
                    <p>{new Date(evt.date).toLocaleDateString('en-IN')} at {evt.time}</p>
                    <h1 className="text-3xl font-bold">{evt.name}</h1>
                </div>
                <Image src={evt.image.data ? evt.image?.data?.attributes?.formats?.large?.url : '/images/showcase.jpg'}
                width={560} height={500} className="self-center"/>
                <div className="flex flex-col gap-2">
                    <p className="text-xl font-bold">Performers:</p>
                    <p>{evt.performers}</p>
                    <p className="text-xl font-bold">Venue:</p>
                    <p>{evt.venue}</p>
                    <p className="text-xl font-bold">Description:</p>
                    <p>{evt.description}</p>
                </div>
                <ToastContainer position="bottom-left" theme="colored" newestOnTop/>
            </div>
    )
}

export default EventPage