import { useState } from "react";
import { useAuth } from "../context/AuthProvider.tsx";
import '../styles/LoginPage.css';
import {Auth} from "../api";
import {AuthResponse} from "../api/generated";
import {AxiosResponse} from "axios";

export default function LoginPage() {
    const { login } = useAuth();
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let response : AxiosResponse<AuthResponse>;
        const body: any = { email, password };
        if (isRegister) {
            body.firstName = firstName;
            body.lastName = lastName;
            response = await Auth.authRegisterPost(body);
        } else {
            response = await Auth.authLoginPost(body);
        }

        if (response.status == 200) {
            const token  = response.data.token;
            login(token || '');// store in sessionStorage & context
        } else {
            const error = response.statusText;
            alert("Error: " + error);
        }
    };

    return (
        <div className="login-page">
            <div className="login-form-container">
                <h2>{isRegister ? "Register" : "Login"}</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    {isRegister && (
                        <>
                            <input
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="First Name"
                            />
                            <input
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Last Name"
                            />
                        </>
                    )}
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        type="email"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button type="submit">{isRegister ? "Register" : "Login"}</button>
                </form>
                <p className="toggle-text" onClick={() => setIsRegister(!isRegister)}>
                    {isRegister ? "Have an account? Login" : "No account? Register"}
                </p>
            </div>
        </div>
    );
}
