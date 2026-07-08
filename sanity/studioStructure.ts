import type { StructureResolver } from "sanity/structure";

// Singleton documents:
// - Site Settings
// - Homepage
// - Founder
//
// Collection documents:
// - Properties
// - Cities
// - Journal Posts

export const structure: StructureResolver = (S) =>
  S.list()
    .title("LIVORAA Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
        ),

      S.listItem()
        .title("Homepage")
        .child(
          S.document()
            .schemaType("homepage")
            .documentId("homepage")
        ),

      S.listItem()
        .title("Founder")
        .child(
          S.document()
            .schemaType("founder")
            .documentId("founder")
        ),

      S.divider(),

      S.documentTypeListItem("property").title("Properties"),
      S.documentTypeListItem("city").title("Cities"),
      S.documentTypeListItem("journalPost").title("Journal Posts"),
    ]);