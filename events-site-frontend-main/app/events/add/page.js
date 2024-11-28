import { getJWT } from "@/app/action"
import AddEvents from "@/app/ui/AddEvents";
import { redirect } from "next/navigation";

const page = () => {
  const jwt = getJWT();
  if(!jwt){
    redirect('/account/login');
  }
  return (
    <AddEvents token={jwt.value ? jwt.value : null} />
  )
}

export default page