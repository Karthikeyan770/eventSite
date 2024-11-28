'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

const Search = () => {
    const [term, setTerm] = useState('');
    const router = useRouter();
    const handleSubmit = (e) => {
        e.preventDefault();
        if(term != ''){
            router.push(`/events/search?term=${term}`);
            setTerm('');
        }
        else{
            alert('Please enter a search term');
        }
    }
    return (
        <div className="w-2/5 p-2 self-center">
            <form className="w-full" onSubmit={handleSubmit}>
                <input type="text" placeholder="Search" onChange={(e) => {setTerm(e.target.value)}}
                className="w-full self-center p-2 border-slate-400 border-2 rounded-lg" value={term}/>
            </form>
        </div>
    )
}

export default Search;