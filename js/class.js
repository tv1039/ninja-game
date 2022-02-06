//생성자 & 모션함수 생성
class Hero {
    constructor(el){
        this.el = document.querySelector(el);
        // console.log(this.el);
        //Hero 이동 모션 (이동할 거리, 이동 속도 구하기)
        this.moveX = 0;
        this.speed = 16;

        // 히어로의 탑 값(머리에서 발까지의 값 히어로 자체)
        // console.log(window.innerHeight - this.el.getBoundingClientRect().top)
        // 히어로의 바텀 값(아래의 기준값)
        // console.log(window.innerHeight - this.el.getBoundingClientRect().top - this.el.getBoundingClientRect.height)
    }
//키눌림 이벤트 체크 후 조건문 생성 (달리는 모션)
    keyMotion(){
        if(key.keyDown['left']){
            this.el.classList.add('run');
            this.el.classList.add('flip');
            // console.log(this.position().left);
//이동
            this.moveX = this.moveX - this.speed;
        } else if(key.keyDown['right']){
            this.el.classList.add('run');
            this.el.classList.remove('flip');
            // console.log(this.position().right);
//이동
            this.moveX = this.moveX + this.speed;
            // console.log(this.moveX);
        } 
      
//공격 모션
        if(key.keyDown['attack']){
            this.el.classList.add('attack');
			new Bullet();
        }

//멈춤 동작
        if(!key.keyDown['left'] && !key.keyDown['right']){
            this.el.classList.remove('run');
        }

        if(!key.keyDown['attack']){
            this.el.classList.remove('attack');
        }
        

        this.el.parentNode.style.transform = `translateX(${this.moveX}px)`;
    }
    //el의 위치 알아내기
    //화면 해상도의 비율이 달라질 때 흐트러짐 방지 (위치 기준 잡기) 거진 아래로 기준을 잡음
    // getBoundingClientRect()
    position() {
        return {
            left: this.el.getBoundingClientRect().left,
            right: this.el.getBoundingClientRect().right,
            top: gameProp.screenHeight - this.el.getBoundingClientRect().top,
            bottom: gameProp.screenHeight - this.el.getBoundingClientRect().top - this.el.getBoundingClientRect().height
            }

        }
        //수리검이 나타날 위치 정하기 (히어로의 위치값)
        size() {
            return{
                width: this.el.offsetWidth,
                height: this.el.offsetHeight 
            }
    }
}

//수리검 생성
class Bullet {
    constructor() {
        this.parentNode = document.querySelector('.game');
        this.el = document.createElement('div');
        this.el.className = 'hero_bullet';
        //수리검 위치
        this.x = 0;
        this.y = 0;
        this.init();
    }
    init() {
        //수리검이 나타날 위치 정하기 (히어로의 위치값 / 2)
        // console.log(hero.size())
        this.x = hero.position().left + hero.size().width / 2;
        this.y = hero.position().bottom - hero.size().height / 2;
        // console.log('x:' + this.x);
        // console.log('y:' + this.y);
        this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
        this.parentNode.appendChild(this.el);
    }
}


