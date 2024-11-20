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
    constructor(ally, enemy, allyStatus, enemyStatus, characterElements) { // Traz todos os elementos do HTML para serem selecionados pelos métodos.
        this.ally = ally;
        this.enemy = enemy;
        this.allyElement = allyStatus;
        this.enemyElement = enemyStatus;
        this.characterElements = characterElements;
    }
    

    start(){
        this.update();

        this.characterElements.querySelector('#btn-attack-ally').addEventListener('click', () => this.doAttack(this.ally, this.enemy));

        this.characterElements.querySelector('#btn-attack-enemy').addEventListener('click', () => this.doAttack(this.enemy, this.ally));
        
    }

    update(){
        // Trocando nome de cada um dos personagens
        this.allyElement.querySelector('#nameCharacter1').innerText = this.ally.name;

        this.enemyElement.querySelector('#nameCharacter2').innerText = this.enemy.name;

        // Define a vida na barra de vida
        this.allyElement.querySelector('.bar').style.width = `${(this.ally.life / this.ally.maxLife) * 100}%`;

        this.enemyElement.querySelector('.bar').style.width = `${(this.enemy.life / this.enemy.maxLife) * 100}%`;

        // Definir os atributos no css
        this.allyElement.querySelector('#life').innerText = ally.life.toFixed(2);
        this.allyElement.querySelector('#power').innerText = ally.power;
        this.allyElement.querySelector('#defense').innerText = ally.defense;

        this.enemyElement.querySelector('#life').innerText = enemy.life.toFixed(2);
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

        if(actualPower > actualDefense) {
            attacking.life -= actualPower
            console.log(`${attacking.name} conseguiu atacar ${attacked.name} e causou ${actualPower}`);
        } else {
            console.log(`${attacked.name} conseguiu defender.`)
        }

        //TODO: Implementar um log para receber todos esses registros e melhores imagens / sons no projeto.

        this.update()
    }
}