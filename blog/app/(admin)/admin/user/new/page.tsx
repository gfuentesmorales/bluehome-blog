import { createUser } from "@/lib/services/actions/users.service";
import CreateUserClient from "./CreateUserClient";

export default async function Page() {

  async function generateUser(formData: any) {
    "use server";

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      active: Boolean(formData.get('active')) ?? false,
      role: 'user',
    };
   
    return await createUser(payload); 
  }

  return (
    <CreateUserClient
      action={generateUser}
    />
  );

}