import { Input } from "@headlessui/react";
import { Link } from "react-router-dom";

export function Register() {
return (
  <div className="flex-1 bg-pearl">
    <div>
      <h1>Welcome to Holidaze!</h1>
      <p>already registered? <Link to="/login" className="underline">Log in</Link></p> 
      
      <div>
        <h2>Please choose an account type:</h2>
        <button>Customer</button>
        <button>Venue Manager</button>
      </div>

      <div>
        <Input type="text" name="name" className="border data-[hover]:shadow data-[focus]:bg-blue-100" />
        <Input type="text" name="email" className="border data-[hover]:shadow data-[focus]:bg-blue-100" />
        <Input type="text" name="password" className="border data-[hover]:shadow data-[focus]:bg-blue-100" />
        <button>Register</button>
        <p className="underline">Forgot password?</p>
      </div>
    </div>
  </div>
)


}