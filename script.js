/* ============================================================
   PROJETOS
   Para adicionar um projeto novo, copie um objeto do array abaixo
   e ajuste os campos. Não precisa mexer em mais nada.

   status: "done" | "progress" | "planned"
   links.repo / links.demo: coloque a URL quando existir, ou deixe null
   ============================================================ */
const PROJECTS = [
  {
    title: "Análise de Recompra e Entregas — Olist",
    status: "progress",
    statusLabel: "Em desenvolvimento",
    description:
      "Estudo com o dataset público da Olist (e-commerce brasileiro), " +
      "investigando três perguntas de negócio: quais regiões e categorias " +
      "têm maior taxa de recompra, como o atraso na entrega afeta a nota " +
      "de avaliação, e como varia a performance entre estados e " +
      "vendedores. Banco modelado em Postgres/Supabase, exploração em " +
      "Python e SQL.",
    stack: ["SQL", "Python", "Postgres", "Supabase"],
    links: { repo: null, demo: null },
  },

  // Copie o bloco abaixo para adicionar o próximo projeto:
  // {
  //   title: "Nome do projeto",
  //   status: "planned",
  //   statusLabel: "Planejado",
  //   description: "Do que se trata o projeto e qual pergunta ele responde.",
  //   stack: ["SQL", "Python"],
  //   links: { repo: null, demo: null },
  // },
];

const STATUS_LABELS = { done: "Concluído", progress: "Em desenvolvimento", planned: "Planejado" };

function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

function renderProjectCard(project) {
  const card = el("article", "project");
  if (project.status === "planned") card.classList.add("project-placeholder");

  const head = el("div", "project-head");
  head.appendChild(el("h3", null, project.title));
  const status = el(
    "span",
    `status status-${project.status}`,
    `<span class="status-dot"></span>${project.statusLabel || STATUS_LABELS[project.status]}`
  );
  head.appendChild(status);
  card.appendChild(head);

  card.appendChild(el("p", "project-desc", project.description));

  if (project.stack && project.stack.length) {
    const stack = el("ul", "project-stack");
    project.stack.forEach((tech) => stack.appendChild(el("li", null, tech)));
    card.appendChild(stack);
  }

  const links = el("div", "project-links");
  const hasLinks = project.links && (project.links.repo || project.links.demo);
  if (hasLinks) {
    if (project.links.repo) {
      const a = el("a", null, "Repositório");
      a.href = project.links.repo;
      a.target = "_blank";
      a.rel = "noopener";
      links.appendChild(a);
    }
    if (project.links.demo) {
      const a = el("a", null, "Demo");
      a.href = project.links.demo;
      a.target = "_blank";
      a.rel = "noopener";
      links.appendChild(a);
    }
  } else {
    links.appendChild(el("span", "project-links-note", "Repositório e resultados em breve"));
  }
  card.appendChild(links);

  return card;
}

function uniqueTechs(projects) {
  const set = new Set();
  projects.forEach((p) => (p.stack || []).forEach((t) => set.add(t)));
  return Array.from(set).sort();
}

function init() {
  const listEl = document.getElementById("projects-list");
  const filtersEl = document.getElementById("filters");
  const countEl = document.getElementById("projects-count");
  if (!listEl) return;

  let activeFilter = "Todos";

  function renderCount(visibleCount) {
    const done = PROJECTS.filter((p) => p.status === "done").length;
    countEl.textContent = `${PROJECTS.length} no total · ${done} concluído${done === 1 ? "" : "s"}`;
    if (visibleCount !== undefined && activeFilter !== "Todos") {
      countEl.textContent += ` · ${visibleCount} com ${activeFilter}`;
    }
  }

  function renderList() {
    listEl.innerHTML = "";
    const filtered =
      activeFilter === "Todos"
        ? PROJECTS
        : PROJECTS.filter((p) => (p.stack || []).includes(activeFilter));

    if (filtered.length === 0) {
      listEl.appendChild(el("p", "projects-empty", "Nenhum projeto com essa tecnologia ainda."));
    } else {
      filtered.forEach((p) => listEl.appendChild(renderProjectCard(p)));
    }
    renderCount(filtered.length);
  }

  function renderFilters() {
    const techs = ["Todos", ...uniqueTechs(PROJECTS)];
    filtersEl.innerHTML = "";
    techs.forEach((tech) => {
      const btn = el("button", "filter-btn", tech);
      btn.type = "button";
      btn.setAttribute("aria-pressed", tech === activeFilter ? "true" : "false");
      if (tech === activeFilter) btn.classList.add("filter-btn-active");
      btn.addEventListener("click", () => {
        activeFilter = tech;
        filtersEl.querySelectorAll(".filter-btn").forEach((b) => {
          const isActive = b.textContent === activeFilter;
          b.classList.toggle("filter-btn-active", isActive);
          b.setAttribute("aria-pressed", isActive ? "true" : "false");
        });
        renderList();
      });
      filtersEl.appendChild(btn);
    });
  }

  // Só mostra os filtros se houver mais de uma tecnologia no total
  if (uniqueTechs(PROJECTS).length > 1) {
    renderFilters();
  } else {
    filtersEl.remove();
  }
  renderList();
}

document.addEventListener("DOMContentLoaded", init);
