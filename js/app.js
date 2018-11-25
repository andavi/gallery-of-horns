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
  console.log(this);
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