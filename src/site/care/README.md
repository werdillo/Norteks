# care

The fabric care advice page, with its pictures. Static: the advice is in `data.ts`, the markup in `CleaningPage.astro`.

The page, top to bottom: the introduction (H1 and paragraphs), three pictures in a row, the care tips as cards
(the forbidden methods as a warning note), the washing steps as cards, the important information as a note, and a
call to action to the contacts.

`CareCard.astro` draws one card: an icon in a circle, a title and a list. `warning` draws it as a beige note with
the gold rule. Icons are Tabler classes (`i-tabler-…`) named in `data.ts`.

Door (`index.ts`): `CleaningPage`, `headerNav`, `mobileNav`.
