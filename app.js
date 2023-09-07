'use strict'

$(document).ready(function (e) {

$('#initialize').on('click', function() {
  $('[contenteditable="true"]').each(function() {
    $(this).text('');
  })
});

  $('[contenteditable="true"]').on('keydown', function() {
    if ($(this).text() == '') {
      if (e.keyCode === 8) {
        // 보류        
      }
    }
  });


  // HTML2CANVAS API
  const produceImageBtn = document.querySelector('#export');
  const captureModal = document.querySelector('.capture-modal');
  const mod = document.querySelectorAll('.mod');
  const overlay = document.querySelector('.overlay');

  const captureExport = function () {
    $('body').addClass('capture-mode');
    html2canvas(document.querySelector('#capture'), {
      logging: true,
      letterRendering: 1,
      allowTaint: true,
      useCORS: true,
    }).then((canvas) => {
      captureModal.appendChild(canvas).classList.add('canvas');
    });

    mod.forEach((e) => e.classList.remove('hidden'));
  };

  const removeCapture = function () {
    if(captureModal.firstElementChild) {
      captureModal.removeChild(captureModal.firstElementChild);
      $('body').removeClass('capture-mode');
    }

    mod.forEach((e) => e.classList.add('hidden'));
  };

  produceImageBtn.addEventListener('click', captureExport);
  overlay.addEventListener('click', removeCapture);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      removeCapture();
    }
  });
})


