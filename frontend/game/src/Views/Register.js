import RegisterForm from '../Components/RegisterForm';
import { Link } from 'react-router-dom';
import styles from '../Views/Register.module.css';

function Register() {
  return (
    <div>
      <h3 className={styles.testas}>Register</h3>
      <RegisterForm />
      <p>
        Already have an account? <Link to='/'>Login</Link>
      </p>
    </div>
  );
}

export default Register;
