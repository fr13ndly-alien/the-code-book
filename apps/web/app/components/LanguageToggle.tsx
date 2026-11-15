import { Link, useLocation } from "react-router";
import { LOCALE_STORAGE_KEY, LOCALES, UI, localeOf, localePath, type Locale } from "~/i18n";
import styles from "./LanguageToggle.module.css";

const NAMES: Record<Locale, { short: string; long: string }> = {
  en: { short: "EN", long: "English" },
  vi: { short: "VI", long: "Tiếng Việt" },
};

function remember(locale: Locale) {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Storage can be blocked. The choice then lasts only as long as the address.
  }
}

/**
 * Switches between English and Vietnamese. It links to the same page in the
 * other language; the route stays mounted, so the simulator keeps its state.
 */
export function LanguageToggle() {
  const { pathname, hash } = useLocation();
  const current = localeOf(pathname);

  return (
    <nav className={styles.toggle} aria-label={UI.language[current]}>
      {LOCALES.map((locale) => (
        <Link
          key={locale}
          to={localePath(pathname, locale) + hash}
          lang={locale}
          hrefLang={locale}
          aria-current={locale === current ? "true" : undefined}
          aria-label={NAMES[locale].long}
          title={NAMES[locale].long}
          replace
          preventScrollReset
          onClick={() => remember(locale)}
        >
          {NAMES[locale].short}
        </Link>
      ))}
    </nav>
  );
}
