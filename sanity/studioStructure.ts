import type { StructureResolver } from "sanity/structure";

// Presents `siteSettings` and `founder` as singleton documents (a single
// editable item, not a list you can create many of), while properties,
// cities and journal posts remain normal document lists.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("LIVORAA Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
      S.listItem()
        .title("Founder")
        .child(S.document().schemaType("founder").documentId("founder")),
      S.divider(),
      S.documentTypeListItem("property").title("Properties"),
      S.documentTypeListItem("city").title("Cities"),
      S.documentTypeListItem("journalPost").title("Journal Posts"),
    ]);
