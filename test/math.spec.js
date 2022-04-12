const assert = require('assert');
const Math = require('../src/math.js');
const expect = require('chai').expect; //trabalhando com chai
const sinon = require('sinon');

let value = 0;

describe('Math class', function() { //descreve os seus testes
    //hooks
    this.beforeEach(function() { // para cada it ele executa value=0 antes de iniciar o teste do it.
        value = 0;
    }) //existe tbm o before, after e afterEach para o hooks.

    it('Sum two numbers', function(done) { //descrever o comportamento esperado da class
        const math = new Math();
        //this.timeout(3000); //o tempo maximo q espera é 2500, porém consegue aumentar utilizando funções
        //do mocha, é recomendado utilizar function em vez de arrow por causa da referencia do this.
        value = 5;
        //sincrono
        //assert.equal(math.sum(5,5), 10); //Para n precisar disparar o erro de forma manual com throw new por exemplo.
        //assincrono
        math.sum(5, 5, value => {
            //expect(value).to.equal(10); //faz mesma coisa que o assert embaixo, porém mais legível.
            assert.equal(value, 10);
            done(); //serve para esperar a promisse retornar e verificar se o teste deu certo, pois ele
            //para o caso de 15 consta como certo o teste e depois exibe o erro para assincrono.
        });
    });

    it('Multiply two numbers', function() { //it.only() executa apenas aquele teste. Ou então o .skip() para pular ele.
        const math = new Math();
        //expect(math.multiply(value, 5)).to.equal(0); //faz mesma coisa que o assert embaixo, porém mais legível.
        assert.equal(math.multiply(value, 5), 0);
    }); 
    //expect(obj).to.have.property('name');// quer q um obj tenha a propriedade nome
    //expect(obj).to.have.property('name').equal('caio');// quer q um obj tenha a propriedade nome igual caio
    //expect(obj).to.deep.equal(obj2);// faz comparação profunda de todos valores dos objetos

    //desenvolvendo códigos com sinon
    //serve para garantir que um método foi chamado. Ex:
    it.only('Calls res with sum and index values', function() {
        const req = {};
        const res = {
            load: sinon.spy()
        };
        //para espiar uma função já existente
        //sinon.spy(res, 'load'); em que load é load: function load(){}
        //sinon.stub(res, 'load').returns('xpto'); //substitui o método load chamado pelo xpto
        //res.restore(); retorna o método ao normal.
        const math = new Math();
        math.printSum(req, res, 5, 5);
        expect(res.load.calledOnce).to.be.true;
        expect(res.load.args[0][0]).to.equal('index');
        expect(res.load.args[0][1]).to.equal(10);
    })
});