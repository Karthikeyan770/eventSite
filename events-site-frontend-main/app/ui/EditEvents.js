'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from "@/config/index";
import { useRouter } from "next/navigation";
import moment from "moment";
import Image from "next/image";
import Modal from "@/app/ui/Modal";
import ImageUpload from "@/app/ui/ImageUpload";
import { editAction } from "@/app/action";


 
const EditEvents = ({id, jwt}) => {
    const [event, setEvent] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [show, setShow] = useState(false);
    const [image, setImage] = useState(null);
    useEffect(() =>{
        fetch(`${API_URL}/api/all-events/${id}?populate=*`).then((res) => res.json()).then((data) => {
            console.log(data);
            setEvent({
                name: data.data.attributes.name,
                slug: data.data.attributes.slug,
                performers: data.data.attributes.performers,
                venue: data.data.attributes.venue,
                address: data.data.attributes.address,
                date: data.data.attributes.date,
                time: data.data.attributes.time,
                description: data.data.attributes.description,
            });
            setImagePreview(data.data.attributes.image.data ? 
                data.data.attributes.image.data.attributes.formats.thumbnail.url : null);
            setImage(data.data.attributes.image ? data.data.attributes.image : null);
        });
    }, []);
    const imageUploaded = async () => {
        const res = await fetch(`${API_URL}/api/all-events/${id}?populate=*`);
        const data = await res.json();
        setImagePreview(data.data.attributes.image.data ? 
            data.data.attributes.image.data.attributes.formats.thumbnail.url : null);
        setImage(data.data.attributes.image ? data.data.attributes.image : null);
        setShow(false);
    }
    const router = useRouter();
    const handleChange = (e) => {
        setEvent({
         ...event,
        [e.target.name]: e.target.value
        });
    };
    async function handleSubmit (e) {
        e.preventDefault();
        const hasEmpty = Object.values(event).some((value) => value === '');
        if(hasEmpty){
            toast.error('Please fill out all fields');
            return;
        }
        fetch(`${API_URL}/api/all-events/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify({
                'data': {
                  ...event,
                },
            })
        }).then(async (res) => {
            if(res.status === 200){
                toast.success('Event updated successfully');
                await editAction();
                router.push(`/events/${event.slug}`);
            }
            else if(res.status === 401 || res.status === 403){
                toast.error('You are not allowed to edit this event.');
            }
        }).catch((e) => {
            toast.error('Error updating event');
        });
    };
    return (
        <div className="flex flex-col gap-2 w-full p-10">
            <Link href='/events' className="text-blue-700 w-16">Go Back</Link>
            <h1 className="text-2xl font-bold">Edit Event</h1>
            <div className="w-full mt-4">
                <form className="w-full flex flex-col gap-6" onSubmit={(e) => {handleSubmit(e)}}>
                    <div className=" grid grid-cols-2 w-full gap-6">
                        <div className="flex flex-col gap-1">
                            <label className="font-bold" htmlFor="name">Event Name</label>
                            <input type="text" className="w-full border-2 border-slate-400 rounded-lg p-2" 
                            name="name" id="name" placeholder="Enter Event Name" onChange={handleChange}
                            value={event ? event.name : ''}/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-bold" htmlFor="performers">Performers</label>
                            <input type="text" className="w-full border-2 border-slate-400 rounded-lg p-2" 
                            name="performers" id="performers" placeholder="Enter Performers" onChange={handleChange}
                            value={event ? event.performers : ''}/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-bold" htmlFor="venue">Venue</label>
                            <input type="text" className="w-full border-2 border-slate-400 rounded-lg p-2" 
                            name="venue" id="venue" placeholder="Enter Venue" onChange={handleChange}
                            value={event ? event.venue : ''}/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-bold" htmlFor="address">Address</label>
                            <input type="text" className="w-full border-2 border-slate-400 rounded-lg p-2" 
                            name="address" id="address" placeholder="Enter Address" onChange={handleChange}
                            value={event ? event.address : ''}/>
                        </div> 
                        <div className="flex flex-col gap-1">
                            <label className="font-bold" htmlFor="date">Date</label>
                            <input type="date" className="w-full border-2 border-slate-400 rounded-lg p-2"
                            name="date" id="date" onChange={handleChange} value={event ? 
                            moment(event.date).format('yyyy-MM-DD') : ''}/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-bold" htmlFor="time">Time</label>
                            <input type="text" className="w-full border-2 border-slate-400 rounded-lg p-2" 
                            name="time" id="time" placeholder="Enter Time" onChange={handleChange}
                            value={event ? event.time : ''}/>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label className="font-bold" htmlFor="description">Description</label>
                        <textarea type="text" className="w-full h-36 border-2 border-slate-400 rounded-lg p-2" 
                        name="description" id="description" onChange={handleChange} placeholder="Enter description"
                        value={event ? event.description : ''}/>
                    </div>
                    <div className="flex flex-col gap-4 w-full h-full">
                        <h2 className="text-2xl font-bold">Image preview</h2>
                        {imagePreview ? (<Image src={imagePreview} width={300} height={170}className="h-full"
                        />): <span>No image uploaded</span>}
                        <button className="bg-slate-950 hover:bg-slate-800 text-white py-2
                        w-28 rounded-lg" onClick={(e) => {
                            e.preventDefault();
                            setShow(true);
                            }}>Edit image</button>
                    </div>
                    <Modal show={show} onClose={() => {setShow(false)}}>
                        <ImageUpload evtId={id} imageUploaded={imageUploaded} token={jwt}/>
                    </Modal>
                    <button className="p-3 bg-orange-500 hover:bg-orange-700 text-white text-center 
                    w-1/5 self-center rounded-lg" 
                    type="submit">Edit</button>
                    <ToastContainer position="bottom-left" theme="colored" newestOnTop/>
                </form>
            </div>
        </div>
    );
}

export default EditEvents;