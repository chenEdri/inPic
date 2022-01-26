'use strict';

var gQuests;
var gCurrQuestIdx;
var gIsChecking;

function initGame() {
    document.querySelector('.game-button').style.display = 'none';
    gCurrQuestIdx = 0;
    gQuests = createQuests();
    gIsChecking = false;
    renderQuest();
}

function checkAnswer(optIdx) {
    if (+optIdx === gQuests[gCurrQuestIdx].correctOptIdx && !gIsChecking) {
        gIsChecking = true;
        gCurrQuestIdx++;
        document.querySelectorAll('[data-id]')[optIdx].style.backgroundColor = '#5c5';
        new Audio('sound/correct.wav').play();
        if (gCurrQuestIdx === gQuests.length) {
            setTimeout(function endGame() {
                document.querySelector('.game-button').style.display = 'block';
                document.querySelector('.quest-img').src = 'assets/monsters_inc.png';
                document.querySelector('.opts').innerHTML = '<span>You Won!</span>';
            }, 1500);
        } else {
            setTimeout(renderQuest, 1500);
        }

    }
    else if (!gIsChecking) {
        new Audio('sound/wrong.wav').play();
        shake(optIdx);
    }
}

function renderQuest() {
    gIsChecking = false;
    document.querySelector('.quest-img').src = 'assets/' + gCurrQuestIdx + '.png';
    var strHTML = '';
    var currQst = gQuests[gCurrQuestIdx]
    for (var i = 0; i < currQst.opts.length; i++) {
        strHTML +=
            `<span data-id="${i}"  onclick="checkAnswer('${i}')">
        ${currQst.opts[i]}
        </span>`;
    }
    document.querySelector('.opts').innerHTML = strHTML;
}

function createQuests() {
    var quests = [
        {
            id: 100,
            opts: ['Sulley has no tail', 'Sulley has a tail'],
            correctOptIdx: 1
        },
        {
            id: 101,
            opts: ['Mike raises his right hand', 'Mike raises his left hand'],
            correctOptIdx: 1
        },
        {
            id: 102,
            opts: ['Randall has 24 fingers', 'Randall has 18 fingers'],
            correctOptIdx: 0
        },
        {
            id: 103,
            opts: ['Boo wears socks', 'Boo doesn\'t wear socks'],
            correctOptIdx: 0
        },
        {
            id: 104,
            opts: ['Roz holds a folder with the letter R', 'Roz holds a folder with the letter M'],
            correctOptIdx: 1
        }
    ];
    return quests;
}

function shake(optIdx) {
    var elOpt = document.querySelectorAll('[data-id]')[optIdx];
    elOpt.style.backgroundColor = '#e55';
    elOpt.style.transform = 'translateX(2em)'
    setTimeout(function shakeLeft() {
        elOpt.style.transform = 'translateX(-2em)';
        setTimeout(function shakeRight() {
            elOpt.style.transform = 'translateX(1em)';
            setTimeout(function shakeLeft() {
                elOpt.style.transform = 'translateX(-1em)';
                setTimeout(function shakeRight() {
                    elOpt.style.transform = 'translateX(0.5em)';
                    setTimeout(function shakeLeft() {
                        elOpt.style.transform = 'translateX(-0.5em)';
                        setTimeout(function shakeRight() { elOpt.style.transform = 'translateX(0)'; }, 100)
                    }, 100)
                }, 100)
            }, 100)
        }, 100)
    }, 100);
}