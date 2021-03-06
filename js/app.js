'use strict';

function Card(obj) {
  this.url = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns;

  allCards.push(this);
}

let allCards = [];
let page = 1;

Card.prototype.render = function() {
  let templateScript = $('#template').html();
  let template = Handlebars.compile(templateScript);
  let newCard = template(this);
  $('main').append(newCard);
};

Card.prototype.addOptions = function() {
  // make unique options by converting to set and back to array
  let options = allCards.map(c => c.keyword);
  options = new Set(options);
  options = [...options];

  options.forEach(option => {
    $('select').append('<option class = "option"></option>');
    let $option = $('option[class="option"]');
  
    $option.attr('value', option);
    $option.text(option);
  
    $option.removeClass('option');
  });
}

function readJson(filename) {
  $.get(filename, 'json')
    .then(data => {
      data.forEach(o => new Card(o));
    })
    .then(() => {
      allCards.forEach(c => c.render());
      // hides first empty div
      $('#photo-template').hide();
      Card.prototype.addOptions();
    });
}

$('select').on('change', function() {
  $('#name').prop('checked', false);
  $('#horns').prop('checked', false);
  let selection = $(this).val();
  if (selection === 'default') {
    $('div').show();
    return;
  }
  $('div').hide();
  $(`div[id="${selection}"`).show();
});

function empty() {
  allCards = [];
  $('main').empty();
  $('select').empty();
  $('select').append('<option value="default">-- Filter by Keyword --</option>');
  $('#name').prop('checked', false);
  $('#horns').prop('checked', false);
}

$('#page').on('click', function() {
  if (page === 1) {
    page = 2;
    empty();
    readJson('data/page-2.json');
    $(this).text('Page 1');
  } else {
    page = 1;
    empty();
    readJson('data/page-1.json');
    $(this).text('Page 2');
  }
});

$('#name').on('change', function() {
  console.log($(this).is(':checked'));
  if ($(this).is(':checked')) {
    $('#horns').prop('checked', false);
    allCards.sort((a, b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    });
    $('main').empty();
    allCards.forEach(c => c.render());
  } else {
    empty();
    const filename = page === 1 ? 'data/page-1.json' : 'data/page-2.json';
    readJson(filename);
  }
});

$('#horns').on('change', function() {
  console.log($(this).is(':checked'));
  if ($(this).is(':checked')) {
    $('#name').prop('checked', false);
    allCards.sort((a, b) => {
      return a.horns - b.horns;
    });
    $('main').empty();
    allCards.forEach(c => c.render());
  } else {
    empty();
    const filename = page === 1 ? 'data/page-1.json' : 'data/page-2.json';
    readJson(filename);
  }
});

// document ready function
$(() => readJson('data/page-1.json'));