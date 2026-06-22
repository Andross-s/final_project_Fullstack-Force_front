import Link from 'next/link';
import Image from 'next/image';
import css from './Header.module.css';

type MobileMenuProps = {
  isAuthenticated: boolean;
  user: {
    name: string;
  };
  onClose: () => void;
  onLogoutClick: () => void;
};

export default function MobileMenu({
  isAuthenticated,
  user,
  onClose,
  onLogoutClick,
}: MobileMenuProps) {
  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.mobileMenu} onClick={e => e.stopPropagation()}>
        <div className={css.logoWrapper}>
          <Link href="/" className={css.logo}>
            <Image src="/icons/logo-header.svg" alt="Tasteorama" width={165} height={46} />
          </Link>
          <button type="button" className={css.closeBtn} onClick={onClose} aria-label="Close menu">
            <Image src="/icons/close.svg" alt="Close menu" width={32} height={32} />
          </button>
        </div>

        <nav className={css.nav}>
          <Link href="/recipes" onClick={onClose}>
            Recipes
          </Link>

          {isAuthenticated && (
            <Link href="/profile/own" onClick={onClose}>
              My Profile
            </Link>
          )}

          {!isAuthenticated && (
            <>
              <Link href="/auth/login" onClick={onClose}>
                Log in
              </Link>

              <Link href="/auth/register" className={css.registerLink} onClick={onClose}>
                Register
              </Link>
            </>
          )}
        </nav>
        {isAuthenticated && (
          <>
            <div className={css.userSection}>
              <div className={css.userBlock}>
                <div className={css.avatar}>{user.name[0]}</div>

                <span className={css.userName}>{user.name}</span>
              </div>

              <span className={css.divider}></span>

              <button className={css.logoutBtn} onClick={onLogoutClick} type="button">
                <Image src="/icons/logaut_icon.svg" alt="Logaout" width={24} height={24} />
              </button>
            </div>
            <Link href="/add-recipe" className={css.addRecipeBtn} onClick={onClose}>
              Add Recipe
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
