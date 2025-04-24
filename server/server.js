import 'dotenv/config';
import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import sirv from 'sirv';
import NodePersist from 'node-persist';


var dataList;
var schoolID = "";
var schoolURL = "http://localhost:5173/client/school_" + schoolID + ".png";

const storage = NodePersist;
storage.initSync();

const myHeaders = new Headers();
myHeaders.append("Accept", "application/json");


const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch("https://www.dnd5eapi.co/api/2014/spells?school=" + schoolID, requestOptions)
  .then((response) => response.json())
  .then((data) => {
      // console.log(data.results);
    dataList = data.results;
    if (data.results && Array.isArray(data.results)) {
      // data.results.forEach((spell) => {
      //   console.log(spell.index);
      // });
    } else {
      console.error("No 'results' field found or it's not an array.");
    }
  })
  .catch((error) => console.error("Error fetching data:", error));

const engine = new Liquid({
  extname: '.liquid',
});

const app = new App();

app
  .use(logger())
  .use('/', sirv(process.env.NODE_ENV === 'development' ? 'client' : 'dist'))
  .listen(3000, () => console.log('Server available on http://localhost:3000'));



app.get('/', async (req, res) => {
  schoolID = "";
  schoolURL = "http://localhost:5173/client/school_" + schoolID + ".png";
  return res.send(renderTemplate('server/views/index.liquid', { title: 'Home', items: Object.values(dataList), schoolURL }));
});

app.get('/necromancy', async (req, res) => {
  schoolID = "necromancy";
  schoolURL = "http://localhost:5173/client/school_" + schoolID + ".png";
  return res.send(renderTemplate('server/views/index.liquid', { title: 'Home', items: Object.values(dataList), schoolURL }));
});

app.get('/illusion', async (req, res) => {
  schoolID = "illusion";
  schoolURL = "http://localhost:5173/client/school_" + schoolID + ".png";
  return res.send(renderTemplate('server/views/index.liquid', { title: 'Home', items: Object.values(dataList), schoolURL }));
});

app.get('/abjuration', async (req, res) => {
  schoolID = "abjuration";
  schoolURL = "http://localhost:5173/client/school_" + schoolID + ".png";
  return res.send(renderTemplate('server/views/index.liquid', { title: 'Home', items: Object.values(dataList), schoolURL }));
});

app.get('/conjuration', async (req, res) => {
  schoolID = "conjuration";
  schoolURL = "http://localhost:5173/client/school_" + schoolID + ".png";
  return res.send(renderTemplate('server/views/index.liquid', { title: 'Home', items: Object.values(dataList), schoolURL }));
});

app.get('/divination', async (req, res) => {
  schoolID = "divination";
  schoolURL = "http://localhost:5173/client/school_" + schoolID + ".png";
  return res.send(renderTemplate('server/views/index.liquid', { title: 'Home', items: Object.values(dataList), schoolURL }));
});

app.get('/enchantment', async (req, res) => {
  schoolID = "enchantment";
  schoolURL = "http://localhost:5173/client/school_" + schoolID + ".png";
  return res.send(renderTemplate('server/views/index.liquid', { title: 'Home', items: Object.values(dataList), schoolURL }));
});

app.get('/invocation', async (req, res) => {
  schoolID = "invocation";
  schoolURL = "http://localhost:5173/client/school_" + schoolID + ".png";
  return res.send(renderTemplate('server/views/index.liquid', { title: 'Home', items: Object.values(dataList), schoolURL }));
});

app.get('/transmutation', async (req, res) => {
  schoolID = "transmutation";
  schoolURL = "http://localhost:5173/client/school_" + schoolID + ".png";
  return res.send(renderTemplate('server/views/index.liquid', { title: 'Home', items: Object.values(dataList), schoolURL }));
});

app.get('/spell/:index/', async (req, res) => {
  const index = req.params.index;
  console.log(index);

  const spells = await fetch("https://www.dnd5eapi.co/api/2014/spells/" + index)
  const spellsData = await spells.json()

  return res.send(renderTemplate('server/views/detail.liquid', { title: `Detail page for ${index}`, spellsData}));
});

const renderTemplate = (template, data) => {
  const templateData = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    ...data
  };

  return engine.renderFileSync(template, templateData);
};