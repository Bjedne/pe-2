import { Input } from "@headlessui/react";
import { Link } from "react-router-dom";

export function Login() {
return (
  <div className="flex-1 bg-pearl">
      <div>
        <h1>Welcome back to Holidaze!</h1>
        <p>not registered? <Link to="/register"><span className="underline">Create an account</span></Link></p>
      </div>


    <Input type="text" name="name" className="border data-[hover]:shadow data-[focus]:bg-blue-100" >


    </Input>
    <Input type="text" name="password" className="border data-[hover]:shadow data-[focus]:bg-blue-100" >


    </Input>
    
    </div>
)
}