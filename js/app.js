'use strict';

function Card(obj) {
  this.url = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns;

  allCards.push(this);
}

const allCards = [];

Card.prototype.render = function() {
  $('main').append('<div class="clone"></div>');
  let $clone = $('div[class="clone"]');

  let template = $('#photo-template').html();

  $clone.html(template);
  $clone.find('h2').text(this.title);
  $clone.find('img').attr('src', this.url);
  $clone.find('p').text(this.description);

  $clone.removeClass('clone');
  $clone.attr('class', this.name);
};

function readJson() {
  $.get('data/page-1.json', 'json')
    .then(data => {
      data.forEach(o => new Card(o));
    })
    .then(() => {
      allCards.forEach(c => c.render());
    });
}

function init() {
  // get data
  // render
}

$(() => readJson());