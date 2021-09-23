//인풋에 입력할 이름 리스트
var n_list = []

//입력 버튼을 누르면 사용자가 입력한 값이 list에 저장됨
function add() {
    var n = document
        .getElementById("input_name")
        .value;
    n_list.push(n);
    //display
    replace_name();
    //document.getElementById("r_content").innerHTML = data[1].contents;
}
//var str_data = JSON.stringify(data); console.log(data[1].contents);

//JSON데이터에 "OO"이라고 저장되어 있는 str을 사용자가 입력한 변수로 교체
function replace_name() {
  //OO이 존재해서 변수를 교환한 str을 넣을 데이터
  var replace_list = []
  //OO이 애초에 존재하지 않아 교환할 필요가 없는 데이터
  var origin_list = []
  
    //변수를 대입하기 위해 반복문을 돌며 "OO"을 찾는다
    for (var i = 0; i < data.length; i++) {
        var find_str = "OO";
        //"OO"가 있을 경우
        if (data[i].contents.indexOf(find_str) != -1) {
          //사용자가 마지막으로 넣은 이름의 값(리스트의 마지막 값)으로 대체한 후 
            var replaced_str = data[i].contents
                .replaceAll(find_str, n_list[n_list.length - 1]);
            //대체된 리스트에 해당 str 넣는다.
            replace_list.push(replaced_str);
            //"OO"값이 애초에 존재하지 않을 경우 origin_list에 넣는다
        } else if(data[i].contents.indexOf(find_str) == -1){
          origin_list.push(data[i].contents);
        }
    }
    //replace_list와 origin_list를 합칠 리스트
    var total_list = origin_list.concat(replace_list);
    // 랜덤으로 출력을 위함
    var random_int = Math.floor(Math.random() * total_list.length);
    console.log(total_list[random_int]);
    document.getElementById("r_content").innerHTML = total_list[random_int];
    document.getElementById("r_content").style.color = "black";
    
}

function copy() {
  var copy_text = document.getElementById("r_content");
  copy_text.select(); //인풋 컨트롤의 내용 전체 선택
  document.execCommand("copy"); //클립보드에 복사
  //console.log("복사되었습니다.");
  alert("복사되었어요!")
  copy_text.setSelectionRange(0, 0); //선택영역 초기화
  mention()
}

//textarea 높이 자동정렬해주는 함수
function resize(){
  var size = document.getElementById("r_content");
  //계속 높이가 더해지기만 하니까 초기화시킴
  size.style.height = "1px";
  size.style.paddingTop = "0px";
  //스크롤 높이에 따라 높이를 재정의하고
  size.style.height = size.scrollHeight + 'px';
  //그에 따라 패딩 탑을 재정의함으로 텍스트를 계속 중앙정렬함
  size.style.paddingTop = size.scrollHeight/2 + 'px';
  console.log(size.scrollHeight);
}

function mention(){
  document.getElementById('r_move').innerHTML = 
  "복사된 주접으로 편지를 쓸 수 있어요! <br> 편지를 쓰러 가 볼까요? 😉"
  +'<button id="move_button" onClick="location.href=\'write.html\'">편지 쓸래요!</button>';
  
}

//write page

//textarea에 글을 입력하면 textarea 높이가 늘어남
function resize_letter(){
  var size_1 = document.getElementById("input_letter");
  //계속 높이가 더해지기만 하니까 초기화시킴
  size_1.style.height = "1px";
  size_1.style.paddingTop = "0px";
  //스크롤 높이에 따라 높이를 재정의하고
  size_1.style.height = size_1.scrollHeight + 'px';
  //그에 따라 패딩 탑을 재정의함으로 텍스트를 계속 중앙정렬함
  size_1.style.paddingTop = size_1.scrollHeight/4 + 'px';
  size_1.style.paddingBottom = size_1.scrollHeight/10 + 'px';
  console.log(size_1.scrollHeight);
}

letter_list = [];

//letter_list에 편지 데이터를 저장하는 함수
function add_letter(){
  letter_item = document.getElementById("input_letter").value;
  letter_list.push(letter_item);
  console.log("add:"+letter_list);
}

function save_letter(){
  add_letter();
  //데이터 로컬로 저장하기
  localStorage.setItem("letter",JSON.stringify(letter_list));
  console.log("save:"+letter_list);
  load_letter()
}

function load_letter() {
    var t = localStorage.getItem("letter");
    letter_list2 = JSON.parse(t);
    display_letter();

    console.log("load:"+letter_list2);

}

function display_letter(){
  document.getElementById("list").innerHTML = ""

    for(var i=0; i < letter_list2.length; i++){
      document.getElementById("list").innerHTML += "<div class='list_items'><div class='list_nth'>"+ (i+1)+ "번째 편지</div>" + letter_list2[i]+"</div>";
    }
  
  console.log("display:"+letter_list2);
}

function mention2(){
  document.getElementById('w_move').innerHTML = 
  '<p>이곳에서 작성한 주접글을 확인할 수 있어요.</p>'
  +'<div id="del_box"><input id="del_id" placeholder="삭제할 번호를 입력하세요.">'
  +'<button class="del_btn" onclick="del_letter()">삭제</button>'
  +'<button class="del_btn" onclick="del_all()">리셋</button>'
  +'</div>'
}

function del_letter(){
  var del_item = document.getElementById('del_id').value;
  del_item = Number(del_item)-1;
  
  for(var i=0; i < letter_list2.length; i++){
    if(i === del_item){
      letter_list2.splice(i,1);
    }
  }
  localStorage.setItem("letter",JSON.stringify(letter_list2));
  console.log(letter_list2);
  display_letter();
}

//전체삭제 함수
function del_all(){
  for(var i=0; i < letter_list2.length; i++){
    letter_list2.splice(i,letter_list2.length);
    i--;
  }
  localStorage.setItem("letter",JSON.stringify(letter_list2));
  console.log(letter_list2);
  display_letter();
}

//joke_bear page
//gif바꾸는 함수
function change_gif(){
  var s = document.getElementById("dance").src;

  if(s == 'http://127.0.0.1:5500/20-web-dev/final/dance.gif'){
    document.getElementById("dance").src = "dance_2.gif"
  }else{
    document.getElementById("dance").src = "dance.gif"
  }
  
}


//check page

//편지 박스를 가져오는 함수
/*
function load_letter(){
  var t = localStorage.getItem("letter");
  if(t == null){
    letter_item = [];
    console.log("null");
  } else{
    letter_item = JSON.parse(t);
    console.log(letter_item);
  }
  display_letter();
}

function display_letter(){
  document.getElementById("list").innerHTML = "<p>"+letter_item+"</p>"
}
*/


//모달창 만들기
