import { usePageContext } from "vike-react/usePageContext";

export default function Page() {
  const { abortStatusCode, abortReason, is404 } = usePageContext();
  
  const code = abortStatusCode ?? (is404 ? 404 : 500);

  let title = "Something went wrong";
  if (is404) title = "Page not found";
  if (abortStatusCode === 403) title = "Forbidden";
  if (abortStatusCode === 401) title = "Unauthorised";
  
  return (
    <main className="p-16 text-center">
      <h1>{code}</h1>
      <p>{typeof abortReason === "string" ? abortReason : title}</p>
    </main>
  );
}
