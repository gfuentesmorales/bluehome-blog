import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { SessionLike } from "@/app/types/session";

export function withSession(action: any) {
  return async (...args: any[]) => {
    const session = (await getServerSession(
      authOptions as any
    )) as SessionLike | null;
    if ( !session?.user) {
      throw new Error("UNAUTHORIZED");
    }

    return action(session, ...args);
  };
}
