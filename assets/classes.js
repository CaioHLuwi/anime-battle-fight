class Character {
    constructor(name){
        this.name = name;
    }

    _life = 0;
    maxLife = 1;
    power = 1;
    defense = 1;

    get life() {
        return this._life;
    }

    set life(newLife) { 
        this._life = newLife < 0 ? 0 : newLife;
    }
}

class Nezuko extends Character {
    constructor(){
        super('Nezuko');
        this.life = 150;
        this.power = 20;
        this.defense = 15;
        this.maxLife = this.life;
    }
}

class Tomioka extends Character {
    constructor() {
        super('Gyu Tomioka');
        this.life = 150;
        this.power = 18;
        this.defense = 15;
        this.maxLife = this.life;
    }
}

class Phase {
    constructor(ally, enemy, allyStatus, enemyStatus, characterElements, log) { // Traz todos os elementos do HTML para serem selecionados pelos métodos.
        this.ally = ally;
        this.enemy = enemy;
        this.allyElement = allyStatus;
        this.enemyElement = enemyStatus;
        this.characterElements = characterElements;
        this.log = log;
    }
    

    start(){
        this.update();

        this.characterElements.querySelector('#btn-attack-ally').addEventListener('click', () => this.doAttack(this.ally, this.enemy));

        this.characterElements.querySelector('#btn-attack-enemy').addEventListener('click', () => this.doAttack(this.enemy, this.ally));
        
    }

    update(){

        let audioWins = new Audio('/assets/sounds/victory_sound.mp3');
        // Verifica se algum dos personagens venceu a luta.
        if(this.ally.life <= 0){
            this.log.addMessage(`----- ${this.enemy.name} venceu! -----`);
            this.log.listElement.children[0].classList.add('wins'); // Adiciona a classe "wins" para deixar o texto verde.
            audioWins.play();
        } else if (this.enemy.life <= 0){
            this.log.addMessage(`----- ${this.ally.name} venceu! -----`)
            this.log.listElement.children[0].classList.add('wins'); // Adiciona a classe "wins" para deixar o texto verde.
            audioWins.play();
        }
        
        // Trocando nome de cada um dos personagens
        this.allyElement.querySelector('#nameCharacter1').innerText = this.ally.name;

        this.enemyElement.querySelector('#nameCharacter2').innerText = this.enemy.name;

        // Define a vida na barra de vida
        this.allyElement.querySelector('.bar').style.width = `${(this.ally.life / this.ally.maxLife) * 100}%`;

        this.enemyElement.querySelector('.bar').style.width = `${(this.enemy.life / this.enemy.maxLife) * 100}%`;

        // Definir os atributos no css
        this.allyElement.querySelector('#life').innerText = ally.life.toFixed(0);
        this.allyElement.querySelector('#power').innerText = ally.power;
        this.allyElement.querySelector('#defense').innerText = ally.defense;

        this.enemyElement.querySelector('#life').innerText = enemy.life.toFixed(0);
        this.enemyElement.querySelector('#power').innerText = enemy.power;
        this.enemyElement.querySelector('#defense').innerText = enemy.defense;
    }

    doAttack(attacking, attacked){

        if(attacking.life <= 0 || attacked.life <= 0) {
            console.log('Um dos dois personagens morreu.');
            return
        }

        let powerFactor = (Math.random() * 2).toFixed(2);
        let defenseFactor = (Math.random() * 2).toFixed(2);

        let actualPower = attacking.power * powerFactor; // Número aleatório multiplicando o poder atual do atacante para dar randomização ao jogo
        let actualDefense = attacked.defense * defenseFactor; // Número aleatório multiplicando a defesa atual do defensor para dar randomização ao jogo

        let powerConverted = Math.round(Number(actualPower));
        let defenseConverted = Math.round(Number(actualDefense));
        
        if(powerConverted > defenseConverted) {
            attacked.life -= actualPower;
            this.log.addMessage(`${attacking.name} causou ${powerConverted} de dano`);
        } else {
            this.log.addMessage(`${attacking.name} lançou um ataque e ${attacked.name} conseguiu <strong> defender. <strong>`);
        }

        //TODO: Implementar um log para receber todos esses registros e melhores imagens / sons no projeto

        this.update()
    }
}

class Log {
    list = [];

    constructor(listElement){
        this.listElement = listElement;
    }

    addMessage(message){
        this.list.unshift(message);
        this.newItem();
    }

    newItem(){
        this.listElement.innerHTML = '';

        for(let i in this.list){
            this.listElement.innerHTML += `<li class='log-item'> ${this.list[i]}<li>`
        }
    }
}