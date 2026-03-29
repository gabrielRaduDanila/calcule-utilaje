import { useMemo, useState } from 'react';

export default function FulardPuterePage() {
  const [R, setR] = useState('');
  const [l, setL] = useState(localStorage.getItem('fulard_lmat') || '');
  const [v, setV] = useState(localStorage.getItem('fulard_v') || '');
  const [phiTr, setPhiTr] = useState('');
  const [muFr, setMuFr] = useState('');
  const [muSt, setMuSt] = useState('');
  const [p, setP] = useState('');
  const [Lcil, setLcil] = useState('');
  const [phiCorectie, setPhiCorectie] = useState('');
  const [beta, setBeta] = useState('');

  const rezultate = useMemo(() => {
    const RNum = Number(R);
    const lNum = Number(l);
    const vNum = Number(v);
    const phiTrNum = Number(phiTr);
    const muFrNum = Number(muFr);
    const muStNum = Number(muSt);
    const pNum = Number(p);
    const LcilNum = Number(Lcil);
    const phiCorectieNum = Number(phiCorectie);
    const betaNum = Number(beta);

    const complete =
      R !== '' &&
      l !== '' &&
      v !== '' &&
      phiTr !== '' &&
      muFr !== '' &&
      muSt !== '' &&
      p !== '' &&
      Lcil !== '' &&
      phiCorectie !== '' &&
      beta !== '';

    if (!complete) return null;

    if (
      [
        RNum,
        lNum,
        vNum,
        phiTrNum,
        muFrNum,
        muStNum,
        pNum,
        LcilNum,
        phiCorectieNum,
        betaNum,
      ].some((x) => Number.isNaN(x) || x <= 0)
    ) {
      return { error: 'Toate valorile trebuie să fie pozitive.' };
    }

    const vMs = vNum / 60;
    const Ftr = ((phiTrNum * RNum) / 50) * lNum;
    const Ntr = (Ftr * vMs) / 1000;

    const Ffr = muFrNum * Ftr;
    const Nfr = (Ffr * vMs) / 102;

    const Fst = muStNum * pNum * LcilNum;
    const Nst = (Fst * vMs) / 102;

    const Naux = phiCorectieNum * (Ntr + Nfr + Nst);
    const N = Ntr + Nfr + Nst + Naux;
    const Ninst = betaNum * N;

    return { vMs, Ftr, Ntr, Ffr, Nfr, Fst, Nst, Naux, N, Ninst };
  }, [R, l, v, phiTr, muFr, muSt, p, Lcil, phiCorectie, beta]);

  const f = (x) => Number(x).toFixed(4);

  return (
    <div className='page-wrapper'>
      <div className='card page-card'>
        <h1>Fulardul — Puterea motorului</h1>

        <div className='formula-box'>
          <strong>N = Ntr + Nfr + Nst + Nvar+red+lag</strong>
          <br />
          <strong>Ntr = (Ftr · v) / 1000</strong>
          <br />
          <strong>Ftr = φ · R/50 · l</strong>
          <br />
          <strong>Ffr = μ · Ftr</strong>
          <br />
          <strong>Fst = μ · p · L</strong>
          <br />
          <strong>Ninst = β · N</strong>
        </div>

        <label>R [N]</label>
        <input
          type='number'
          step='any'
          value={R}
          onChange={(e) => setR(e.target.value)}
        />

        <label>l [m]</label>
        <input
          type='number'
          step='any'
          value={l}
          onChange={(e) => setL(e.target.value)}
        />

        <label>v [m/min]</label>
        <input
          type='number'
          step='any'
          value={v}
          onChange={(e) => setV(e.target.value)}
        />

        <label>φ tracțiune</label>
        <input
          type='number'
          step='any'
          value={phiTr}
          onChange={(e) => setPhiTr(e.target.value)}
        />

        <label>μ frecare</label>
        <input
          type='number'
          step='any'
          value={muFr}
          onChange={(e) => setMuFr(e.target.value)}
        />

        <label>μ stoarcere</label>
        <input
          type='number'
          step='any'
          value={muSt}
          onChange={(e) => setMuSt(e.target.value)}
        />

        <label>p [kgf/cm]</label>
        <input
          type='number'
          step='any'
          value={p}
          onChange={(e) => setP(e.target.value)}
        />

        <label>L cilindri [cm]</label>
        <input
          type='number'
          step='any'
          value={Lcil}
          onChange={(e) => setLcil(e.target.value)}
        />

        <label>φ corecție</label>
        <input
          type='number'
          step='any'
          value={phiCorectie}
          onChange={(e) => setPhiCorectie(e.target.value)}
        />

        <label>β pentru puterea instalată</label>
        <input
          type='number'
          step='any'
          value={beta}
          onChange={(e) => setBeta(e.target.value)}
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
              <strong>v =</strong> {f(rezultate.vMs)} m/s
            </p>
            <p>
              <strong>Ftr =</strong> {f(rezultate.Ftr)}
            </p>
            <p>
              <strong>Ntr =</strong> {f(rezultate.Ntr)} kW
            </p>
            <p>
              <strong>Ffr =</strong> {f(rezultate.Ffr)}
            </p>
            <p>
              <strong>Nfr =</strong> {f(rezultate.Nfr)} kW
            </p>
            <p>
              <strong>Fst =</strong> {f(rezultate.Fst)}
            </p>
            <p>
              <strong>Nst =</strong> {f(rezultate.Nst)} kW
            </p>
            <p>
              <strong>Nvar+red+lag =</strong> {f(rezultate.Naux)} kW
            </p>
            <p>
              <strong>N total =</strong> {f(rezultate.N)} kW
            </p>
            <p>
              <strong>Ninst =</strong> {f(rezultate.Ninst)} kW
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
