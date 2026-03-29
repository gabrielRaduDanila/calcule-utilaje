import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const correctPassword = 'dima2026';

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === correctPassword) {
      localStorage.setItem('isAuthenticated', 'true');
      setError('');
      navigate('/app');
    } else {
      setError('Parolă greșită.');
    }
  };

  return (
    <div className='login-page'>
      <div className='card'>
        <h1>Acces aplicație</h1>
        <p>Introdu parola pentru a continua.</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor='password'>Parolă</label>
          <input
            id='password'
            type='password'
            placeholder='Scrie parola'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className='error-text'>{error}</p>}

          <button type='submit'>Intră</button>
        </form>
      </div>
    </div>
  );
}
