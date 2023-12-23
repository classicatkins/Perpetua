import html from "html-literal";
import favicon from "../assets/img/favicon.svg";

export default links => html`
  <nav>
    <ul>
    <img src="${favicon}" alt="Favicon" class="favicon">
    <li><a href="/Home" title="Home" data-navigo>Perpetua</a></li>
    </ul>
    <i class="fas fa-bars"></i>
    <ul class="hidden--mobile nav-links">
      ${links
        .map(link => {
          if (link.title === "Settings") {
            // If link.title is "Settings", replace with the gear icon
            return `<li><a href="/${link.title}" title="${link.title}" data-navigo><i class="fa-solid fa-gear"></i></a></li>`;
          } else {
            // For other link titles, use the default behavior
            return `<li><a href="/${link.title}" title="${link.title}" data-navigo>${link.text}</a></li>`;
          }
        })
        .join("")}
    </ul>
  </nav>
`;

