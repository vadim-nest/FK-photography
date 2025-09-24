import { useData } from "vike-react/useData";
import { PortableBody } from "@/components/PortableBody";

function Page() {
  const { homepage } = useData();

  return (
    <header>
      <h1>Homepage</h1>
      <PortableBody value={homepage.content} />
    </header>
  );
}

export default Page;
