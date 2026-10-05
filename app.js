const photo = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=84`;
const listings = [
  { id: 'cesta', title: 'Cesta da horta de hoje', category: 'Hortaliças', mode: 'Doação', place: 'Pinheiros, São Paulo', distance: '800 m', price: 'Grátis', owner: 'Horta da Vila', description: 'Legumes e folhas frescos, colhidos hoje. Retirada até o fim da tarde.', image: photo('photo-1542838132-92c53300491e') },
  { id: 'pao', title: 'Pães artesanais fresquinhos', category: 'Pães e massas', mode: 'Troca', acceptedCategories: ['Frutas', 'Conservas e geleias'], place: 'Vila Madalena, São Paulo', distance: '1,4 km', price: 'Por troca', owner: 'Pão do Bairro', description: 'Pães de fermentação natural que saíram do forno esta manhã. Aceitamos geleia ou frutas.', image: photo('photo-1509440159596-0249088772ff') },
  { id: 'maca', title: 'Maçãs orgânicas da semana', category: 'Frutas', mode: 'Venda', place: 'Sumarezinho, São Paulo', distance: '2,1 km', price: 'R$ 8', owner: 'Sítio das Frutas', description: 'Maçãs orgânicas maduras, perfeitas para comer ou fazer uma torta.', image: photo('photo-1560806887-1e4cd0b6cbd6') },
  { id: 'tomates', title: 'Tomates maduros do quintal', category: 'Vegetais', mode: 'Doação', place: 'Jardins, São Paulo', distance: '2,7 km', price: 'Grátis', owner: 'Ana Ribeiro', description: 'Tomates fresquinhos colhidos no quintal, prontos para saladas e molhos.', image: photo('photo-1546094096-0df4bcaaa337') },
  { id: 'bananas', title: 'Bananas nanicas da feira', category: 'Frutas', mode: 'Troca', acceptedCategories: ['Hortaliças', 'Pães e massas'], place: 'Sumarezinho, São Paulo', distance: '3,2 km', price: 'Por troca', owner: 'Marina Costa', description: 'Bananas maduras e docinhas, ótimas para comer ou preparar um bolo.', image: photo('photo-1571771894821-ce9b6c11b08e') },
  { id: 'espinafre', title: 'Espinafre fresquinho', category: 'Hortaliças', mode: 'Doação', place: 'Vila Madalena, São Paulo', distance: '3,5 km', price: 'Grátis', owner: 'Quintal da Lú', description: 'Folhas de espinafre recém-colhidas, boas para saladas e refogados.', image: photo('photo-1576045057995-568f588f82fb') },
];

const conversations = [
  { id: 'horta', name: 'Horta da Vila', note: 'Horta comunitária · Pinheiros', icon: 'sprout', time: '10:42', listing: listings[0].title, image: listings[0].image, messages: [{ text: 'Oi! Vi a cesta de hoje. Ainda está disponível?', mine: true, time: '10:35' }, { text: 'Oi! Sim, consigo deixar separada até às 18h.', mine: false, time: '10:42' }] },
  { id: 'pao-chat', name: 'Pão do Bairro', note: 'Comércio parceiro · Vila Madalena', icon: 'store', time: 'Ontem', listing: listings[1].title, image: listings[1].image, messages: [{ text: 'Pode ser uma troca por geleia?', mine: false, time: 'Ontem' }] },
  { id: 'ana', name: 'Ana Ribeiro', note: 'Vizinha · Jardins', icon: 'user-round', time: 'Seg', listing: listings[3].title, image: listings[3].image, messages: [{ text: 'Combinado, te espero na portaria.', mine: false, time: 'Seg' }] },
];

const navItems = [
  { id: 'explorar', label: 'Explorar', icon: 'layout-grid' },
  { id: 'perto', label: 'Perto de mim', icon: 'map-pin' },
  { id: 'conversas', label: 'Conversas', icon: 'message-circle' },
  { id: 'impacto', label: 'Impacto', icon: 'sprout' },
  { id: 'perfil', label: 'Perfil', icon: 'user-round' },
];
const categories = ['Tudo', 'Frutas', 'Vegetais', 'Hortaliças', 'Pães e massas', 'Grãos e cereais', 'Laticínios', 'Conservas e geleias'];
const state = { view: 'explorar', category: 'Tudo', query: '', mode: 'Todos os tipos', profileStatusFilter: 'Ativos', profileModeFilter: 'Todos', saved: new Set(), dialog: null, chatId: 'horta', signedIn: false, accountName: 'Minha conta', accountEmail: '', accountMode: 'login', location: 'Pinheiros, São Paulo' };
const root = document.querySelector('#app');
const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const icon = (name, size = 18) => `<i data-lucide="${name}" width="${size}" height="${size}"></i>`;

function navButton(item, mobile = false) {
  return `<button class="${mobile ? '' : 'nav-item'} ${state.view === item.id ? 'active' : ''}" data-nav="${item.id}" aria-label="${item.label}">${icon(item.icon, mobile ? 18 : 16)}<span>${item.label}</span></button>`;
}

function header() {
  return `<header class="topbar"><button class="brand" data-nav="explorar" aria-label="ShareBite início"><span class="brand-mark"><img src="image_1790257283284270-removebg-preview.png" alt=""></span><span>sharebite</span></button><nav class="topnav" aria-label="Navegação principal">${navItems.map((item) => navButton(item)).join('')}</nav><div class="header-actions"><button class="primary-button" data-action="publish">${icon('plus')}<span>Publicar item</span></button><button class="icon-button" data-action="account" aria-label="${state.signedIn ? 'Minha conta' : 'Entrar'}">${icon(state.signedIn ? 'user-round' : 'log-in')}</button></div></header>`;
}

function shell(content) {
  return `${header()}<main class="page-shell">${content}</main><nav class="mobile-nav" aria-label="Navegação móvel">${navItems.map((item) => navButton(item, true)).join('')}</nav>${state.dialog ? modal() : ''}`;
}

function listingCard(item) {
  const modeClass = item.mode === 'Troca' ? 'swap' : item.mode === 'Venda' ? 'sale' : '';
  return `<article class="listing-card"><div class="listing-image"><img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" loading="lazy"><span class="listing-mode ${modeClass}">${escapeHtml(item.mode)}</span><button class="save-button ${state.saved.has(item.id) ? 'saved' : ''}" data-save="${item.id}" aria-label="${state.saved.has(item.id) ? 'Remover dos salvos' : 'Salvar item'}">${icon('heart', 17)}</button></div><button class="listing-open" data-offer="${item.id}" aria-label="Ver ${escapeHtml(item.title)}"><div class="listing-info"><div style="min-width:0"><h3 class="listing-title">${escapeHtml(item.title)}</h3><p class="listing-owner">${escapeHtml(item.owner)} · ${escapeHtml(item.place)}</p></div><strong class="listing-price">${escapeHtml(item.price)}</strong></div><div class="listing-meta"><span>${icon('map-pin', 13)}${escapeHtml(item.distance)}</span><span>${escapeHtml(item.category)}</span></div></button></article>`;
}

function visibleListings() {
  const search = state.query.trim().toLocaleLowerCase('pt-BR');
  return listings.filter((item) => item.status !== 'completed' && (state.category === 'Tudo' || item.category === state.category) && (state.mode === 'Todos os tipos' || item.mode === state.mode) && (!search || `${item.title} ${item.category} ${item.place} ${item.owner}`.toLocaleLowerCase('pt-BR').includes(search)));
}

function listingGrid() {
  const items = visibleListings();
  return items.length ? items.map(listingCard).join('') : '<div class="empty-state">Não encontramos itens com esses filtros. Tente outra busca.</div>';
}

function profileListingCard(item) {
  const completed = item.status === 'completed';
  const completedDate = completed && item.completedAt ? new Date(item.completedAt).toLocaleDateString('pt-BR') : '';
  return `<article class="profile-listing"><img src="${escapeHtml(item.image)}" alt=""><div class="profile-listing-copy"><div class="profile-listing-heading"><button class="profile-listing-title" data-offer="${item.id}">${escapeHtml(item.title)}</button><span class="profile-status ${completed ? 'completed' : ''}">${completed ? 'Concluído' : 'Ativo'}</span></div><p>${escapeHtml(item.category)} · ${escapeHtml(item.mode)} · ${escapeHtml(item.price)}</p><small>${escapeHtml(item.place)}${completedDate ? ` · Concluído em ${completedDate}` : ''}</small></div>${completed ? '' : `<button class="profile-complete" data-complete="${item.id}">${icon('check-check')}<span>Concluir anúncio</span></button>`}</article>`;
}

function profilePage() {
  const ownListings = listings.filter((item) => item.isMine);
  const activeListings = ownListings.filter((item) => item.status !== 'completed');
  const completedListings = ownListings.filter((item) => item.status === 'completed');
  const modeLabels = { Todos: 'Todos', Troca: 'Trocas', Venda: 'Vendas', Doação: 'Doações' };
  const visibleItems = ownListings.filter((item) => (state.profileStatusFilter === 'Ativos' ? item.status !== 'completed' : item.status === 'completed') && (state.profileModeFilter === 'Todos' || item.mode === state.profileModeFilter));
  const displayName = state.signedIn ? state.accountName : 'Minha conta';
  const initials = displayName.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toLocaleUpperCase('pt-BR');
  const emptyMessage = ownListings.length ? 'Nenhum anúncio encontrado para estes filtros.' : 'Você ainda não publicou anúncios por aqui.';

  return `<section class="profile-summary"><span class="profile-avatar">${escapeHtml(initials)}</span><div class="profile-identity"><p class="eyebrow">PERFIL DA COMUNIDADE</p><h1>${escapeHtml(displayName)}</h1><p>${escapeHtml(state.accountEmail || 'Acesso demonstrativo')} · ${escapeHtml(state.location)}</p></div><div class="profile-actions"><button class="outline-button" data-action="account">${state.signedIn ? 'Dados da conta' : 'Entrar ou criar conta'}</button><button class="primary-button" data-action="publish">${icon('plus')}<span>Publicar item</span></button></div></section>
    <section class="profile-stats" aria-label="Resumo dos anúncios">${profileStat('package-check', activeListings.length, 'Anúncios ativos')}${profileStat('archive', completedListings.length, 'No histórico')}${profileStat('repeat-2', ownListings.filter((item) => item.mode === 'Troca').length, 'Trocas')}${profileStat('hand-coins', ownListings.filter((item) => item.mode === 'Venda').length, 'Vendas')}</section>
    <section class="profile-activity"><div class="section-head"><div><h2>Meus anúncios</h2><p>Acompanhe o que está ativo e o que já foi concluído.</p></div></div><div class="profile-filters"><div class="profile-filter-group" role="group" aria-label="Status dos anúncios">${['Ativos', 'Histórico'].map((filter) => `<button class="profile-filter ${state.profileStatusFilter === filter ? 'selected' : ''}" data-profile-status="${filter}" aria-pressed="${state.profileStatusFilter === filter}">${filter}<span>${filter === 'Ativos' ? activeListings.length : completedListings.length}</span></button>`).join('')}</div><div class="profile-filter-group profile-mode-filters" role="group" aria-label="Modalidade dos anúncios">${Object.entries(modeLabels).map(([mode, label]) => `<button class="profile-mode-filter ${state.profileModeFilter === mode ? 'selected' : ''}" data-profile-mode="${mode}" aria-pressed="${state.profileModeFilter === mode}">${label}</button>`).join('')}</div></div><div class="profile-listings">${visibleItems.length ? visibleItems.map(profileListingCard).join('') : `<div class="profile-empty"><p>${emptyMessage}</p><button class="outline-button" data-action="publish">${icon('plus')}Publicar um anúncio</button></div>`}</div></section>`;
}

function explorePage() {
  return `<section class="welcome-band"><div class="welcome-copy"><p class="eyebrow">MENOS EXCESSO. MAIS ENCONTRO.</p><h1>O que sobra pra você pode mudar o dia de alguém.</h1><p>Compartilhe, troque ou encontre algo bom no seu bairro.</p><div class="welcome-actions"><button class="dark-button" data-action="publish">${icon('plus')}Compartilhar um item</button><span class="location-label">${icon('map-pin')} ${escapeHtml(state.location)}</span></div></div><div class="welcome-photo" role="img" aria-label="Alimentos frescos da comunidade"></div></section>
    <div class="section-head"><div><h2>Achados perto de você</h2><p>Coisas boas circulam por aqui.</p></div><span class="location-label">${icon('navigation')} Raio de 5 km</span></div>
    <section class="browse-tools" aria-label="Buscar e filtrar itens"><label class="search-field">${icon('search')}<input id="search" type="search" placeholder="Buscar alimentos, objetos, lugares..." value="${escapeHtml(state.query)}"></label><select class="filter-select" id="mode-filter" aria-label="Modalidade"><option>Todos os tipos</option>${['Doação', 'Troca', 'Venda'].map((mode) => `<option ${state.mode === mode ? 'selected' : ''}>${mode}</option>`).join('')}</select><button class="outline-button" data-nav="perto">${icon('map')}Mapa</button></section>
    <div class="category-row" aria-label="Categorias">${categories.map((category) => `<button class="category-chip ${state.category === category ? 'selected' : ''}" data-category="${category}">${category}</button>`).join('')}</div><section class="listing-grid" id="listing-grid" aria-label="Itens disponíveis">${listingGrid()}</section>`;
}

function placeRow(symbol, name, note, tag) {
  return `<div class="place-row"><span class="place-icon">${icon(symbol)}</span><div><p class="place-name">${name}</p><p class="place-note">${note}</p></div><span class="place-tag">${tag}</span></div>`;
}

function nearbyPage() {
  return `<div class="section-head"><div><h2>O bairro está compartilhando</h2><p>Encontre algo bom a poucos passos de casa.</p></div><button class="outline-button" data-action="locate">${icon('locate-fixed')}<span>Usar minha localização</span></button></div><div class="nearby-layout"><div class="map-board" aria-label="Mapa ilustrativo de ofertas próximas"><div class="map-location">${icon('map-pin')}<span id="map-location">${escapeHtml(state.location)}</span><button data-action="locate" aria-label="Atualizar localização">${icon('locate-fixed')}</button></div><span class="map-pin one">${icon('sprout')}Horta da Vila</span><span class="map-pin two">${icon('store')}Padaria</span><span class="map-pin three">${icon('heart-handshake')}Doação</span><span class="map-pin four you">${icon('map-pin')}Você</span></div><aside class="place-list"><h3>Pontos de encontro</h3>${placeRow('store', 'Horta da Vila', 'Alimentos frescos · 800 m', '3 itens')}${placeRow('coffee', 'Pão do Bairro', 'Comércio parceiro · 1,4 km', '2 itens')}${placeRow('heart-handshake', 'ONG Mesa Aberta', 'Recebe doações · 2 km', 'ONG')}<div class="impact-note">${icon('info')}<div><strong>Retirada combinada</strong><p>Converse com quem publicou para combinar local e horário.</p></div></div></aside></div>`;
}

function messagesPage() {
  const selected = conversations.find((chat) => chat.id === state.chatId) || conversations[0];
  return `<div class="section-head"><div><h2>Conversas</h2><p>Combine a troca e a retirada com a comunidade.</p></div></div><div class="messages-layout"><aside class="conversation-list"><div class="conversation-head"><h2>Suas conversas</h2></div>${conversations.map((chat) => `<button class="conversation-row ${chat.id === selected.id ? 'active' : ''}" data-chat="${chat.id}"><span class="avatar">${icon(chat.icon)}</span><span class="conversation-copy"><strong>${escapeHtml(chat.name)}</strong><span>${escapeHtml(chat.messages.at(-1)?.text || '')}</span></span><span class="conversation-time">${chat.time}</span></button>`).join('')}</aside><section class="chat-panel"><header class="chat-top"><span class="avatar">${icon(selected.icon)}</span><div><strong>${escapeHtml(selected.name)}</strong><small>${escapeHtml(selected.note)}</small></div></header><div class="chat-context"><img src="${escapeHtml(selected.image)}" alt=""><div><strong>${escapeHtml(selected.listing)}</strong><span>Conversa sobre um item publicado</span></div></div><div class="chat-messages" id="chat-messages">${selected.messages.map((message) => `<div class="message ${message.mine ? 'mine' : ''}">${escapeHtml(message.text)}<span class="message-time">${escapeHtml(message.time)}</span></div>`).join('')}</div><form class="chat-form" id="chat-form"><input id="chat-input" name="message" placeholder="Escreva uma mensagem..." autocomplete="off" required aria-label="Mensagem"><button aria-label="Enviar mensagem">${icon('send')}</button></form></section></div><section class="partners"><h3>COMÉRCIOS E ORGANIZAÇÕES</h3>${placeRow('store', 'Pão do Bairro', 'Padaria parceira · excedentes diários', 'Comércio')}${placeRow('heart-handshake', 'ONG Mesa Aberta', 'Rede de distribuição comunitária', 'ONG')}</section>`;
}

function metric(symbol, value, label, tint = '') {
  return `<article class="metric"><span class="metric-icon ${tint}">${icon(symbol)}</span><strong>${value}</strong><span>${label}</span></article>`;
}
function profileStat(symbol, value, label) { return `<article class="profile-stat"><span>${icon(symbol)}</span><div><strong>${value}</strong><small>${label}</small></div></article>`; }
function bar(label, value, tint = '') { return `<div class="bar-row"><span>${label}</span><div class="bar-track"><div class="bar-fill ${tint}" style="width:${value}%"></div></div><strong>${value}%</strong></div>`; }
function partner(symbol, name, note) { return `<div class="partner-row"><span class="partner-symbol">${icon(symbol)}</span><div><strong>${name}</strong><small>${note}</small></div></div>`; }

function impactPage() {
  return `<div class="section-head"><div><h2>Pequenos gestos, grande movimento</h2><p>Prévia demonstrativa do impacto da comunidade.</p></div><span class="location-label">${icon('calendar-days')} Este mês</span></div><section class="metrics-grid">${metric('shopping-basket', '384', 'itens reaproveitados')}${metric('piggy-bank', 'R$ 12,4 mil', 'economizados pela comunidade', 'coral')}${metric('recycle', '227 kg', 'de resíduos evitados', 'sage')}${metric('users-round', '61%', 'dos itens foram doações')}</section><div class="impact-grid"><section class="panel"><h3>Como a comunidade compartilha</h3><p>Distribuição das publicações neste mês</p>${bar('Doação', 61)}${bar('Troca', 25, 'coral')}${bar('Venda', 14, 'blue')}<div class="impact-note"><img class="impact-stamp" src="image_1790257467990506-removebg-preview.png" alt=""><div><strong>Impacto que chega mais longe</strong><p>Comércios locais e ONGs podem publicar excedentes e coordenar doações para quem mais precisa.</p></div></div></section><section class="panel"><h3>Rede de parceiros</h3><p>Quem faz circular coisas boas no bairro</p>${partner('store', 'Pão do Bairro', 'Padaria · 12 itens compartilhados')}${partner('sprout', 'Horta da Vila', 'Horta comunitária · 28 itens')}${partner('heart-handshake', 'ONG Mesa Aberta', 'Organização social · 3 pontos de coleta')}</section></div>`;
}

function publishModal() {
  return `<div class="modal-backdrop"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button class="modal-close" data-action="close" aria-label="Fechar">${icon('x')}</button><h2 id="modal-title">Compartilhe algo bom</h2><p class="modal-intro">Publique um excedente para alguém aproveitar no seu bairro.</p><form class="modal-form" id="publish-form"><div class="field"><label for="item-title">O que você está oferecendo?</label><input id="item-title" name="title" placeholder="Ex.: frutas da feira de hoje" required maxlength="70"></div><div class="field"><label for="item-description">Descrição</label><textarea id="item-description" name="description" placeholder="Conte sobre o item, estado ou validade."></textarea></div><div class="field photo-field"><label for="item-image">Foto do item (opcional)</label><input id="item-image" name="image" type="file" accept="image/*"><div class="photo-preview" id="photo-preview" hidden><img id="item-image-preview" alt="Prévia da foto selecionada"><span id="item-image-name"></span></div><small>Imagem de até 5 MB.</small></div><div class="form-row"><div class="field"><label for="item-category">Categoria</label><select id="item-category" name="category">${categories.slice(1).map((category) => `<option>${escapeHtml(category)}</option>`).join('')}</select></div><div class="field"><label for="item-mode">Modalidade</label><select id="item-mode" name="mode"><option>Doação</option><option>Troca</option><option>Venda</option></select></div></div><fieldset class="trade-preferences" id="trade-preferences" hidden><legend>Aceita em troca</legend><div class="trade-option-grid">${categories.slice(1).map((category) => `<label class="trade-option"><input type="checkbox" name="acceptedCategories" value="${escapeHtml(category)}"><span>${escapeHtml(category)}</span></label>`).join('')}</div></fieldset><div class="form-row"><div class="field"><label for="item-place">Bairro ou localização</label><input id="item-place" name="place" value="${escapeHtml(state.location)}" required></div><div class="field"><label for="item-price">Valor (se houver)</label><input id="item-price" name="price" placeholder="Ex.: R$ 10"></div></div><button class="primary-button">Publicar item</button></form></section></div>`;
}

function accountModal() {
  const register = state.accountMode === 'register';
  return `<div class="modal-backdrop"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button class="modal-close" data-action="close" aria-label="Fechar">${icon('x')}</button><h2 id="modal-title">${state.signedIn ? `Olá, ${escapeHtml(state.accountName)}` : 'Que bom ter você por aqui'}</h2><p class="modal-intro">${state.signedIn ? 'Sua conta de demonstração está ativa neste navegador.' : 'Entre para conversar com a vizinhança ou crie sua conta.'}</p>${state.signedIn ? '<button class="outline-button" data-action="close">Fechar</button>' : `<div class="category-row" style="margin-bottom:16px"><button class="category-chip ${!register ? 'selected' : ''}" data-account-tab="login">Entrar</button><button class="category-chip ${register ? 'selected' : ''}" data-account-tab="register">Criar conta</button></div><form class="modal-form" id="account-form"><div class="field" ${register ? '' : 'hidden'}><label for="account-name">Seu nome</label><input id="account-name" name="name" placeholder="Como podemos chamar você?" ${register ? 'required' : ''}></div><div class="field"><label for="account-email">E-mail</label><input id="account-email" name="email" type="email" placeholder="voce@email.com" required></div><div class="field"><label for="account-password">Senha</label><input id="account-password" name="password" type="password" minlength="6" placeholder="Pelo menos 6 caracteres" required></div><button class="primary-button">${register ? 'Criar minha conta' : 'Entrar'}</button></form><p class="auth-switch">Acesso demonstrativo. Autenticação real requer backend.</p>`}</section></div>`;
}

function offerModal() {
  const item = listings.find((listing) => listing.id === state.dialog.id);
  if (!item) return '';
  const acceptedTrades = item.mode === 'Troca' ? `<div class="accepted-trades"><strong>Aceita em troca</strong>${item.acceptedCategories?.length ? `<div class="accepted-trade-list">${item.acceptedCategories.map((category) => `<span class="accepted-trade">${escapeHtml(category)}</span>`).join('')}</div>` : '<p>Aberta a propostas de alimentos.</p>'}</div>` : '';
  return `<div class="modal-backdrop"><section class="modal wide" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button class="modal-close" data-action="close" aria-label="Fechar">${icon('x')}</button><img class="detail-image" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}"><div class="detail-content"><span class="listing-mode">${escapeHtml(item.mode)}</span><h2 id="modal-title">${escapeHtml(item.title)}</h2><p>${escapeHtml(item.description)}</p><p>${icon('user-round', 14)} ${escapeHtml(item.owner)} &nbsp;·&nbsp; ${icon('map-pin', 14)} ${escapeHtml(item.place)} · ${escapeHtml(item.distance)}</p>${acceptedTrades}<div class="detail-footer"><strong>${escapeHtml(item.price)}</strong><button class="dark-button" data-interest="${item.id}">${icon('message-circle')}Tenho interesse</button></div></div></section></div>`;
}

function modal() {
  if (state.dialog.kind === 'publish') return publishModal();
  if (state.dialog.kind === 'account') return accountModal();
  if (state.dialog.kind === 'offer') return offerModal();
  return '';
}

function render() {
  const views = { explorar: explorePage, perto: nearbyPage, conversas: messagesPage, impacto: impactPage, perfil: profilePage };
  root.innerHTML = shell(views[state.view]());
  window.lucide?.createIcons();
  if (state.view === 'conversas') {
    const messages = document.querySelector('#chat-messages');
    if (messages) messages.scrollTop = messages.scrollHeight;
  }
}

function toast(message) {
  document.querySelector('.toast')?.remove();
  const notice = document.createElement('div');
  notice.className = 'toast';
  notice.setAttribute('role', 'status');
  notice.textContent = message;
  document.body.append(notice);
  setTimeout(() => notice.remove(), 3000);
}

function openConversation(item) {
  let chat = conversations.find((conversation) => conversation.id === `item-${item.id}`);
  if (!chat) {
    chat = { id: `item-${item.id}`, name: item.owner, note: `Sobre: ${item.title}`, icon: 'user-round', time: 'Agora', listing: item.title, image: item.image, messages: [{ text: `Olá! Tenho interesse em “${item.title}”. Ainda está disponível?`, mine: true, time: 'Agora' }] };
    conversations.unshift(chat);
  }
  state.chatId = chat.id;
  state.dialog = null;
  state.view = 'conversas';
  render();
  toast('Conversa iniciada. Combine a retirada por aqui.');
}

function updateListings() {
  const grid = document.querySelector('#listing-grid');
  if (grid) grid.innerHTML = listingGrid();
  window.lucide?.createIcons();
}

function locateUser() {
  if (!navigator.geolocation) return toast('Este navegador não oferece acesso à localização.');
  toast('Solicitando permissão de localização...');
  navigator.geolocation.getCurrentPosition(({ coords }) => {
    state.location = `${coords.latitude.toFixed(3)}, ${coords.longitude.toFixed(3)}`;
    render();
    toast('Localização atualizada.');
  }, () => toast('Não foi possível acessar sua localização. Confira as permissões do navegador.'), { enableHighAccuracy: true, timeout: 10000 });
}

root.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal-backdrop')) {
    state.dialog = null;
    render();
    return;
  }
  const button = event.target.closest('button');
  if (!button) return;
  if (button.dataset.nav) { state.view = button.dataset.nav; render(); }
  else if (button.dataset.category) { state.category = button.dataset.category; render(); }
  else if (button.dataset.save) { state.saved.has(button.dataset.save) ? state.saved.delete(button.dataset.save) : state.saved.add(button.dataset.save); updateListings(); }
  else if (button.dataset.offer) { state.dialog = { kind: 'offer', id: button.dataset.offer }; render(); }
  else if (button.dataset.interest) { const item = listings.find((listing) => listing.id === button.dataset.interest); if (item) openConversation(item); }
  else if (button.dataset.chat) { state.chatId = button.dataset.chat; render(); }
  else if (button.dataset.profileStatus) { state.profileStatusFilter = button.dataset.profileStatus; render(); }
  else if (button.dataset.profileMode) { state.profileModeFilter = button.dataset.profileMode; render(); }
  else if (button.dataset.complete) {
    const item = listings.find((listing) => listing.id === button.dataset.complete && listing.isMine);
    if (item) { item.status = 'completed'; item.completedAt = new Date().toISOString(); render(); toast('Anúncio movido para o histórico.'); }
  }
  else if (button.dataset.accountTab) { state.accountMode = button.dataset.accountTab; render(); }
  else if (button.dataset.action === 'publish') { state.dialog = { kind: 'publish' }; render(); document.querySelector('#item-title')?.focus(); }
  else if (button.dataset.action === 'account') { state.dialog = { kind: 'account' }; render(); }
  else if (button.dataset.action === 'close') { state.dialog = null; render(); }
  else if (button.dataset.action === 'locate') locateUser();
});

root.addEventListener('input', (event) => {
  if (event.target.id === 'search') { state.query = event.target.value; updateListings(); }
});
root.addEventListener('change', (event) => {
  if (event.target.id === 'mode-filter') { state.mode = event.target.value; updateListings(); }
  if (event.target.id === 'item-image') {
    const file = event.target.files[0];
    const preview = document.querySelector('#photo-preview');
    if (!file || !preview) return;
    if (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024) {
      event.target.value = '';
      preview.hidden = true;
      toast('Escolha uma imagem de até 5 MB.');
      return;
    }
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      if (event.target.files[0] !== file) return;
      document.querySelector('#item-image-preview').src = reader.result;
      document.querySelector('#item-image-name').textContent = file.name;
      preview.hidden = false;
    });
    reader.readAsDataURL(file);
  }
  if (event.target.id === 'item-mode') {
    const preferences = document.querySelector('#trade-preferences');
    if (preferences) preferences.hidden = event.target.value !== 'Troca';
  }
});

root.addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  if (form.id === 'publish-form') {
    const file = data.get('image');
    let image = photo('photo-1542838132-92c53300491e');
    if (file?.size) {
      if (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024) return toast('Escolha uma imagem de até 5 MB.');
      image = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => resolve(reader.result));
        reader.addEventListener('error', reject);
        reader.readAsDataURL(file);
      }).catch(() => null);
      if (!image) return toast('Não foi possível carregar essa imagem. Tente novamente.');
    }
    const mode = data.get('mode');
    listings.unshift({ id: `item-${Date.now()}`, title: data.get('title').trim(), category: data.get('category'), mode, acceptedCategories: mode === 'Troca' ? data.getAll('acceptedCategories') : [], isMine: true, status: 'active', createdAt: new Date().toISOString(), place: data.get('place').trim(), distance: 'perto de você', price: mode === 'Doação' ? 'Grátis' : mode === 'Troca' ? 'Por troca' : data.get('price') || 'A combinar', owner: state.signedIn ? state.accountName : 'Você', description: data.get('description') || 'Item compartilhado pela comunidade ShareBite.', image });
    state.dialog = null; state.view = 'explorar'; state.category = 'Tudo'; state.mode = 'Todos os tipos'; state.query = ''; render(); toast('Seu anúncio já está na comunidade.');
  } else if (form.id === 'account-form') {
    state.signedIn = true; state.accountName = data.get('name')?.trim() || data.get('email').split('@')[0]; state.accountEmail = data.get('email').trim(); state.dialog = null; render(); toast('Acesso demonstrativo iniciado.');
  } else if (form.id === 'chat-form') {
    const chat = conversations.find((conversation) => conversation.id === state.chatId);
    const text = data.get('message').trim();
    if (chat && text) { const time = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }); chat.messages.push({ text, mine: true, time }); chat.time = 'Agora'; render(); document.querySelector('#chat-input')?.focus(); }
  }
});

render();