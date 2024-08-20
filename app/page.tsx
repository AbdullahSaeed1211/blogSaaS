import Image from "next/image";
import {
  RegisterLink,
  LoginLink,
  LogoutLink
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
export default async function Home() {
  const { getUser } = getKindeServerSession();
  const session = await getUser();
  return (
    <div className="p-10">
     {session ? (
      <div>
        <LogoutLink>
          <Button>Log Out</Button>
        </LogoutLink>
      </div>
     ): (
      <div>
      <RegisterLink>
      <Button>Register</Button>
      </RegisterLink>
      <LoginLink>
      <Button>Login</Button>
      </LoginLink>
      </div>
     )
    }
    </div>
  );
}
