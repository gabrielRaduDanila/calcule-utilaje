import { useMemo, useState } from 'react';

export default function BilantTermicPage() {
  // valori preluate automat unde se poate
  const [g, setG] = useState(localStorage.getItem('inaltime_g') || '');
  const [LIncarcare, setLIncarcare] = useState(
    localStorage.getItem('inaltime_LIncarcare') || '',
  );
  const [Hm, setHm] = useState(localStorage.getItem('inaltime_Hm') || '');
  const [Lcada, setLcada] = useState(localStorage.getItem('Lcada') || '');
  const [linf, setLinf] = useState(localStorage.getItem('linf') || '');
  const [lsup, setLsup] = useState(localStorage.getItem('lsup') || '');
  const [H, setH] = useState(localStorage.getItem('Hcada_final') || '');

  // utilizatorul introduce strictul necesar
  const [cpMat, setCpMat] = useState('');
  const [ti, setTi] = useState('');
  const [tf, setTf] = useState('');
  const [timp, setTimp] = useState(''); // secunde

  const [cpApa, setCpApa] = useState('');
  const [x, setX] = useState('');

  const [Vap, setVap] = useState('');
  const [rhoOtel, setRhoOtel] = useState('');

  const [tAbur, setTAbur] = useState('');
  const [w, setW] = useState('');
  const [phi, setPhi] = useState('');
  const [pB, setPB] = useState('');
  const [pvs, setPvs] = useState('');
  const [r, setR] = useState('');

  // dimensionarea sistemului
  const [alpha1, setAlpha1] = useState('');
  const [alpha2, setAlpha2] = useState('');
  const [deltaP, setDeltaP] = useState('');
  const [lambdaP, setLambdaP] = useState('');
  const [di, setDi] = useState('');
  const [dext, setDext] = useState('');
  const [lungimeElement, setLungimeElement] = useState('');

  const rezultate = useMemo(() => {
    const values = {
      g: Number(g),
      LIncarcare: Number(LIncarcare),
      Hm: Number(Hm),
      Lcada: Number(Lcada),
      linf: Number(linf),
      lsup: Number(lsup),
      H: Number(H),

      cpMat: Number(cpMat),
      ti: Number(ti),
      tf: Number(tf),
      timp: Number(timp),

      cpApa: Number(cpApa),
      x: Number(x),

      Vap: Number(Vap),
      rhoOtel: Number(rhoOtel),

      tAbur: Number(tAbur),
      w: Number(w),
      phi: Number(phi),
      pB: Number(pB),
      pvs: Number(pvs),
      r: Number(r),

      alpha1: Number(alpha1),
      alpha2: Number(alpha2),
      deltaP: Number(deltaP),
      lambdaP: Number(lambdaP),
      di: Number(di),
      dext: Number(dext),
      lungimeElement: Number(lungimeElement),
    };

    const allFilled = Object.values({
      g,
      LIncarcare,
      Hm,
      Lcada,
      linf,
      lsup,
      H,
      cpMat,
      ti,
      tf,
      timp,
      cpApa,
      x,
      Vap,
      rhoOtel,
      tAbur,
      w,
      phi,
      pB,
      pvs,
      r,
      alpha1,
      alpha2,
      deltaP,
      lambdaP,
      di,
      dext,
      lungimeElement,
    }).every((v) => v !== '');

    if (!allFilled) return null;

    if (
      Object.values(values).some((v) => Number.isNaN(v) || !Number.isFinite(v))
    ) {
      return { error: 'Există valori invalide.' };
    }

    if (
      values.LIncarcare <= 0 ||
      values.Hm <= 0 ||
      values.Lcada <= 0 ||
      values.linf <= 0 ||
      values.lsup <= 0 ||
      values.H <= 0 ||
      values.cpMat <= 0 ||
      values.timp <= 0 ||
      values.cpApa <= 0 ||
      values.Vap <= 0 ||
      values.rhoOtel <= 0 ||
      values.pB <= 0 ||
      values.pvs <= 0 ||
      values.r <= 0 ||
      values.alpha1 <= 0 ||
      values.alpha2 <= 0 ||
      values.deltaP <= 0 ||
      values.lambdaP <= 0 ||
      values.di <= 0 ||
      values.dext <= 0 ||
      values.lungimeElement <= 0
    ) {
      return { error: 'Valorile numerice trebuie să fie pozitive.' };
    }

    if (values.tf <= values.ti) {
      return {
        error:
          'Temperatura finală trebuie să fie mai mare decât temperatura inițială.',
      };
    }

    const deltaT = values.tf - values.ti;

    // masa material [kg]
    const Mmat = (values.LIncarcare * values.g) / 1000;

    // Qmat [W]
    const Qmat = (Mmat * values.cpMat * deltaT) / values.timp;

    // masa soluției [kg]
    const Msol = Mmat * values.Hm;

    // cp soluție
    const cpSol = values.cpApa * (1 - values.x / 100);

    // Qsol [W]
    const Qsol = (Msol * cpSol * deltaT) / values.timp;

    // masa căzii din oțel
    const Map = values.Vap * values.rhoOtel;

    // Qap [W]
    const Qap = (Map * values.cpMat * deltaT) / values.timp;

    // arie suprafață liberă
    const AB = values.lsup * values.Lcada;

    // interpretare simplificată a ariei laterale după forma de trapez din secțiune
    const Alat =
      ((values.linf + values.lsup) *
        Math.sqrt(values.H ** 2 + (values.lsup - values.linf) ** 2)) /
      2;

    // delta tm
    const dtMax = values.tAbur - values.ti;
    const dtMin = values.tAbur - values.tf;

    if (dtMax <= 0 || dtMin <= 0) {
      return {
        error:
          'Temperatura aburului trebuie să fie mai mare decât temperaturile inițială și finală.',
      };
    }

    const raport = dtMax / dtMin;
    const deltaTm =
      raport > 2
        ? (dtMax - dtMin) / (2.3 * Math.log10(dtMax / dtMin))
        : (dtMax + dtMin) / 2;

    // coeficient convecție pierderi
    const alpha = 9.74 + 0.07 * deltaTm;

    // QI
    const QI = alpha * Alat * deltaTm;

    // coeficient evaporare
    const cEvap = 0.0229 + 0.0174 * values.w;

    const pv = values.phi * values.pvs;

    // QII
    const QII = AB * cEvap * (((values.pvs - pv) * 760) / values.pB) * values.r;

    // Qp
    const Qp = QI + QII;

    // Qtot
    const Qtot = Qmat + Qap + Qsol + Qp;

    // consum abur
    const Dab = Qtot / values.r; // kg/s
    const Dsa = (Dab * 3600) / Mmat; // kg abur / kg material

    // dimensionare sistem încălzire
    const K =
      1 /
      (1 / values.alpha1 + values.deltaP / values.lambdaP + 1 / values.alpha2);

    const Anec = Qtot / (K * deltaTm);

    const dMed = (values.di + values.dext) / 2;

    const nElemente = Anec / (Math.PI * dMed * values.lungimeElement);

    return {
      deltaT,
      Mmat,
      Qmat,
      Msol,
      cpSol,
      Qsol,
      Map,
      Qap,
      AB,
      Alat,
      deltaTm,
      alpha,
      cEvap,
      pv,
      QI,
      QII,
      Qp,
      Qtot,
      Dab,
      Dsa,
      K,
      Anec,
      dMed,
      nElemente,
    };
  }, [
    g,
    LIncarcare,
    Hm,
    Lcada,
    linf,
    lsup,
    H,
    cpMat,
    ti,
    tf,
    timp,
    cpApa,
    x,
    Vap,
    rhoOtel,
    tAbur,
    w,
    phi,
    pB,
    pvs,
    r,
    alpha1,
    alpha2,
    deltaP,
    lambdaP,
    di,
    dext,
    lungimeElement,
  ]);

  const f = (v) => Number(v).toFixed(4);

  return (
    <div className='page-wrapper'>
      <div className='card page-card'>
        <h1>Bilanț termic</h1>

        <div className='formula-box'>
          <strong>Qtot = Qmat + Qap + Qsol + Qp</strong>
          <br />
          <strong>Qp = QI + QII</strong>
          <br />
          <strong>Dab = Qtot / r</strong>
        </div>

        <h3>Date preluate automat</h3>

        <label>g [g/m]</label>
        <input value={g} onChange={(e) => setG(e.target.value)} />

        <label>L încărcare material [m]</label>
        <input
          value={LIncarcare}
          onChange={(e) => setLIncarcare(e.target.value)}
        />

        <label>Hm</label>
        <input value={Hm} onChange={(e) => setHm(e.target.value)} />

        <label>Lcadă [m]</label>
        <input value={Lcada} onChange={(e) => setLcada(e.target.value)} />

        <label>linf [m]</label>
        <input value={linf} onChange={(e) => setLinf(e.target.value)} />

        <label>lsup [m]</label>
        <input value={lsup} onChange={(e) => setLsup(e.target.value)} />

        <label>H final [m]</label>
        <input value={H} onChange={(e) => setH(e.target.value)} />

        <h3>Date termice</h3>

        <label>cp material [J/(kg·K)]</label>
        <input value={cpMat} onChange={(e) => setCpMat(e.target.value)} />

        <label>ti [°C]</label>
        <input value={ti} onChange={(e) => setTi(e.target.value)} />

        <label>tf [°C]</label>
        <input value={tf} onChange={(e) => setTf(e.target.value)} />

        <label>Timp încălzire [s]</label>
        <input value={timp} onChange={(e) => setTimp(e.target.value)} />

        <label>cp apă [J/(kg·K)]</label>
        <input value={cpApa} onChange={(e) => setCpApa(e.target.value)} />

        <label>x [%]</label>
        <input value={x} onChange={(e) => setX(e.target.value)} />

        <h3>Date pentru cadă</h3>

        <label>Vap - volumul de oțel al căzii [m³]</label>
        <input value={Vap} onChange={(e) => setVap(e.target.value)} />

        <label>ρ oțel [kg/m³]</label>
        <input value={rhoOtel} onChange={(e) => setRhoOtel(e.target.value)} />

        <h3>Pierderi și abur</h3>

        <label>Temperatura aburului [°C]</label>
        <input value={tAbur} onChange={(e) => setTAbur(e.target.value)} />

        <label>w [m/s]</label>
        <input value={w} onChange={(e) => setW(e.target.value)} />

        <label>φ</label>
        <input value={phi} onChange={(e) => setPhi(e.target.value)} />

        <label>pB [mmHg]</label>
        <input value={pB} onChange={(e) => setPB(e.target.value)} />

        <label>pvs [mmHg]</label>
        <input value={pvs} onChange={(e) => setPvs(e.target.value)} />

        <label>r [J/kg]</label>
        <input value={r} onChange={(e) => setR(e.target.value)} />

        <h3>Dimensionarea sistemului de încălzire</h3>

        <label>α1 [W/(m²·K)]</label>
        <input value={alpha1} onChange={(e) => setAlpha1(e.target.value)} />

        <label>α2 [W/(m²·K)]</label>
        <input value={alpha2} onChange={(e) => setAlpha2(e.target.value)} />

        <label>δp [m]</label>
        <input value={deltaP} onChange={(e) => setDeltaP(e.target.value)} />

        <label>λp [W/(m·K)]</label>
        <input value={lambdaP} onChange={(e) => setLambdaP(e.target.value)} />

        <label>di [m]</label>
        <input value={di} onChange={(e) => setDi(e.target.value)} />

        <label>dext [m]</label>
        <input value={dext} onChange={(e) => setDext(e.target.value)} />

        <label>l element [m]</label>
        <input
          value={lungimeElement}
          onChange={(e) => setLungimeElement(e.target.value)}
        />

        {!rezultate && (
          <div className='results-box'>
            <p>Introdu toate valorile necesare.</p>
          </div>
        )}

        {rezultate?.error && (
          <div className='results-box'>
            <p className='error-text'>{rezultate.error}</p>
          </div>
        )}

        {rezultate && !rezultate.error && (
          <div className='results-box'>
            <p>
              <strong>Δt =</strong> {f(rezultate.deltaT)} K
            </p>
            <p>
              <strong>Mmat =</strong> {f(rezultate.Mmat)} kg
            </p>
            <p>
              <strong>Qmat =</strong> {f(rezultate.Qmat)} W
            </p>
            <p>
              <strong>Msol =</strong> {f(rezultate.Msol)} kg
            </p>
            <p>
              <strong>cp sol =</strong> {f(rezultate.cpSol)} J/(kg·K)
            </p>
            <p>
              <strong>Qsol =</strong> {f(rezultate.Qsol)} W
            </p>
            <p>
              <strong>Map =</strong> {f(rezultate.Map)} kg
            </p>
            <p>
              <strong>Qap =</strong> {f(rezultate.Qap)} W
            </p>
            <p>
              <strong>AB =</strong> {f(rezultate.AB)} m²
            </p>
            <p>
              <strong>A laterală =</strong> {f(rezultate.Alat)} m²
            </p>
            <p>
              <strong>Δtm =</strong> {f(rezultate.deltaTm)} K
            </p>
            <p>
              <strong>α =</strong> {f(rezultate.alpha)} W/(m²·K)
            </p>
            <p>
              <strong>QI =</strong> {f(rezultate.QI)} W
            </p>
            <p>
              <strong>QII =</strong> {f(rezultate.QII)} W
            </p>
            <p>
              <strong>Qp =</strong> {f(rezultate.Qp)} W
            </p>
            <p>
              <strong>Qtot =</strong> {f(rezultate.Qtot)} W
            </p>
            <p>
              <strong>Dab =</strong> {f(rezultate.Dab)} kg/s
            </p>
            <p>
              <strong>Dsa =</strong> {f(rezultate.Dsa)} kg abur/kg material
            </p>
            <p>
              <strong>K =</strong> {f(rezultate.K)} W/(m²·K)
            </p>
            <p>
              <strong>A necesar =</strong> {f(rezultate.Anec)} m²
            </p>
            <p>
              <strong>d mediu =</strong> {f(rezultate.dMed)} m
            </p>
            <p>
              <strong>n elemente =</strong> {Math.ceil(rezultate.nElemente)}
            </p>
          </div>
        )}

        <p className='saved-text'>
          Am făcut varianta simplificată pentru partea de dimensionare: α1 și α2
          se introduc manual, iar restul se calculează automat.
        </p>
      </div>
    </div>
  );
}
