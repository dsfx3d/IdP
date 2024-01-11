"use client";

import {getSessionId} from "~/modules/idp/services/getSessionId";
import {signIn} from "~/modules/idp/services/signIn";
import {useCallback} from "react";

export function LoginForm() {
  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const email = formData.get("email") as string | null;
      const password = formData.get("password") as string | null;

      if (email && password) {
        await signIn({email, password, sessionId: await getSessionId()});
      }
    },
    [],
  );
  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="text" />
      <input name="password" type="password" />
      <button type="submit">Log in</button>
    </form>
  );
}
