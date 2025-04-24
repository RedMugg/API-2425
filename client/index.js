import './index.css';
import NodePersist from 'node-persist';

const storage = NodePersist;
storage.initSync();

console.log('Hello, world!');



var playerLevel = document.querySelector("#playerLevel");

playerLevel.addEventListener("change", () => {

  storage.setItem('playerLevel', playerLevel.value);
  console.log("joejoe");
});