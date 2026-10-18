const list = document.querySelector('#project-list');
const search = document.querySelector('#search');
const count = document.querySelector('#result-count');
const more = document.querySelector('#show-more');
const dialog = document.querySelector('#project-dialog');
let filter = 'All', expanded = false, lastTrigger;
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function render() {
  const term = search.value.trim().toLowerCase();
  const matching = projects.filter(p => (filter === 'All' ? p.category !== 'Learning' : p.category === filter) && `${p.name} ${p.focus} ${p.stack} ${p.context}`.toLowerCase().includes(term));
  const shown = expanded || term ? matching : matching.slice(0,8);
  count.textContent = `${matching.length} ${filter === 'Learning' ? (matching.length === 1 ? 'repository' : 'repositories') : (matching.length === 1 ? 'project' : 'projects')}`;
  list.innerHTML = shown.map(p => `<button class="project-row" data-project="${escapeHTML(p.id)}" aria-label="Explore ${escapeHTML(p.name)}"><span class="row-name">${escapeHTML(p.name)}</span><span class="row-focus">${escapeHTML(p.focus)}</span><span class="row-context">${escapeHTML(p.context)}</span><span class="row-arrow" aria-hidden="true">↗</span></button>`).join('');
  document.querySelector('#empty').hidden = matching.length !== 0;
  more.hidden = matching.length <= 8 || Boolean(term);
  more.innerHTML = expanded ? 'Show fewer projects <span aria-hidden="true">↑</span>' : `Show all ${matching.length} ${filter === 'Learning' ? 'repositories' : 'projects'} <span aria-hidden="true">↓</span>`;
}
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  filter = button.dataset.filter; expanded = false;
  document.querySelectorAll('[data-filter]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
  render();
}));
search.addEventListener('input', render);
more.addEventListener('click', () => {expanded = !expanded;render();if(!expanded) document.querySelector('#index').scrollIntoView({behavior:'smooth'});});
document.addEventListener('click', event => {
  const button = event.target.closest('[data-project]');
  if(!button) return;
  const project = projects.find(p => p.id === button.dataset.project);
  if(!project) return;
  lastTrigger = button;
  document.querySelector('#dialog-body').innerHTML = `<p class="dialog-category">${escapeHTML(project.context)}</p><h2 id="dialog-title">${escapeHTML(project.name)}</h2><p class="dialog-summary">${escapeHTML(project.summary)}</p><dl class="dialog-facts"><div><dt>FOCUS</dt><dd>${escapeHTML(project.focus)}</dd></div><div><dt>PROJECT TECHNOLOGIES</dt><dd>${escapeHTML(project.stack)}</dd></div></dl><p class="dialog-notes">${escapeHTML(project.notes)}</p><div class="dialog-links">${project.links.map(([label,url])=>`<a href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(label)} ↗</a>`).join('')}<a href="mailto:mpoelessy839@gmail.com?subject=${encodeURIComponent(`Let's talk about ${project.name}`)}">Discuss this project ↗</a></div>`;
  dialog.showModal();dialog.scrollTop=0;
});
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>lastTrigger?.focus({preventScroll:true}));
document.querySelector('#copy-email').addEventListener('click', async () => {
  const toast = document.querySelector('#toast');
  try{await navigator.clipboard.writeText('mpoelessy839@gmail.com');toast.textContent='Email address copied';}
  catch{toast.textContent='Email: mpoelessy839@gmail.com';}
  toast.classList.add('visible');setTimeout(()=>toast.classList.remove('visible'),3000);
});
render();
