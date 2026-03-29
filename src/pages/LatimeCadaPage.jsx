import { useEffect, useState } from 'react';

export default function LatimeCadaPage() {
  const [d, setD] = useState(localStorage.getItem('latime_d') || '');
  const [p, setP] = useState(localStorage.getItem('latime_p') || '');
  const [c, setC] = useState(localStorage.getItem('latime_c') || '');

  const [D, setBigD] = useState(localStorage.getItem('latime_D') || '');
  const [p1, setP1] = useState(localStorage.getItem('latime_p1') || '');
  const [c1, setC1] = useState(localStorage.getItem('latime_c1') || '');

  const calcLinf = () => {
    return 2 * Number(d || 0) + Number(p || 0) + 2 * Number(c || 0);
  };

  const calcLsup = () => {
    return 2 * Number(D || 0) + Number(p1 || 0) + 2 * Number(c1 || 0);
  };

  const hasLinfValues = d !== '' || p !== '' || c !== '';
  const hasLsupValues = D !== '' || p1 !== '' || c1 !== '';

  const rezultatLinf = hasLinfValues ? calcLinf().toFixed(3) : '';
  const rezultatLsup = hasLsupValues ? calcLsup().toFixed(3) : '';

  useEffect(() => {
    localStorage.setItem('latime_d', d);
    localStorage.setItem('latime_p', p);
    localStorage.setItem('latime_c', c);

    localStorage.setItem('latime_D', D);
    localStorage.setItem('latime_p1', p1);
    localStorage.setItem('latime_c1', c1);

    if (hasLinfValues) {
      localStorage.setItem('linf', rezultatLinf);
    }

    if (hasLsupValues) {
      localStorage.setItem('lsup', rezultatLsup);
    }
  }, [
    d,
    p,
    c,
    D,
    p1,
    c1,
    rezultatLinf,
    rezultatLsup,
    hasLinfValues,
    hasLsupValues,
  ]);

  return (
    <div className='page-wrapper'>
      <div className='card page-card'>
        <h1>Lățimea căzii</h1>

        <p className='section-title'>Baza mică</p>

        <div className='formula-box'>
          <strong>linf = 2d + p + 2c</strong>
        </div>

        <p className='info-text'>
          <strong>d</strong> - diametrul rolelor de conducere [m]
          <br />
          <strong>p</strong> - pasul dintre două role consecutive [m]
          <br />
          <strong>c</strong> - distanța de la role la peretele căzii [m]
        </p>

        <label htmlFor='d'>d [m]</label>
        <input
          id='d'
          type='number'
          step='any'
          value={d}
          onChange={(e) => setD(e.target.value)}
        />

        <label htmlFor='p'>p [m]</label>
        <input
          id='p'
          type='number'
          step='any'
          value={p}
          onChange={(e) => setP(e.target.value)}
        />

        <label htmlFor='c'>c [m]</label>
        <input
          id='c'
          type='number'
          step='any'
          value={c}
          onChange={(e) => setC(e.target.value)}
        />

        <div className='results-box'>
          <p>
            <strong>linf =</strong> {hasLinfValues ? `${rezultatLinf} m` : '-'}
          </p>
        </div>

        <div className='section-divider'></div>

        <p className='section-title'>Baza mare</p>

        <div className='formula-box'>
          <strong>lsup = 2D + p1 + 2c1</strong>
        </div>

        <p className='info-text'>
          <strong>D</strong> - diametrul cilindrului [m]
          <br />
          <strong>p1</strong> - pasul dintre doi cilindri consecutivi [m]
          <br />
          <strong>c1</strong> - distanța dintre cilindru și peretele căzii [m]
        </p>

        <label htmlFor='bigD'>D [m]</label>
        <input
          id='bigD'
          type='number'
          step='any'
          value={D}
          onChange={(e) => setBigD(e.target.value)}
        />

        <label htmlFor='p1'>p1 [m]</label>
        <input
          id='p1'
          type='number'
          step='any'
          value={p1}
          onChange={(e) => setP1(e.target.value)}
        />

        <label htmlFor='c1'>c1 [m]</label>
        <input
          id='c1'
          type='number'
          step='any'
          value={c1}
          onChange={(e) => setC1(e.target.value)}
        />

        <div className='results-box'>
          <p>
            <strong>lsup =</strong> {hasLsupValues ? `${rezultatLsup} m` : '-'}
          </p>
          <p className='saved-text'>
            Rezultatele se salvează automat pentru pagina „Înălțime cadă”.
          </p>
        </div>
      </div>
    </div>
  );
}
