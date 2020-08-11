window.onload = function () {

    // 三连棋谱
    // 1  2  3  4
    // 5  6  7  8
    // 9 10 11 12
    //13 14 15 16
    var arr1 = [1, 2, 3]
    var arr2 = [2, 3, 4]
    var arr3 = [5, 6, 7]
    var arr4 = [6, 7, 8]
    var arr5 = [9, 10, 11]
    var arr6 = [10, 11, 12]
    var arr7 = [13, 14, 15]
    var arr8 = [14, 15, 16]

    var arr9 = [1, 5, 9]
    var arr10 = [5, 9, 13]
    var arr11 = [2, 6, 10]
    var arr12 = [6, 10, 14]
    var arr13 = [3, 7, 11]
    var arr14 = [7, 11, 15]
    var arr15 = [4, 8, 12]
    var arr16 = [8, 12, 16]

    var arr17 = [1, 6, 11]
    var arr18 = [6, 11, 16]
    var arr19 = [5, 10, 15]
    var arr20 = [2, 7, 12]
    var arr21 = [3, 6, 9]
    var arr22 = [4, 7, 10]
    var arr23 = [7, 10, 13]
    var arr24 = [8, 11, 14]


    // 子集检查函数
    function check(n, l) {
        // return n.every(v => l.includes(v))
        if (!Array.prototype.subsetTo) {
            Array.prototype.subsetTo = function (k) {
                return this.every(v => k.includes(v))
            }
        }
        return n.subsetTo(l)
    }

    // 检查三连棋谱是否为当前棋谱数组的子集
    function checkTie(l) {
        let result = true;
        for (let i = 1; i < 25; i++) {
            if (check(eval('arr' + i), l)) {
                result = false
            }
        }
        return result;
    }


    // 用于点击棋盘格子响应
    var board = document.getElementsByClassName("box1")
    // 用于出现黑白棋图片
    var img = document.getElementsByTagName("img")
    //防止重复下子
    var a = /\/none.jpg\b/
    // 检查胜利用的父集
    var checkBwin = []
    var checkWwin = []

    var whiteOrblack = 0

    // 每个格子的单击响应



    for (let i = 0; i < board.length; i++) {


        board[i].onclick = function () {

            // 检测当前该下黑子还是白子，并将格子的编号加入到检查胜利用的父集中
            if (whiteOrblack % 2 == 0 && a.test(img[i].src)) {

                img[i].src = "./black.jpg";
                checkBwin.push(i + 1)
                whiteOrblack++

            }
            else if (whiteOrblack % 2 == 1 && a.test(img[i].src)) {

                img[i].src = "./white.jpg";
                checkWwin.push(i + 1)
                whiteOrblack++

            }


            if (!checkTie(checkBwin)) {

                alert("White Win!!!")
                window.location.reload()

            } else if (!checkTie(checkWwin)) {

                alert("Black Win!!!")
                window.location.reload()

            } else if (whiteOrblack == 16) {

                alert("Draw")
                window.location.reload()
            }


        }

    }

}


