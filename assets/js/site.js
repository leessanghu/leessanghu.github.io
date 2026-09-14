document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('#sidebar');
  const menu = document.querySelector('#menuButton');
  menu?.addEventListener('click', () => { const open = sidebar.classList.toggle('open'); menu.setAttribute('aria-expanded', open); });

  const rows = [...document.querySelectorAll('.post-row')];
  const params = new URLSearchParams(location.search);
  const topic = params.get('topic');
  if (topic && rows.length) {
    let count = 0;
    rows.forEach(row => { const show = row.dataset.tags.toLowerCase().includes(topic.toLowerCase()); row.hidden = !show; if (show) count++; });
    const title = document.querySelector('#archiveTitle'); if (title) title.textContent = topic;
    const visible = document.querySelector('#visibleCount'); if (visible) visible.textContent = `${count} papers`;
    const empty = document.querySelector('#emptyState'); if (empty) empty.hidden = count > 0;
  }

  const overlay = document.querySelector('#searchOverlay');
  const input = document.querySelector('#searchInput');
  const results = document.querySelector('#searchResults');
  const dataNode = document.querySelector('#searchData');
  let papers = []; try { papers = JSON.parse(dataNode?.textContent || '[]'); } catch (_) {}
  const openSearch = () => { overlay.hidden = false; document.body.classList.add('no-scroll'); setTimeout(() => input.focus(), 30); render(''); };
  const closeSearch = () => { overlay.hidden = true; document.body.classList.remove('no-scroll'); };
  const render = query => {
    const q = query.trim().toLowerCase(); const filtered = papers.filter(p => !q || `${p.title} ${p.tags} ${p.excerpt}`.toLowerCase().includes(q));
    results.innerHTML = filtered.length ? filtered.map(p => `<a href="${p.url}"><strong>${p.title}</strong><small>${p.tags}</small></a>`).join('') : '<p>검색 결과가 없어요.</p>';
  };
  document.querySelector('#searchButton')?.addEventListener('click', openSearch);
  document.querySelector('#closeSearch')?.addEventListener('click', closeSearch);
  overlay?.addEventListener('click', e => { if (e.target === overlay) closeSearch(); });
  input?.addEventListener('input', e => render(e.target.value));
  document.addEventListener('keydown', e => { if (e.key === '/' && overlay?.hidden) { e.preventDefault(); openSearch(); } if (e.key === 'Escape' && !overlay?.hidden) closeSearch(); });

  const content = document.querySelector('#paperContent'); const toc = document.querySelector('#tocNav');
  if (content && toc) {
    content.querySelectorAll('h2').forEach((heading, index) => { heading.id ||= `section-${index + 1}`; const a = document.createElement('a'); a.href = `#${heading.id}`; a.textContent = heading.textContent; toc.appendChild(a); });
  }
});

