//생성자 & 모션함수 생성
class Hero {
    constructor(el){
        this.el = document.querySelector(el);
        // console.log(this.el);
        //Hero 이동 모션 (이동할 거리, 이동 속도 구하기)
        this.moveX = 0;
        this.speed = 16;
        //히어로의 방향값 초기 오른쪽을 보게 고정
        this.direction = 'right';

        // 히어로의 탑 값(머리에서 발까지의 값 히어로 자체)
        // console.log(window.innerHeight - this.el.getBoundingClientRect().top)
        // 히어로의 바텀 값(아래의 기준값)
        // console.log(window.innerHeight - this.el.getBoundingClientRect().top - this.el.getBoundingClientRect.height)
    }
//키눌림 이벤트 체크 후 조건문 생성 (달리는 모션)
    keyMotion(){
        if(key.keyDown['left']){
            this.direction = 'left';
            this.el.classList.add('run');
            this.el.classList.add('flip');
            // console.log(this.position().left);
//이동
            //캐릭터 화면 안넘어가게 하기
            this.moveX = this.moveX <= 0 ? 0 : this.moveX - this.speed;
        } else if(key.keyDown['right']){
            this.direction = 'right';
            this.el.classList.add('run');
            this.el.classList.remove('flip');
            // console.log(this.position().right);
//이동
            this.moveX = this.moveX + this.speed;
            // console.log(this.moveX);
        } 
      
//공격 모션
        if(key.keyDown['attack']){
            if(!bulletComProp.launch){
            this.el.classList.add('attack');
			            // 공격키 누를시 push메소드 이용 수리검 인스턴스를 배열에 추가
                        bulletComProp.arr.push(new Bullet());
                        // console.log(bulletComProp.arr.length);

                        bulletComProp.launch = true;
            }
        }

//멈춤 동작
        if(!key.keyDown['left'] && !key.keyDown['right']){
            this.el.classList.remove('run');
        }

        if(!key.keyDown['attack']){
            this.el.classList.remove('attack');
            bulletComProp.launch = false;

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
        //수리검의 스피드와 이동거리
        this.speed = 30;
        this.distance = 0;
        //수리검 생성시 히어로의 방향에 따라 생성
        this.bulletDirection = 'right';
        this.init();
    }
    init() {
        //수리검이 나타날 위치 정하기 (히어로의 위치값 / 2)
        // console.log(hero.size())
        //히어로의 위차가 왼쪽을 보고 있다면 왼쪽의 값과 일치시키고 아닐시 오른쪽 값
        this.bulletDirection = hero.direction === 'left' ? 'left' : 'right';
        //히어로의 위치값이 아닌 이동한 값에 더하여 수리검이 생성되게 함
        this.x = this.bulletDirection === 'right' ? hero.moveX + hero.size().width / 2 : hero.moveX - hero.size().width / 2; //수리검 캐릭터 뒤편에서 생성
        this.y = hero.position().bottom - hero.size().height / 2;
        //수리검 생성시 히어로의 위치에서 나오게 설정
        this.distance = this.x;
        // console.log('x:' + this.x);
        // console.log('y:' + this.y);
        this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
        this.parentNode.appendChild(this.el);
    }
    //수리검의 이동모션을 위한 함수
     //이동거리와 속도 더함
    moveBullet() {
        let setRotate = '';
        //수리검을 생성할 떄의 방향으로 체크되도록 hero.direction이 아닌 bulletDirection으로 변경
        if(this.bulletDirection === 'left'){
        this.distance -= this.speed;
        setRotate = 'rotate(180deg)';
        } else {
            this.distance += this.speed;
        }
                //하단으로 발사되기 때문에 y값까지 포함, 좌측을 볼 시 수리검 위치 대칭
                this.el.style.transform = `translate(${this.distance}px, ${this.y}px) ${setRotate}`;
                this.crashBullet();

    }
//수리검의 위치값을 알아내기 위에 히어로 위치값과 동일
    position() {
        return {
            left: this.el.getBoundingClientRect().left,
            right: this.el.getBoundingClientRect().right,
            top: gameProp.screenHeight - this.el.getBoundingClientRect().top,
            bottom: gameProp.screenHeight - this.el.getBoundingClientRect().top - this.el.getBoundingClientRect().height
            }
        }
        //화면밖으로 나갈시 수리검 이동 멈춤
        crashBullet() {
            if(this.position().left > gameProp.screenWidth || this.position().right < 0){
                this.el.remove();
            }  
        }
}


