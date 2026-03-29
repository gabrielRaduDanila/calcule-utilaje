import { useEffect, useState } from 'react';

export default function LungimeCadaPage() {
  const [lmat, setLmat] = useState(localStorage.getItem('lungime_lmat') || '');
  const [a, setA] = useState(localStorage.getItem('lungime_a') || '');
  const [b, setB] = useState(localStorage.getItem('lungime_b') || '');

  const calcL = () => {
    return Number(lmat || 0) + 2 * Number(a || 0) + 2 * Number(b || 0);
  };

  const hasValues = lmat !== '' || a !== '' || b !== '';
  const rezultatL = hasValues ? calcL().toFixed(3) : '';

  useEffect(() => {
    localStorage.setItem('lungime_lmat', lmat);
    localStorage.setItem('lungime_a', a);
    localStorage.setItem('lungime_b', b);

    if (hasValues) {
      localStorage.setItem('Lcada', rezultatL);
    }
  }, [lmat, a, b, rezultatL, hasValues]);

  return (
    <div className='page-wrapper'>
      <div className='card page-card'>
        <h1>Lungimea căzii</h1>

        <p>Formula de calcul:</p>

        <div className='formula-box'>
          <strong>L = lmat + 2a + 2b</strong>
        </div>

        <p className='info-text'>
          <strong>lmat</strong> - lățimea materialului textil [m]
          <br />
          <strong>a</strong> - distanța de la liziera țesăturii la capătul
          cilindrului [m]
          <br />
          <strong>b</strong> - distanța de la capătul cilindrului la peretele
          căzii [m]
        </p>

        <label htmlFor='lmat'>lmat [m]</label>
        <input
          id='lmat'
          type='number'
          step='any'
          value={lmat}
          onChange={(e) => setLmat(e.target.value)}
          placeholder='ex: 1.5'
        />

        <label htmlFor='a'>a [m]</label>
        <input
          id='a'
          type='number'
          step='any'
          value={a}
          onChange={(e) => setA(e.target.value)}
          placeholder='ex: 0.2'
        />

        <label htmlFor='b'>b [m]</label>
        <input
          id='b'
          type='number'
          step='any'
          value={b}
          onChange={(e) => setB(e.target.value)}
          placeholder='ex: 0.3'
        />

        <div className='results-box'>
          <p>
            <strong>Lcadă =</strong> {hasValues ? `${rezultatL} m` : '-'}
          </p>
          <p className='saved-text'>
            Rezultatul se salvează automat pentru pagina „Înălțime cadă”.
          </p>
        </div>
      </div>
    </div>
  );
}
