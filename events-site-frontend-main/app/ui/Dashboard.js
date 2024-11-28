'use client';
import { useRouter } from "next/navigation";
import { API_URL } from "@/config/index";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import action from "../action";
import { FaPencilAlt, FaTimes } from "react-icons/fa";

const Dashboard = ({id, token}) => {
    const router = useRouter();
    async function deleteEvent(){
        const res = fetch(`${API_URL}/api/all-events/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const result = await toast.promise(res, {
            pending: 'Deleting Event...',
        })
        if(result.status === 200) {
            toast.success('Event deleted');
            await action();
            router.push('/events');
        }
        else if(result.status === 401 || result.status === 403){
            toast.error('You are not authorized to delete this event');
        }
    }
    return(
        <div className="w-full flex justify-end">
            <div className="mr-10 flex gap-4 p-4">
                <Link href={`/events/edit/${id}`} className="text-blue-500"><FaPencilAlt className="inline" /> Edit event</Link>
                <button className="text-red-600" onClick={() => {deleteEvent()}}><FaTimes className="inline" /> Delete event</button>
            </div>
            <ToastContainer position="bottom-left" theme="colored" newestOnTop/>
        </div>
    )
}

export default Dashboard;