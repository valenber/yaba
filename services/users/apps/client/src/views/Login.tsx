import { FormEvent } from "react";

export const LoginView = () => {
  const baseApiUrl =
    process.env.NODE_ENV === "production" ? "/users/api" : "/api";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    console.log("client", { email, password });

    try {
      const res = await fetch(`${baseApiUrl}/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input type="text" name="email" />

        <input type="password" name="password" />

        <input type="submit" value="Send" />
      </form>
    </>
  );
};
