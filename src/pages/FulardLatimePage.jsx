import { useEffect, useMemo, useState } from 'react';

export default function FulardLatimePage() {
  const [H, setH] = useState(localStorage.getItem('fulard_Hcada') || '');
  const [d, setD] = useState(localStorage.getItem('fulard_d_latime') || '');
  const [c, setC] = useState(localStorage.getItem('fulard_c_latime') || '');

  const rezultate = useMemo(() => {
    const HNum = Number(H);
    const dNum = Number(d);
    const cNum = Number(c);

    const complete = H !== '' && d !== '' && c !== '';
    if (!complete) return null;

    if ([HNum, dNum, cNum].some((x) => Number.isNaN(x) || x <= 0)) {
      return { error: 'Toate valorile trebuie să fie pozitive.' };
    }

    const linf = dNum + 2 * cNum;
    const lsup = linf + 2 * HNum * Math.tan(Math.PI / 6);

    return { linf, lsup };
  }, [H, d, c]);

  useEffect(() => {
    localStorage.setItem('fulard_Hcada', H);
    localStorage.setItem('fulard_d_latime', d);
    localStorage.setItem('fulard_c_latime', c);

    if (rezultate && !rezultate.error) {
      localStorage.setItem('fulard_linf', rezultate.linf.toFixed(3));
      localStorage.setItem('fulard_lsup', rezultate.lsup.toFixed(3));
    }
  }, [H, d, c, rezultate]);

  const f = (x) => Number(x).toFixed(3);

  return (
    <div className='page-wrapper'>
      <div className='card page-card'>
        <h1>Fulardul — Lățimea căzii</h1>

        <div className='formula-box'>
          <strong>linf = d + 2c</strong>
          <br />
          <strong>lsup = linf + 2H · tg(30°)</strong>
        </div>

        <p className='info-text'>
          Aici <strong>c</strong> este distanța de la cilindrul inferior la
          peretele căzii.
        </p>

        <label>H [m]</label>
        <input
          type='number'
          step='any'
          value={H}
          onChange={(e) => setH(e.target.value)}
        />

        <label>d [m]</label>
        <input
          type='number'
          step='any'
          value={d}
          onChange={(e) => setD(e.target.value)}
        />

        <label>c [m]</label>
        <input
          type='number'
          step='any'
          value={c}
          onChange={(e) => setC(e.target.value)}
        />

        {!rezultate && (
          <div className='results-box'>Introdu toate valorile.</div>
        )}

        {rezultate?.error && (
          <div className='results-box'>
            <p className='error-text'>{rezultate.error}</p>
          </div>
        )}

        {rezultate && !rezultate.error && (
          <div className='results-box'>
            <p>
              <strong>linf =</strong> {f(rezultate.linf)} m
            </p>
            <p>
              <strong>lsup =</strong> {f(rezultate.lsup)} m
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
