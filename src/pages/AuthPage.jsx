import SignUpForm from "../components/auth/SignUpForm"
import LoginForm from "../components/auth/LoginForm"

export default function AuthPage({setUser}){
    return (
        <main className="AuthPage">
            <h1>Auth Page</h1>
            <SignUpForm setUser={setUser}/>
            <LoginForm setUser={setUser}/>
        </main>
    )
}