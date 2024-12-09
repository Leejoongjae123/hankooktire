'use client'
import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "@nextui-org/react";
import { createClient } from "@/utils/supabase/client";
import {useState,useEffect} from "react";
import { useRouter } from "next/navigation";
export default function AuthButton() {
  const supabase = createClient();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setIsLoading(false);
    };

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        fetchUser();
      }
    });

    fetchUser();

    // Cleanup subscription on unmount
    return () => {
      authListener?.unsubscribe();
    };
  }, [supabase]);

  const handleSignOut = async () => {
    supabase.auth.signOut();
    router.push("/sign-in");
  };


  

  if (!hasEnvVars) {
    return (
      <>
        <div className="flex gap-4 items-center">
          <div>
            <Badge
              variant={"default"}
              className="font-normal pointer-events-none"
            >
              Please update .env.local file with anon key and url
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              asChild
              size="sm"
              disabled
              
            >
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button
              size="sm"
              variant=""
              
            >
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
    {isLoading ? (
      <div>Loading...</div>
    ) : (
      <div className="flex justify-center items-center gap-2">
        {user ? (
          <>
            <p>{user.email}</p>
            <Button color="primary" size="sm" onClick={handleSignOut}>로그아웃</Button>
          </>
        ) : (
          <Button color="primary" size="sm">
            <Link href="/sign-in">로그인</Link>
          </Button>
        )}
      </div>
    )}
    </>
  )
}
