import { useEffect, useMemo, useState } from 'react';

export default function FulardInaltimePage() {
  const [v, setV] = useState(localStorage.getItem('fulard_v') || '');
  const [tau, setTau] = useState(localStorage.getItem('fulard_tau') || '');
  const [a, setA] = useState(localStorage.getItem('fulard_a_inaltime') || '');
  const [d, setD] = useState(localStorage.getItem('fulard_d_inaltime') || '');

  const rezultate = useMemo(() => {
    const vNum = Number(v);
    const tauNum = Number(tau);
    const aNum = Number(a);
    const dNum = Number(d);

    const complete = v !== '' && tau !== '' && a !== '' && d !== '';
    if (!complete) return null;

    if ([vNum, tauNum, aNum, dNum].some((x) => Number.isNaN(x) || x <= 0)) {
      return { error: 'Toate valorile trebuie să fie pozitive.' };
    }

    const Lmat = vNum * tauNum;
    const r = dNum / 2;
    const BC = Math.PI * r;
    const AB = (Lmat - BC) / 2;

    if (AB <= 0) {
      return { error: 'Rezultă AB ≤ 0. Verifică valorile pentru v, τ și d.' };
    }

    const AL = (Math.sqrt(3) / 2) * AB;
    const H = AL + dNum / 2 + aNum;

    return { Lmat, r, BC, AB, AL, H };
  }, [v, tau, a, d]);

  useEffect(() => {
    localStorage.setItem('fulard_v', v);
    localStorage.setItem('fulard_tau', tau);
    localStorage.setItem('fulard_a_inaltime', a);
    localStorage.setItem('fulard_d_inaltime', d);

    if (rezultate && !rezultate.error) {
      localStorage.setItem('fulard_Hcada', rezultate.H.toFixed(3));
      localStorage.setItem('fulard_d_latime', d);
    }
  }, [v, tau, a, d, rezultate]);

  const f = (x) => Number(x).toFixed(3);

  return (
    <div className='page-wrapper'>
      <div className='card page-card'>
        <h1>Fulardul — Înălțimea căzii</h1>

        <div className='formula-box'>
          <strong>Lmat = v · τ</strong>
          <br />
          <strong>BC = π · r</strong>
          <br />
          <strong>AB = (Lmat - BC) / 2</strong>
          <br />
          <strong>AL = (√3 / 2) · AB</strong>
          <br />
          <strong>H = AL + d/2 + a</strong>
        </div>

        <label>v [m/min]</label>
        <input
          type='number'
          step='any'
          value={v}
          onChange={(e) => setV(e.target.value)}
        />

        <label>τ [min]</label>
        <input
          type='number'
          step='any'
          value={tau}
          onChange={(e) => setTau(e.target.value)}
        />

        <label>a [m]</label>
        <input
          type='number'
          step='any'
          value={a}
          onChange={(e) => setA(e.target.value)}
        />

        <label>d [m]</label>
        <input
          type='number'
          step='any'
          value={d}
          onChange={(e) => setD(e.target.value)}
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
              <strong>Lmat =</strong> {f(rezultate.Lmat)} m
            </p>
            <p>
              <strong>r =</strong> {f(rezultate.r)} m
            </p>
            <p>
              <strong>BC =</strong> {f(rezultate.BC)} m
            </p>
            <p>
              <strong>AB =</strong> {f(rezultate.AB)} m
            </p>
            <p>
              <strong>AL =</strong> {f(rezultate.AL)} m
            </p>
            <p>
              <strong>H =</strong> {f(rezultate.H)} m
            </p>
            <p className='saved-text'>
              Valoarea H se salvează automat pentru pagina de lățime.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
