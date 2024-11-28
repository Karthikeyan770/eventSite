'use client';
import Link from "next/link";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from "@/config/index";
import { useRouter } from "next/navigation";
import action from "@/app/action";

const AddEvents = ({token}) => {
    const initialState = {
        name: "",
        performers: "",
        venue: "",
        date: "",
        time: "",
        description: "",
        address: "",
    }
    const [event, setEvent] = useState(initialState);
    const [image, setImage] = useState(null);
    const router = useRouter();
    const handleChange = (e) => {
        setEvent({
         ...event,
            [e.target.name]: e.target.value
        });
    };
    const handleImageChange = (e) =>{
        setImage(e.target.files[0]);
    }
    async function handleSubmit (e) {
        e.preventDefault();
        const hasEmpty = Object.values(event).some((value) => value === '');
        if(hasEmpty){
            toast.error('Please fill out all fields');
            return;
        }
        if(image === null){
            toast.error('Please upload an image');
            return;
        }
        const formData = new FormData();
        formData.append('data', JSON.stringify(event));
        formData.append('files.image', image, image.name);
        const res = fetch(`${API_URL}/api/all-events`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData
        });
        const result = await toast.promise(res, {
            pending: 'Adding Event...',
            success: 'Event Added',
            error: 'Error Adding Event'
        });
        if(result.ok) {
            await action();
            router.push('/events');
            setEvent(initialState);
        }
    };
    return (
        <div className="flex flex-col gap-2 w-full p-10">
            <Link href='/' className="text-blue-700 w-16">Go Back</Link>
            <h1 className="text-2xl font-bold">Add Events</h1>
            <div className="w-full mt-4">
                <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
                    <div className=" grid grid-cols-2 w-full gap-6">
                        <div className="flex flex-col gap-1">
                            <label className="font-bold" htmlFor="name">Event Name</label>
                            <input type="text" className="w-full border-2 border-slate-400 rounded-lg p-2" 
                            name="name" id="name" placeholder="Enter Event Name" onChange={handleChange}
                            value={event.name}/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-bold" htmlFor="performers">Performers</label>
                            <input type="text" className="w-full border-2 border-slate-400 rounded-lg p-2" 
                            name="performers" id="performers" placeholder="Enter Performers" onChange={handleChange}
                            value={event.performers}/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-bold" htmlFor="venue">Venue</label>
                            <input type="text" className="w-full border-2 border-slate-400 rounded-lg p-2" 
                            name="venue" id="venue" placeholder="Enter Venue" onChange={handleChange}
                            value={event.venue}/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-bold" htmlFor="address">Address</label>
                            <input type="text" className="w-full border-2 border-slate-400 rounded-lg p-2" 
                            name="address" id="address" placeholder="Enter Address" onChange={handleChange}
                            value={event.address}/>
                        </div> 
                        <div className="flex flex-col gap-1">
                            <label className="font-bold" htmlFor="date">Date</label>
                            <input type="date" className="w-full border-2 border-slate-400 rounded-lg p-2"
                            name="date" id="date" onChange={handleChange} value={event.date}/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-bold" htmlFor="time">Time</label>
                            <input type="text" className="w-full border-2 border-slate-400 rounded-lg p-2" 
                            name="time" id="time" placeholder="Enter Time" onChange={handleChange}
                            value={event.time}/>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label className="font-bold" htmlFor="description">Description</label>
                        <textarea type="text" className="w-full h-36 border-2 border-slate-400 rounded-lg p-2" 
                        name="description" id="description" onChange={handleChange} placeholder="Enter description"/>
                    </div>
                    <label htmlFor="image" className="font-bold text-2xl">Upload an image</label>
                    <input type="file" name="image" id="image" onChange={handleImageChange}/>
                    <button className="p-3 bg-orange-500 hover:bg-orange-700 text-white text-center 
                    w-1/5 self-center rounded-lg" 
                    type="submit">Submit</button>
                    <ToastContainer position="bottom-left" theme="colored" newestOnTop/>
                </form>
            </div>
        </div>
    );
}

export default AddEvents;