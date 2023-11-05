import { Button } from '../components';
import { portal } from '../main';

export function createButton(key, node) {
  const button = new Button({
    textContent: key,
    className: 'btn',
    events: {
      click: () => {
        getData(key, node);
      },
    },
  });

  return button.toHTML();
}

async function getData(key, node) {
  portal.className = 'portal--active';
  const data = await fetch(`https://swapi.dev/api/${key}`);
  const parsedData = await data.json();

  displayData(parsedData.results, node);
  portal.className = 'portal';

  console.log(parsedData);
}

function displayData(data, node) {
  data = Array.from(data);

  node.innerHTML = ' ';
  data.forEach((data) => {
    const h3 = document.createElement('h3');
    h3.textContent = `${data.name || data.title}`;
    node.appendChild(h3);
  });
}
