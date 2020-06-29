const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

function clear() {
    document.getElementById('personsIncharge').src = ''
    document.getElementById('brief').innerHTML = ('')
    document.getElementById('more').innerHTML = ('')
    document.getElementById('date').innerHTML = ('')
    document.getElementById('used').innerHTML = ('')
    document.getElementById('pio').innerHTML = ('')
    document.getElementById('involved').innerHTML = ('')
    document.getElementById('tcost').innerHTML = ('₱ ')
    document.getElementById('status').innerHTML = ('')
    document.getElementById('recImage').src = ''
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

function printDiv(divName) {
  var printContents = document.getElementById(divName).innerHTML;
  var originalContents = document.body.innerHTML;

  document.body.innerHTML = printContents;

  window.print();

  document.body.innerHTML = originalContents;
}

    function imagezoom(imgId, resultId){
      var img, lens,result, cx, cy;
      img = document.getElementById(imgId);
      result = document.getElementById(resultId);
      lens = document.createElement("DIV");
      lens.setAttribute("class", "img-zoom-lens");
      img.parentElement.insertBefore(lens, img);
      cx = result.offsetWidth / lens.offsetWidth*.5;
      cy = result.offsetHeight / lens.offsetHeight*.5;
      result.style.backgroundImage ="url('/assets/receipt/<%=tasks.receiptImage%>')";
      result.style.backgroundSize = (img.width * cx/.8)+ "px " + (img.height * cy/.8)+ "px";
      lens.addEventListener("mousemove",moveLens);
      img.addEventListener("mousemove",moveLens);

      lens.addEventListener("touchmove",moveLens);
      img.addEventListener("touchmove",moveLens);

      function moveLens(e){
        var pos,x,y;
        e.preventDefault();
        pos= getCursorPos(e);
        x=pos.x -(lens.offsetWidth/2);
        y=pos.y -(lens.offsetHeight /2);

        if(x>img.width - lens.offsetWidth){x=img.width - lens.offsetWidth;}
        if(x < 0){x=0;}
        if(y>img.height - lens.offsetHeight){y=img.height - lens.offsetHeight;}
        if(y < 0){y=0;}

        lens.style.left = x + "px";
        lens.style.top = y + "px";

        result.style.backgroundPosition = "-" + (x*cx) + "px -" +(y*cy)+ "px";
      }
       function getCursorPos(e){
         var a, x=0,y=0;
         e = e|| window.event;
         a = img.getBoundingClientRect();
         x = e.pageX - a.left;
         y = e.pageY - a.top;

         x= x-window.pageXOffset;
         y=y-window.pageYOffset;
         return {x:x,y:y};
       }
    }
