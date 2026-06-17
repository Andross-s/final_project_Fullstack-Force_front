import LoginForm from '../../auth/LoginForm/LoginForm';
import RegistrationForm from "../../auth/RegistrationForm/RegistrationForm";

export default function Header() {
    return (
        <header>
            <RegistrationForm />
            <LoginForm />
        </header>
    )
}
