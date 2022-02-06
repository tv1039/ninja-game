//FPS = for,while,setinterval,requestAnimationFrame 반복문 사용

//최소넓디 1280 넓이 제작

//필요한 키코드만 keyvalue에 추가 // 키와 벨류값을 이중으로 다루기
const key = {
	keyDown : {},
	keyValue : {
		32: 'attack',
		37: 'left',
		39: 'right'
	}
}

const gameProp = {
	//화면의 넓이
	screenWidth : window.innerWidth,
	screenHeight : window.innerHeight
}
//이동, 키눌림 딜레이 방지 (재귀호출)
const renderGame = () => {
	//초당 약 60 FPS로 계속 호출 (키 값의 상태들을 체크하고 히어로의 움직임 값을 체크하고 변경해주면서 딜레이 없이 재생)
	hero.keyMotion();
	window.requestAnimationFrame(renderGame);
	// console.log('call request'); 무한 반복 되는지 확인

}

const windowEvent = () => {
	window.addEventListener('keydown', e => {
		// console.log(key.keyValue[e.which]);
		key.keyDown[key.keyValue[e.which]] = true;
		// console.log(key.keyDown);
		// console.log('키눌림:' + e.which);
	})

	window.addEventListener('keyup', e => {
		key.keyDown[key.keyValue[e.which]] = false;
		// console.log(key.keyDown);
		// console.log('키업:' + e.which);
	})
}
//이미지 사전에 로드하기 (깜빡임 방지)
const loadImg = () => {
	const preLoadImgSrc = ['../images/ninja_attack.png', '../images/ninja_run.png'];
	//반복문 생성
	preLoadImgSrc.forEach( arr => {
		const img = new Image(); //이미지 객체 인스턴스 생성
		img.src = arr; //이미지 속성에 추가
	})
}
//class.js에 인스턴스 생성
let hero;
//프로그램에 실행할 함수 실행
const init = () => {
	hero = new Hero('.hero');
	loadImg();
	windowEvent();
	renderGame();
}

//모든 요소 로드후 게임 실행
window.onload = () => {
	init();
}