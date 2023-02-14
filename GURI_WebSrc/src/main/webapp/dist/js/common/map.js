// dom decalre --------------------------------------

// 맵 ui 부모 요소
const mapUiBox = document.querySelector(".uiBox");

// 맵 좌우하단 ui 여닫버튼
const mapUiToggleBtn = document.querySelectorAll(`
    .uiBox > .leftBox > .toggleBtn,
    .uiBox > .centerBox > .footerBox > .toggleBtn,
    .uiBox > .rightBox > .toggleBtn
`);

// 맵 우하단 지도방식 선택박스 여닫버튼
const mapTypeBoxToggleBtn = document.querySelector(".mapTypeBox .toggleBtn");

// 우측 ui 리스트 온오프 (데이터필드, 심볼설정...)
const setList = document.querySelector(".uiBox .rightBox .setList");
const setListBtns = document.querySelectorAll(
    ".uiBox .rightBox .setList .setListBtn"
);

// 우측 ui 심볼설정 select
const simbolTypeSelect = document.querySelector('.simbolType');

// add event --------------------------------------

// 맵 좌우하단 ui 여닫버튼
mapUiToggleBtn.forEach(function (v, i) {
    v.addEventListener("click", function () {
        let btnParentClass =
            i === 0
                ? "leftOn"
                : i === 1
                ? "footerOn"
                : i === 2
                ? "rightOn"
                : null;
        mapUiBox.classList.toggle(btnParentClass);
    });
});

// 우측 ui 리스트 온오프 (데이터필드, 심볼설정...)
setListBtns.forEach(function (v, i) {
    v.addEventListener("click", function () {
        for (let i = 0; i < setList.children.length; i++) {
            setList.children[i].classList.remove("on");
        }
        setList.children[i].classList.add("on");
    });
});

document
    .querySelector(".openRightBoxBtn")
    .addEventListener("click", function () {
        if (!mapUiBox.classList.contains("rightOn")) {
            mapUiBox.classList.add("rightOn");
        }
    });
