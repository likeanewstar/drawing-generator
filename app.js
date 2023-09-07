'use strict'

$(document).ready(function (e) {

  // reset
  $('#initialize').on('click', function() {
    $('[contenteditable="true"]').each(function() {
      $(this).text('');
    })
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

  
  function pdfPrint() {
    window.jsPDF = window.jspdf.jsPDF;
    $('body').addClass('capture-mode');

    html2canvas(document.querySelector('#capture'), {
      logging: true,
      letterRendering: 1,
      allowTaint: true,
      useCORS: true,
    }).then((canvas) => {
        // 캔버스를 이미지로 변환
      var imgData = canvas.toDataURL('image/png');

      var imgWidth = 210; // 이미지 가로 길이(mm) A4 기준
      var pageHeight = imgWidth * 1.414;  // 출력 페이지 세로 길이 계산 A4 기준
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      var doc = new jsPDF('p', 'mm');
      var position = 0;

      // 첫 페이지 출력
      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // 한 페이지 이상일 경우 루프 돌면서 출력
      while (heightLeft >= 20) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
      }

      // 파일 저장
      doc.save('paper.pdf');
      $('body').removeClass('capture-mode');
      });
  }

  $('#pdf').on('click', function() {
    pdfPrint();
  });

}); // end of ready


