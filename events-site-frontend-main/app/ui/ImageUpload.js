'use client';
import { useState } from "react";
import { API_URL } from "@/config/index";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ImageUpload = ({evtId, imageUploaded, token}) => {
  const [image, setImage] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('ref', 'api::events.events');
    formData.append('refId', evtId);
    formData.append('files', image);
    formData.append('field', 'image');
    fetch(`${API_URL}/api/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    }).then((res) => {
      toast.success('image uploaded successfully');
      imageUploaded();
    }).catch((err) => {
      toast.error('Error uploading image');
    });
  }
  return (
    <div>
        <div className="flex flex-col gap-3">
            <label className="font-bold" htmlFor="image">Image</label>
            <input type="file" className="w-full border-2 border-slate-400 rounded-lg p-2" 
            id="image" onChange={(e) => {setImage(e.target.files[0])}}
            />
            <button className="px-3 py-2 rounded-lg 
            bg-black hover:bg-slate-900 text-white" onClick={handleSubmit}>Upload</button>
            <ToastContainer position="bottom-left" theme="colored" newestOnTop/>
        </div>
    </div>
  )
}

export default ImageUpload