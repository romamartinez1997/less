function rf(){const l=LS.get('bg_fav',[]).map(byId).filter(Boolean);$('#grid').innerHTML=l.length?l.map(card).join(''):'<div class="empty"><p>В избранном пока пусто</p><a class="btn" href="catalog.html">Перейти в каталог</a></div>'}
window.addEventListener('favchange',rf);rf();
