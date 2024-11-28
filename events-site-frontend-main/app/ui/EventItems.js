import Image from "next/image";
import Link from "next/link";

const EventItem = ({evt}) => {
    return (
        <div className="flex justify-between items-center w-full rounded-md p-4 shadow-xl hover:shadow-2xl transition-shadow">
            <Image src={evt.image.data ? evt.image.data.attributes.formats.thumbnail.url : '/images/showcase.jpg'} 
            width={170} height={100}/>
            <div className="flex flex-col gap-2 w-96">
                <span>{new Date(evt.date).toLocaleDateString('en-IN')} at {evt.time}</span>
                <h1 className="text-xl font-bold">{evt.name}</h1>
            </div>
            <Link href={`/events/${evt.slug}`} legacyBehavior>
                <a className="bg-orange-500 hover:bg-orange-700 transition-colors text-white font-bold py-2 px-4 rounded">
                    View Details
                </a>
            </Link>
        </div>
    );
}

export default EventItem;