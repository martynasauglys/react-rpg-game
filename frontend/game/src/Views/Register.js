import RegisterForm from '../Components/RegisterForm';
import { Link } from 'react-router-dom';
import styles from '../Styles/Login.module.css';

function Register() {
  return (
    <main className={styles.login_main}>
      <h1>Register and begin your journey</h1>
      <div className={styles.container}>
        <RegisterForm />
      </div>
    </main>
  );
}

export default Register;
