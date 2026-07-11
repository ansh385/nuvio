import { useState } from "react";
import { loginUser } from "../services/api";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            setMessage("Logging in...");

            const response = await loginUser({
                email,
                password,
            });

            const accessToken = response.data.session.access_token;

            localStorage.setItem("access_token", accessToken);

            setMessage("Login successful");

            console.log("Login response:", response);
        } catch (error) {
            const message =
                error instanceof Error ? error.message : "Login failed";

            setMessage(message);
        }
    }

    return (
        <main>
            <h1>Welcome back</h1>

            <p>Log in to continue your Nuvio journey.</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>

                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="password">Password</label>

                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>

                <button type="submit">Login</button>
            </form>

            {message && <p>{message}</p>}
        </main>
    );
}

export default LoginPage;