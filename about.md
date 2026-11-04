---
layout: default
title: Research Map
permalink: /about/
---
<section class="simple-page">
  <p class="eyebrow">RESEARCH MAP</p>
  <h1>Paper Graph</h1>
  <p style="color:var(--text-2);margin-bottom:2rem;font-size:.95rem;">태그가 겹치는 논문끼리 자동으로 연결됩니다. 노드를 클릭하면 논문으로 이동해요.</p>
</section>

<div id="graph-container" style="width:100%;height:620px;border:1px solid var(--border);border-radius:16px;overflow:hidden;background:var(--bg);margin-bottom:3rem;"></div>

<script id="postData" type="application/json">
[
  {% for post in site.posts %}
  {
    "id": {{ post.url | jsonify }},
    "title": {{ post.title | jsonify }},
    "url": {{ post.url | relative_url | jsonify }},
    "tags": {{ post.tags | jsonify }}
  }{% unless forloop.last %},{% endunless %}
  {% endfor %}
]
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.9.0/d3.min.js"></script>
<script>
(function () {
  const posts = JSON.parse(document.getElementById('postData').textContent);
  const container = document.getElementById('graph-container');
  const W = container.clientWidth;
  const H = container.clientHeight;

  // 태그 겹침으로 엣지 생성
  const edges = [];
  for (let i = 0; i < posts.length; i++) {
    for (let j = i + 1; j < posts.length; j++) {
      const shared = posts[i].tags.filter(t => posts[j].tags.includes(t));
      if (shared.length > 0) {
        edges.push({ source: posts[i].id, target: posts[j].id, weight: shared.length, tags: shared });
      }
    }
  }

  // 태그별 색상
  const tagColors = {
    'Diffusion': '#6366f1',
    'Memorization': '#f59e0b',
    'TrustworthyAI': '#10b981',
    'RL': '#ef4444',
    'Theory': '#8b5cf6',
    'PreferenceOptimization': '#ec4899',
    'Distillation': '#14b8a6',
  };
  function nodeColor(tags) {
    for (const t of tags) if (tagColors[t]) return tagColors[t];
    return '#94a3b8';
  }

  const svg = d3.select('#graph-container').append('svg')
    .attr('width', W).attr('height', H);

  // 배경 클릭 시 선택 해제
  svg.append('rect').attr('width', W).attr('height', H).attr('fill', 'transparent')
    .on('click', () => { tooltip.style('opacity', 0); });

  const sim = d3.forceSimulation(posts)
    .force('link', d3.forceLink(edges).id(d => d.id).distance(d => 160 - d.weight * 20).strength(0.4))
    .force('charge', d3.forceManyBody().strength(-220))
    .force('center', d3.forceCenter(W / 2, H / 2))
    .force('collision', d3.forceCollide(48));

  const link = svg.append('g').selectAll('line').data(edges).join('line')
    .attr('stroke', '#cbd5e1').attr('stroke-width', d => d.weight + 0.5).attr('stroke-opacity', 0.5);

  const node = svg.append('g').selectAll('g').data(posts).join('g')
    .attr('cursor', 'pointer')
    .call(d3.drag()
      .on('start', (e, d) => { if (!e.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
      .on('drag',  (e, d) => { d.fx = e.x; d.fy = e.y; })
      .on('end',   (e, d) => { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null; }))
    .on('click', (e, d) => { e.stopPropagation(); window.location.href = d.url; });

  node.append('circle')
    .attr('r', 28)
    .attr('fill', d => nodeColor(d.tags))
    .attr('fill-opacity', 0.15)
    .attr('stroke', d => nodeColor(d.tags))
    .attr('stroke-width', 1.5);

  node.append('text')
    .attr('text-anchor', 'middle').attr('dy', '0.35em')
    .attr('font-size', '10px').attr('font-weight', '600')
    .attr('fill', d => nodeColor(d.tags))
    .attr('pointer-events', 'none')
    .text(d => {
      const words = d.title.split(' ');
      return words.slice(0, 3).join(' ') + (words.length > 3 ? '…' : '');
    });

  // 툴팁
  const tooltip = d3.select('#graph-container').append('div')
    .style('position', 'absolute').style('opacity', 0)
    .style('background', 'var(--bg)').style('border', '1px solid var(--border)')
    .style('border-radius', '10px').style('padding', '10px 14px')
    .style('font-size', '12px').style('max-width', '220px')
    .style('pointer-events', 'none').style('line-height', '1.5')
    .style('box-shadow', '0 4px 16px rgba(0,0,0,0.1)');

  node.on('mouseenter', (e, d) => {
    tooltip.style('opacity', 1)
      .html(`<strong style="font-size:13px">${d.title}</strong><br><span style="color:#6366f1">${d.tags.join(' · ')}</span>`)
      .style('left', (e.offsetX + 16) + 'px')
      .style('top',  (e.offsetY - 10) + 'px');
  }).on('mouseleave', () => tooltip.style('opacity', 0));

  sim.on('tick', () => {
    link.attr('x1', d => d.source.x).attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x).attr('y2', d => d.target.y);
    node.attr('transform', d => `translate(${
      Math.max(32, Math.min(W - 32, d.x))},${Math.max(32, Math.min(H - 32, d.y))})`);
  });

  // 범례
  const legendTags = [...new Set(posts.flatMap(p => p.tags))].filter(t => tagColors[t]);
  const legend = svg.append('g').attr('transform', 'translate(16,16)');
  legendTags.forEach((t, i) => {
    const g = legend.append('g').attr('transform', `translate(0,${i * 22})`);
    g.append('circle').attr('r', 6).attr('fill', tagColors[t]).attr('fill-opacity', 0.3)
      .attr('stroke', tagColors[t]).attr('stroke-width', 1.5).attr('cx', 6).attr('cy', 0);
    g.append('text').attr('x', 16).attr('dy', '0.35em')
      .attr('font-size', '11px').attr('fill', '#64748b').text(t);
  });
})();
</script>
