# site

The public site's matrix. Each box is a subject of the site; what the boxes have in common sits in
`shared/` below them.

| Box | What it is |
|---|---|
| `catalog/` | The fabric catalog: types, collections and the header search over them. |
| `furniture/` | The furniture fittings listing. |
| `care/` | The fabric care advice page. |
| `blog/` | The post list and a post page. |
| `company/` | The company profile and its advantages. |
| `contacts/` | The contact details the page, the header and the footer show. |
| `home/` | The landing page's own hero, introduction and closing copy. |

`shared/` holds the icons used by more than one box. The landing page is composed by `src/pages/index.astro`
from `home`, `company` and `catalog` through their doors.

The boxes are opaque at this level: a neighbour is reached through its door, and `shared/` is imported by
path. The pages in `src/pages/` compose the boxes for a route.
