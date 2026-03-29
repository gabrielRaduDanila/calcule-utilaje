import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [openJigherDropdown, setOpenJigherDropdown] = useState(false);
  const [openFulardDropdown, setOpenFulardDropdown] = useState(false);

  const navbarRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setOpenJigherDropdown(false);
        setOpenFulardDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isJigherulActive =
    location.pathname === '/app/lungime-cada' ||
    location.pathname === '/app/latime-cada' ||
    location.pathname === '/app/inaltime-cada' ||
    location.pathname === '/app/bilant-termic';

  const isFulardulActive =
    location.pathname === '/app/fulard-lungime-cada' ||
    location.pathname === '/app/fulard-inaltime-cada' ||
    location.pathname === '/app/fulard-latime-cada' ||
    location.pathname === '/app/fulard-putere-motor';

  const toggleJigherDropdown = () => {
    setOpenJigherDropdown((prev) => !prev);
    setOpenFulardDropdown(false);
  };

  const toggleFulardDropdown = () => {
    setOpenFulardDropdown((prev) => !prev);
    setOpenJigherDropdown(false);
  };

  const closeAllDropdowns = () => {
    setOpenJigherDropdown(false);
    setOpenFulardDropdown(false);
  };

  const resetJigherValues = () => {
    const keysToRemove = [
      'lungime_lmat',
      'lungime_a',
      'lungime_b',
      'Lcada',

      'latime_d',
      'latime_p',
      'latime_c',
      'latime_D',
      'latime_p1',
      'latime_c1',
      'linf',
      'lsup',

      'inaltime_g',
      'inaltime_d',
      'inaltime_Hm',
      'inaltime_LIncarcare',
      'inaltime_Lrola',
      'inaltime_n',
      'Hcada_calculat',
      'Hcada_final',

      'bilant_cpMat',
      'bilant_ti',
      'bilant_tf',
      'bilant_timp',
      'bilant_cpApa',
      'bilant_x',
      'bilant_Vap',
      'bilant_rhoOtel',
      'bilant_tAbur',
      'bilant_w',
      'bilant_phi',
      'bilant_pB',
      'bilant_pvs',
      'bilant_r',
      'bilant_alpha1',
      'bilant_alpha2',
      'bilant_deltaP',
      'bilant_lambdaP',
      'bilant_di',
      'bilant_dext',
      'bilant_lungimeElement',
    ];

    keysToRemove.forEach((key) => localStorage.removeItem(key));
    window.location.reload();
  };

  const resetFulardValues = () => {
    const keysToRemove = [
      'fulard_lmat',
      'fulard_a_lungime',
      'fulard_b_lungime',
      'fulard_Lcada',

      'fulard_v',
      'fulard_tau',
      'fulard_a_inaltime',
      'fulard_d_inaltime',
      'fulard_Hcada',

      'fulard_d_latime',
      'fulard_c_latime',
      'fulard_linf',
      'fulard_lsup',

      'fulard_R',
      'fulard_phiTr',
      'fulard_muFr',
      'fulard_muSt',
      'fulard_p',
      'fulard_Lcil',
      'fulard_phiCorectie',
      'fulard_beta',
    ];

    keysToRemove.forEach((key) => localStorage.removeItem(key));
    window.location.reload();
  };

  return (
    <header className='navbar' ref={navbarRef}>
      <div className='navbar-brand'>Aplicație calcule</div>

      <nav className='navbar-links'>
        <NavLink
          to='/app'
          end
          onClick={closeAllDropdowns}
          className={({ isActive }) =>
            isActive ? 'nav-link active-link' : 'nav-link'
          }
        >
          Acasă
        </NavLink>

        <div className='nav-group'>
          <div className='nav-dropdown'>
            <button
              type='button'
              className={isJigherulActive ? 'nav-link active-link' : 'nav-link'}
              onClick={toggleJigherDropdown}
            >
              Jigherul ▾
            </button>

            {openJigherDropdown && (
              <div className='dropdown-menu'>
                <NavLink
                  to='/app/lungime-cada'
                  onClick={closeAllDropdowns}
                  className={({ isActive }) =>
                    isActive
                      ? 'dropdown-link active-dropdown-link'
                      : 'dropdown-link'
                  }
                >
                  Lungime cadă
                </NavLink>

                <NavLink
                  to='/app/latime-cada'
                  onClick={closeAllDropdowns}
                  className={({ isActive }) =>
                    isActive
                      ? 'dropdown-link active-dropdown-link'
                      : 'dropdown-link'
                  }
                >
                  Lățime cadă
                </NavLink>

                <NavLink
                  to='/app/inaltime-cada'
                  onClick={closeAllDropdowns}
                  className={({ isActive }) =>
                    isActive
                      ? 'dropdown-link active-dropdown-link'
                      : 'dropdown-link'
                  }
                >
                  Înălțime cadă
                </NavLink>

                <NavLink
                  to='/app/bilant-termic'
                  onClick={closeAllDropdowns}
                  className={({ isActive }) =>
                    isActive
                      ? 'dropdown-link active-dropdown-link'
                      : 'dropdown-link'
                  }
                >
                  Bilanț termic
                </NavLink>
              </div>
            )}
          </div>

          <button
            type='button'
            className='reset-section-btn'
            onClick={resetJigherValues}
          >
            Reset Jigher
          </button>
        </div>

        <div className='nav-group'>
          <div className='nav-dropdown'>
            <button
              type='button'
              className={isFulardulActive ? 'nav-link active-link' : 'nav-link'}
              onClick={toggleFulardDropdown}
            >
              Fulardul ▾
            </button>

            {openFulardDropdown && (
              <div className='dropdown-menu'>
                <NavLink
                  to='/app/fulard-lungime-cada'
                  onClick={closeAllDropdowns}
                  className={({ isActive }) =>
                    isActive
                      ? 'dropdown-link active-dropdown-link'
                      : 'dropdown-link'
                  }
                >
                  Lungime cadă
                </NavLink>

                <NavLink
                  to='/app/fulard-inaltime-cada'
                  onClick={closeAllDropdowns}
                  className={({ isActive }) =>
                    isActive
                      ? 'dropdown-link active-dropdown-link'
                      : 'dropdown-link'
                  }
                >
                  Înălțime cadă
                </NavLink>

                <NavLink
                  to='/app/fulard-latime-cada'
                  onClick={closeAllDropdowns}
                  className={({ isActive }) =>
                    isActive
                      ? 'dropdown-link active-dropdown-link'
                      : 'dropdown-link'
                  }
                >
                  Lățime cadă
                </NavLink>

                <NavLink
                  to='/app/fulard-putere-motor'
                  onClick={closeAllDropdowns}
                  className={({ isActive }) =>
                    isActive
                      ? 'dropdown-link active-dropdown-link'
                      : 'dropdown-link'
                  }
                >
                  Putere motor
                </NavLink>
              </div>
            )}
          </div>

          <button
            type='button'
            className='reset-section-btn'
            onClick={resetFulardValues}
          >
            Reset Fulard
          </button>
        </div>
      </nav>

      <button className='logout-btn' onClick={handleLogout}>
        Ieșire
      </button>
    </header>
  );
}
