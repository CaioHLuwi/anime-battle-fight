let ally = new Nezuko();
let enemy = new Tomioka();
let statusAlly = document.querySelector('#ally-status');
let statusEnemy = document.querySelector('#enemy-status');
let characterElements = document.querySelector('.scenario-char');

let phase = new Phase(
    ally,
    enemy,
    statusAlly,
    statusEnemy,
    characterElements
)

phase.start();