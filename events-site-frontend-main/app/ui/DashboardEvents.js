'use client';
import Image from "next/image";
import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { API_URL } from "@/config";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { dashboardAction } from "../action";
import { useRouter } from "next/navigation";

const DashboardEvents = ({evt, token}) => {
    const router = useRouter();
    async function deleteEvent(){
        const res = fetch(`${API_URL}/api/all-events/${evt.id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const result = await toast.promise(res, {
            pending: 'Deleting Event...',
        })
        if(result.status === 200) {
            await dashboardAction();
            toast.success('Event Deleted');
            router.refresh();
        }
        else if(result.status === 401 || result.status === 403){
            toast.error('You are not allowed to delete this event');
        }
        else{
            toast.error('Error Deleting Event');
        }
    }
    return (
        <div className="flex justify-between items-center w-full rounded-md p-4 shadow-xl hover:shadow-2xl transition-shadow">
            <Image src={evt.image ? evt.image.formats.thumbnail.url : '/images/showcase.jpg'} 
            width={170} height={100}/>
            <div className="flex flex-col gap-2 w-96">
                <span>{new Date(evt.date).toLocaleDateString('en-IN')} at {evt.time}</span>
                <h1 className="text-xl font-bold">{evt.name}</h1>
            </div>
            <div className="flex gap-6">
                <Link href={`/events/edit/${evt.id}`} className="bg-sky-500 hover:bg-sky-700 transition-colors text-white font-bold py-2 px-4 rounded">
                    <FaPencilAlt className=" inline"/> Edit Event
                </Link>
                <button className="bg-red-500 hover:bg-red-700 transition-colors text-white font-bold py-2 px-4 rounded"
                onClick={() => {deleteEvent()}}>
                    <FaTimes className="inline"/> Delete Event
                </button>
            </div>
            <ToastContainer position="bottom-left" theme="colored" newestOnTop/>
        </div>
    );
}

export default DashboardEvents;