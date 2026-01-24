import { getUser, updateUser } from "@/lib/services/actions/users.service";
import EditUserClient from "./EditUserClient";

export default async function ({ params }: { params: { id: string } }) {
  const { id } = await params;
  const user = await getUser(id);
  
  async function handleUpdateUser(formData: any) {
    "use server";

    let payload = {
      name: formData.get("name"),
      role: 'user',
      password: null,
      active: Boolean(formData.get('active')) ?? false
    };
    if (formData.get("password") !== "") {
      payload.password = formData.get("password");
    }
    return await updateUser(id, payload);
  }

  return (
    <EditUserClient
      action={handleUpdateUser}
      user={user}
    />
  );

}