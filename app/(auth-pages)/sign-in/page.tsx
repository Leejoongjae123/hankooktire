"use client";

import { useState } from "react";
import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@nextui-org/react";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<Message | null>(null);
  const router = useRouter();
  const handleLogin = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      router.push("/protected");
    }
  };

  return (
    <form
      className="flex-1 flex flex-col min-w-64"
      onSubmit={(e) => e.preventDefault()}
    >
      <h1 className="text-2xl font-bold mb-5 text-center">로그인 </h1>
      <div className="flex flex-col gap-2 gap-y-4">
        <div>
          <h1 className="text-lg font-semibold">이메일</h1>
          <Input
            name="email"
            placeholder="이메일 입력"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <h1 className="text-lg font-semibold">비밀번호</h1>
          <Input
            type="password"
            name="password"
            placeholder="비밀번호 입력"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button className="w-full my-10" color="primary" onClick={handleLogin}>
          로그인
        </Button>
        {message && <FormMessage message={message} />}
      </div>
    </form>
  );
}
