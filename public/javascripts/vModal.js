const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

function clear() {
  document.getElementsByClassName('modalImage').src = ''
  document.getElementById('title').innerHTML = ('')
  document.getElementById('brand').innerHTML = ('')
  document.getElementById('pl').innerHTML = ('')
  document.getElementById('da').innerHTML = ('')
  document.getElementById('brandForm').innerHTML = ('')
  document.getElementById('plateForm').innerHTML = ('')
  document.getElementById('categoryForm').innerHTML = ('')
  document.getElementById('cost').innerHTML = ('₱ ')
  document.getElementById('hs').innerHTML = ('')
  document.getElementById('repair').innerHTML = ('')
  document.getElementById('avail').innerHTML = ('')
  document.getElementById('pj').innerHTML = ('')
}

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
    clear()
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
    clear()
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}
// function printDiv(divName) {
//   var printContents = document.getElementById(divName).innerHTML;
//   w=window.open();
//   w.document.write(printContents);
//   w.print();
//   w.close();
// }

// function Popup(data) {
//   var mywindow = window.open('', 'new div', 'height=400,width=600');
//   mywindow.document.write('<html><head><title></title>');
//   mywindow.document.write('<link rel="stylesheet" href="/stylesheets/spareForm.css" type="text/css" />');
//   mywindow.document.write('</head><body >');
//   mywindow.document.write(data);
//   mywindow.document.write('</body></html>');
//   mywindow.document.close();
//   mywindow.focus();
//   mywindow.close();

//   return true;
// }
// var printing = document.getElementById('print-content').innerHTML;

document.querySelector("#print").addEventListener("click", function() {
	print()
});