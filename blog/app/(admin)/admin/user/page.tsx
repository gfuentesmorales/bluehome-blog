import { getUsers } from "@/lib/services/actions/users.service";
import Link from "next/link";
import UserTable from "./UserTable";
import { PaginatedUsers, User } from "@/app/types/user";

export default async function AdminUser() {

  const usersData: PaginatedUsers = await getUsers({
    page: 1,
    limit: 10,
  });
  return (
    <UserTable data={usersData} />
  );
}
