const socket = io();
function newOrder(type) { socket.emit('newOrder', type); }
function addBot()    { socket.emit('addBot'); }
function removeBot(id) { socket.emit('removeBot', id); }

socket.on('update', data => {
  document.getElementById('pending').innerHTML = data.pending.map(o => {
    const c = o.type === 'VIP' ? 'danger' : 'secondary';
    return `<li class="list-group-item d-flex justify-content-between align-items-center">
      ${o.type} #${o.id}
      <span class="badge bg-${c}">${o.type}</span>
    </li>`;
  }).join('');

  document.getElementById('completed').innerHTML = data.completed.map(o => {
    const c = o.type === 'VIP' ? 'danger' : 'secondary';
    return `<li class="list-group-item d-flex justify-content-between align-items-center">
      ${o.type} #${o.id}
      <span class="badge bg-${c}">${o.type}</span>
    </li>`;
  }).join('');

  document.getElementById('bots').innerHTML = data.bots.map(b => {
    const status = b.working
      ? `Processing Order #${b.currentOrder.id}`
      : 'Idle';
    return `<li class="list-group-item d-flex justify-content-between align-items-center">
      Bot #${b.id}: ${status}
      <button class="btn btn-sm btn-outline-danger" onclick="removeBot(${b.id})">Remove</button>
    </li>`;
  }).join('');
});
