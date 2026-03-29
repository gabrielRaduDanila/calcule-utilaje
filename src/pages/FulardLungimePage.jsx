import { useEffect, useState } from 'react';

export default function FulardLungimePage() {
  const [lmat, setLmat] = useState(localStorage.getItem('fulard_lmat') || '');
  const [a, setA] = useState(localStorage.getItem('fulard_a_lungime') || '');
  const [b, setB] = useState(localStorage.getItem('fulard_b_lungime') || '');

  const calcL = () =>
    Number(lmat || 0) + 2 * Number(a || 0) + 2 * Number(b || 0);

  const hasValues = lmat !== '' || a !== '' || b !== '';
  const rezultatL = hasValues ? calcL().toFixed(3) : '';

  useEffect(() => {
    localStorage.setItem('fulard_lmat', lmat);
    localStorage.setItem('fulard_a_lungime', a);
    localStorage.setItem('fulard_b_lungime', b);

    if (hasValues) {
      localStorage.setItem('fulard_Lcada', rezultatL);
    }
  }, [lmat, a, b, hasValues, rezultatL]);

  return (
    <div className='page-wrapper'>
      <div className='card page-card'>
        <h1>Fulardul — Lungimea căzii</h1>

        <div className='formula-box'>
          <strong>L = lmat + 2a + 2b</strong>
        </div>

        <label>lmat [m]</label>
        <input
          type='number'
          step='any'
          value={lmat}
          onChange={(e) => setLmat(e.target.value)}
        />

        <label>a [m]</label>
        <input
          type='number'
          step='any'
          value={a}
          onChange={(e) => setA(e.target.value)}
        />

        <label>b [m]</label>
        <input
          type='number'
          step='any'
          value={b}
          onChange={(e) => setB(e.target.value)}
        />

        <div className='results-box'>
          <p>
            <strong>L =</strong> {hasValues ? `${rezultatL} m` : '-'}
          </p>
          <p className='saved-text'>
            Valoarea se salvează automat pentru paginile următoare.
          </p>
        </div>
      </div>
    </div>
  );
}
