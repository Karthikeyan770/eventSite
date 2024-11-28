import EditEvents from "@/app/ui/EditEvents"
import { getJWT } from "@/app/action"
import { redirect } from "next/navigation";

const page = ({params}) => {
  const jwt = getJWT();
  if(!jwt){
    redirect('/account/login');
  }
  const id = params.id;
  return (
    <EditEvents id={id} jwt={jwt.value ? jwt.value : null}/>
  )
}

export default page