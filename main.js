import { App, Header, Main, Footer, Spinner } from './components';
import { Component, createButton } from './core';

import './public/style.scss';

const header = new Header({}).toHTML();
const main = new Main({}).toHTML();

const app = new App({
  children: [header, main],
}).toHTML();

export const portal = new Component({
  tagName: 'div',
  className: 'portal--active',
}).toHTML();

const spiner = new Spinner({}).toHTML();

portal.append(spiner);

document.body.append(portal, app);

fetch('https://swapi.dev/api/')
  .then((res) => {
    const json = res.json();

    return json;
  })
  .then((res) => {
    for (const key in res) {
      header.append(createButton(key, main));
      portal.className = 'portal';
    }
  });
