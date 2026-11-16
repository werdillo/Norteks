# contacts

The company's contact details and the map. The phone numbers and e-mail addresses are in `data.ts`, with the
address, its postal code, the metro station, the route link and the map's coordinates; the header and the footer
read the address, phones and e-mails through this door.

`page` in `data.ts` holds the copy of the contacts page. The messenger and social links are not in this box: the
page (`src/pages/contacts.astro`) reads them from `app/frame/social.ts` and passes them to `ContactsPage` as `socials`.

Door (`index.ts`): `ContactsPage`, `address`, `phones`, `emails`, `headerNav`. The address and the contacts
are also what the footer and the schema read; `ContactsPage` is the page's screen.
