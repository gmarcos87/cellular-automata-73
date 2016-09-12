function init(){
  var cant = 200;
  var container = document.querySelector(".container");
  container.innerHTML =  '';
  var row = document.createElement('DIV');
  row.classList.add('row');
  for (var i = 0; i < cant; i++) {
    var box = document.createElement('DIV');
    box = randomize(box);
    row.appendChild(box);
  }
  container.appendChild(row);
  for (var i = 0; i < cant; i++) {
    var newRow = cloneRow(document.querySelectorAll('.row'),container);
    container.appendChild(newRow);
  }
  //scroll
  setInterval(function(){
    upRows(document.querySelectorAll('.row'))
  },400);
}

function randomize(el){
  el.classList.add(Math.random() > 0.5 ? "active" : "inactive");
  return el;
}

function cloneRow(rows){
  var lastRow = rows[rows.length - 1];
  var newRow = lastRow.cloneNode(true);
  newRow = randomizeRows(newRow,lastRow, 1);
  return newRow;
}

function upRows(rows){
  for (var i = 0; i < rows.length; i++) {
    var actualRows = rows[i];
    var nextRows = rows[i + 1 ] || cloneRow(rows);
    var boxs = actualRows.querySelectorAll('div');
    var nextBox = nextRows.querySelectorAll('div');
    for (var t = 0; t < boxs.length; t++) {
      boxs[t].classList.remove('active')
      boxs[t].classList.remove('inactive')
      boxs[t].classList.add(nextBox[t].classList.contains('active') ? 'active':'inactive')
    }
  }
}

function randomizeRows(row,old,offset) {
  var old = old.querySelectorAll('div');
  var boxs = row.querySelectorAll('div');
  for (var i = 0; i < boxs.length; i++) {
    var actualBox = boxs[i];

    var upBox = old[i];
    var prevBox = old[i - offset] || old[old.length - offset];
    var nextBox = old[i + offset] || old[0];

    var total =
      true2value(prevBox.classList.contains('active'),1) +
      true2value(upBox.classList.contains('active'),3) +
      true2value(nextBox.classList.contains('active'),5);

    switch (total) {
      case 4:
      case 8:
      case 0:
          boxs[i].classList.remove('inactive');
          boxs[i].classList.add('active');
        break;
      case 1:
      case 3:
      case 5:
      case 9:
          boxs[i].classList.add('inactive');
          boxs[i].classList.remove('active');
    }
  }
  return row;
}


function true2value (el,val){
  return el ? val : 0;
}

init();
