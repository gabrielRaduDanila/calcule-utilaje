import { useEffect, useMemo, useState } from 'react';

export default function InaltimeCadaPage() {
  const [g, setG] = useState(localStorage.getItem('inaltime_g') || '');
  const [d, setD] = useState(localStorage.getItem('inaltime_d') || '');
  const [Lcada, setLcada] = useState(localStorage.getItem('Lcada') || '');
  const [linf, setLinf] = useState(localStorage.getItem('linf') || '');
  const [lsup, setLsup] = useState(localStorage.getItem('lsup') || '');

  const [Hm, setHm] = useState(localStorage.getItem('inaltime_Hm') || '');
  const [LIncarcare, setLIncarcare] = useState(
    localStorage.getItem('inaltime_LIncarcare') || '',
  );
  const [Lrola, setLrola] = useState(
    localStorage.getItem('inaltime_Lrola') || '',
  );
  const [n, setN] = useState(localStorage.getItem('inaltime_n') || '');

  const rezultate = useMemo(() => {
    const gNum = Number(g);
    const dNum = Number(d);
    const LcadaNum = Number(Lcada);
    const linfNum = Number(linf);
    const lsupNum = Number(lsup);

    const HmNum = Number(Hm);
    const LIncarcareNum = Number(LIncarcare);
    const LrolaNum = Number(Lrola);
    const nNum = Number(n);

    const areValori =
      g && d && Lcada && linf && lsup && Hm && LIncarcare && Lrola && n;

    if (!areValori) return null;

    if (
      [
        gNum,
        dNum,
        LcadaNum,
        linfNum,
        lsupNum,
        HmNum,
        LIncarcareNum,
        LrolaNum,
        nNum,
      ].some((v) => Number.isNaN(v) || v <= 0)
    ) {
      return { error: 'Toate valorile trebuie să fie pozitive.' };
    }

    const Mmat_kg = (LIncarcareNum * gNum) / 1000;
    const Vsol_m3 = (HmNum * Mmat_kg) / 1000;
    const Vrole_m3 = nNum * ((Math.PI * dNum ** 2) / 4) * LrolaNum;
    const Vtrpir_m3 = Vsol_m3 + Vrole_m3;

    const AB = lsupNum * LcadaNum;
    const Ab = linfNum * LcadaNum;

    const numitor = AB + Ab + Math.sqrt(AB * Ab);

    if (numitor <= 0) {
      return { error: 'Eroare la calcul (numitor invalid).' };
    }

    const H = (3 * Vtrpir_m3) / numitor;
    const H_final = H * 1.1;

    return {
      Mmat_kg,
      Vsol_m3,
      Vrole_m3,
      Vtrpir_m3,
      AB,
      Ab,
      H,
      H_final,
    };
  }, [g, d, Lcada, linf, lsup, Hm, LIncarcare, Lrola, n]);

  const f = (v) => Number(v).toFixed(4);

  useEffect(() => {
    if (rezultate && !rezultate.error) {
      localStorage.setItem('Hcada_calculat', rezultate.H.toFixed(4));
      localStorage.setItem('Hcada_final', rezultate.H_final.toFixed(4));
    }
  }, [rezultate]);

  const saveManualValues = (key, value, setter) => {
    setter(value);
    localStorage.setItem(key, value);
  };

  return (
    <div className='page-wrapper'>
      <div className='card page-card'>
        <h1>Înălțimea căzii</h1>

        <div className='formula-box'>H = 3·Vtr.pir. / (AB + Ab + √(AB·Ab))</div>

        <h3>Dimensiuni preluate automat</h3>

        <label>Lcadă [m]</label>
        <input
          value={Lcada}
          onChange={(e) => saveManualValues('Lcada', e.target.value, setLcada)}
        />

        <label>linf [m]</label>
        <input
          value={linf}
          onChange={(e) => saveManualValues('linf', e.target.value, setLinf)}
        />

        <label>lsup [m]</label>
        <input
          value={lsup}
          onChange={(e) => saveManualValues('lsup', e.target.value, setLsup)}
        />

        <p className='saved-text'>
          Aceste valori sunt preluate automat din paginile „Lungime cadă” și
          „Lățime cadă”, dar pot fi și modificate manual aici.
        </p>

        <h3>Parametri material</h3>

        <label>g [g/m]</label>
        <input
          value={g}
          onChange={(e) => saveManualValues('inaltime_g', e.target.value, setG)}
        />

        <label>L încărcare material [m]</label>
        <input
          value={LIncarcare}
          onChange={(e) =>
            saveManualValues(
              'inaltime_LIncarcare',
              e.target.value,
              setLIncarcare,
            )
          }
        />

        <label>Hidromodul Hm</label>
        <input
          value={Hm}
          onChange={(e) =>
            saveManualValues('inaltime_Hm', e.target.value, setHm)
          }
        />

        <h3>Parametri role</h3>

        <label>d [m]</label>
        <input
          value={d}
          onChange={(e) => saveManualValues('inaltime_d', e.target.value, setD)}
        />

        <label>Lrolă [m]</label>
        <input
          value={Lrola}
          onChange={(e) =>
            saveManualValues('inaltime_Lrola', e.target.value, setLrola)
          }
        />

        <label>n (număr role)</label>
        <input
          value={n}
          onChange={(e) => saveManualValues('inaltime_n', e.target.value, setN)}
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
              <strong>Mmat:</strong> {f(rezultate.Mmat_kg)} kg
            </p>
            <p>
              <strong>Vsol:</strong> {f(rezultate.Vsol_m3)} m³
            </p>
            <p>
              <strong>Vrole:</strong> {f(rezultate.Vrole_m3)} m³
            </p>
            <p>
              <strong>V tr.pir.:</strong> {f(rezultate.Vtrpir_m3)} m³
            </p>
            <p>
              <strong>AB:</strong> {f(rezultate.AB)} m²
            </p>
            <p>
              <strong>Ab:</strong> {f(rezultate.Ab)} m²
            </p>
            <p>
              <strong>H:</strong> {f(rezultate.H)} m
            </p>
            <p>
              <strong>H final (+10%):</strong> {f(rezultate.H_final)} m
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
