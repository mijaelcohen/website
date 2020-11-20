import Link from 'next/link'
import { t } from '../polyglot-modules/polyglot.js'

const primaryLinks = [0, 1, 2, 3, 4, 5, 6,7]
const secondaryLinks = [0, 1, 2]

const MobileMenu = (props) => (
  <nav className='main-menu' role='navigation'>
    <header>
      <a className='logo' href='/'></a>
      <a className='close-menu' onClick={props.handleMainMenu}></a>
    </header>
    <ul className='primary-links'>
      {primaryLinks.map((i)=> {
        return (
          <li key={i}>
            <a className={`menu-link ${window.location.hash != t(`nav.primaryLinks.${i}.href`) ? '' : 'active'}`} onClick={props.handleLink(t(`nav.primaryLinks.${i}.href`))} >  
              {t(`nav.primaryLinks.${i}.title`)}
            </a>
          </li>
        )
      })}
    </ul>
    <ul className='secondary-links'>
      {secondaryLinks.map((i)=> {
        return (
          <Link href={t(`nav.secondaryLinks.${i}.href`)} key={i} >
            <li>
              <a className={`menu-link ${window.location.pathname != t(`nav.secondaryLinks.${i}.href`) ? '' : 'active'}`} onClick={props.handleMainMenu}>  
                {t(`nav.secondaryLinks.${i}.title`)}
              </a>
            </li>
          </Link>
        )
      })}
    </ul>
    <style>{`
      .main-menu {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 99;
        padding: 24px;
        display: flex;
        flex-direction: column;
        width: 100vw;
        height: 100vh;
        background-color: var(--white);
        overflow-y: auto;
      }

      header {
        display: flex;
        justify-content: space-between;
        flex: none;
      }

      .logo {
        margin: 6px 8px 8px 0;
        width: 135px;
        height: 35px;
        background-image: url('/static/assets/logo-mobile.svg');
        background-size: contain;
        background-repeat: no-repeat;
        flex: none;
      }

      .close-menu {
        display: inline-block;
        width: 20px;
        height: 20px;
        flex: none;
        background-image: url('/static/assets/close-menu.svg');
        background-size: contain;
        background-repeat: no-repeat;
        cursor: pointer;
      }

      .primary-links, .secondary-links {
        display: inline-block;
        margin: 24px 0 0 4em;
        width: fit-content;
        padding-top: 24px;
        border-top: solid 2px var(--dark-accent);
      }

      .primary-links li, .secondary-links li {
        padding: 8px 0;
      }

      .menu-link {
        margin: 16px 0;
        color: var(--dark-gray);
        font-family: var(--regular);
        font-size: 2.4rem;
        text-transform: uppercase;
      }

      .active, .menu-link:hover {
        color: var(--dark-accent);
      }
    `}</style>
  </nav>
)

export default MobileMenu