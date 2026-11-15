import { useEffect } from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLocation,
  useNavigate,
} from "react-router";
import type { Route } from "./+types/root";
import { LOCALE_STORAGE_KEY, UI, localeOf, localePath } from "./i18n";
import "./app.css";

export function Layout({ children }: { children: React.ReactNode }) {
  const locale = localeOf(useLocation().pathname);
  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#15120f" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  // A reader who chose Vietnamese before gets it again on an English address.
  // Runs once, on the first page of a visit; after that the toggle decides.
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(LOCALE_STORAGE_KEY);
    } catch {
      return;
    }
    if (saved === "vi" && localeOf(pathname) === "en") navigate(localePath(pathname, "vi") + hash, { replace: true });
  }, []);

  return <Outlet />;
}

export function HydrateFallback() {
  return null;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const locale = localeOf(useLocation().pathname);
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <main className="message-page">
      <h1>{notFound ? UI.notFound[locale] : UI.somethingWrong[locale]}</h1>
      <p>{notFound ? UI.notFoundBody[locale] : UI.reload[locale]}</p>
      <a href={localePath("/", locale)}>{UI.backToMenu[locale]}</a>
    </main>
  );
}
