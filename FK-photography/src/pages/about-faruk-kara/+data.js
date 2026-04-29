import { sanity } from "@/lib/sanity/client.js";

const ABOUT_PAGE_QUERY = `*[_type == "aboutPage"][0] {
  title,
  intro,
  bio,
  locationLine,
  invitationIntro,
  seo,
  portrait{
    ...,
    asset->{
      _id,
      url,
      metadata{ lqip, dimensions{ aspectRatio, width, height } }
    }
  },
  "contexts": contexts[] {
    _key,
    title,
    label,
    description,
    image{
      ...,
      asset->{
        _id,
        url,
        metadata{ lqip, dimensions{ aspectRatio, width, height } }
      }
    }
  }
}`;

export async function data() {
  const page = await sanity.fetch(ABOUT_PAGE_QUERY);

  return {
    page: page ?? {
      title: "About Faruk",
      intro:
        "Faruk Kara is a Cambridge-based photographer drawn to atmosphere, movement, and the quiet charge of real moments.",
      bio: [],
      locationLine: "Based in Cambridge, available worldwide.",
      invitationIntro:
        "Faruk is often invited into spaces where the work is already alive: rehearsal rooms, small stages, theatre productions, band performances, and community stories.",
      contexts: [
        {
          title: "Theatre productions",
          label: "Stage",
          description:
            "Quiet coverage of rehearsals, dress runs, and performances without disturbing the room.",
        },
        {
          title: "Band performances",
          label: "Live music",
          description:
            "Images that hold the energy of a set: gesture, crowd, light, and the seconds between songs.",
        },
        {
          title: "Stories with access",
          label: "Documentary",
          description:
            "Work made by being invited in, listening first, and photographing with care.",
        },
      ],
    },
  };
}
