let collectExHibition = '';
let memberCollect = [];
let filterMemberCollect = [];
let userID = window.localStorage.getItem('userID')
let userName = window.localStorage.getItem('user');
let _data = {};

function heartID(el) {
    //console.log(el);   //可以得到點的展覽ID
    // 北部全部
    fetch('http://20.249.62.237/api/ExHibition/?id=5')
        .then(function (response) {
            return response.json()
        })
        .then(function (myJson) {
            myJson.forEach(element => {
                if (el == element.eId) {
                    collectExHibition = element.eName
                    //================
                    //得到的值加進陣列
                    // memberCollect.push(collectExHibition)
                    // //篩選掉重複的值
                    // filterMemberCollect=  memberCollect.filter( (collectExHibition,pos)=>memberCollect.indexOf(collectExHibition) == pos);
                    //得到user收藏的array
                    // console.log(filterMemberCollect.toString());  
                    //================
                    _data = {
                        "mId": userID,
                        "mName": userName,
                        "eId": el,
                        "eName": collectExHibition
                    }

                }

            })
        })

    fetch('http://20.249.62.237/api/Favorite', {
        method: "POST",
        body: JSON.stringify(_data),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(err => console.log(err));

}






//藝文活動北部 All展覽 tExHibition db
fetch(' http://20.249.62.237/api/ExHibition/?id=5')
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {

        const table = document.querySelector('#showInfoNorth')

        let html = ''
        let subStartDate = '';
        let subEndDate = '';

        myJson.forEach(element => {
            if (element.eStartTime.length > 10 || element.eEndTime.length > 10) {
                subStartDate = element.eStartTime.slice(0, 10)
                subEndDate = element.eEndTime.slice(0, 10)
            }
            html += `
                            <div class="container">
                                <div class="column">
                                    <div class="divPic">
                                        <a href="#"><img src="${element.eImage1}"></a>
                                        <img src="./Images/emptyheart.png" class="heart" onclick="heartID(${element.eId})">
                                    </div>
                                    <div class="col-12">
                                        <p>展演名稱<i class="fi fi-brands-patreon"></i>${element.eName}</p>
                                        <p>場館名稱<i class="fi fi-brands-patreon"></i>${element.vVenue}</p>
                                        <p>展演類型<i class="fi fi-brands-patreon"></i>${element.eGenre}</p>
                                        <p>開始日期<i class="fi fi-brands-patreon"></i>${subStartDate}</p>
                                        <p>結束日期<i class="fi fi-brands-patreon"></i>${subEndDate}</p>
                                        <p>展演時間<i class="fi fi-brands-patreon"></i>${element.eTime}</p>
                                        <p>展演票價<i class="fi fi-brands-patreon"></i>${element.ePrice}</p>
                                        <p>購票連結<i class="fi fi-brands-patreon"></i><a href="${element.eLink}" title="前往購票">${element.eLink}</a></p>
                                        <hr>
                                    </div>
                                </div>
                             </div>
                            `;

            let arr = [];
            arr.push(element.eName)
            arr.toString()





        });
        table.innerHTML += html;


        
        $(".heart").click(function () {
            $(this).attr('src', './Images/heart.png');
        });

        // $(".heart").dblclick(function () {
        //     $(this).attr('src', './Images/emptyheart.png');
        // });

});



//=========================================================
// function cancelHeartId(el) {
//     fetch('http://20.249.62.237/api/ExHibition/?id=5')
//         .then(function (response) {
//             return response.json()
//         })
//         .then(function (myJson) {
//             myJson.forEach(element => {

//                 if (el == element.eId) {
//                     collectExHibition = element.eName
//                     // 這邊要作移除陣列
//                     filterMemberCollect = filterMemberCollect.filter(function (item) {
//                         return item !== collectExHibition
//                     })
//                     //得到user收藏的array  若有移除
//                     console.log(`${filterMemberCollect.toString()}`);
//                     // filterMemberCollect可以存入資料庫

//                 }
//             })
//         })
// }
