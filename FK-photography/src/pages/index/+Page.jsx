import { useEffect, useState } from "react";
import { navigationQuery } from "../../lib/queries/navigation";
import { sanity } from "../../lib/sanity/client";

function Page() {
  const [navItems, setNavItems] = useState([]);

  useEffect(() => {
    sanity.fetch(navigationQuery).then((data) => {
      console.log("Navigation items:", data);
      setNavItems(data);
    });
  }, []);

  return (
    <header>
      <h1>My Site</h1>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item._id}>
              <a href={item.href}>{item.title}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Page;
