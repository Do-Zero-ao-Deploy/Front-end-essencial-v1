// Versão melhorada em https://stackoverflow.com/a/45387558/11716408

(function () {
    if (!window.oldConsoleLog) {
        window.oldConsoleLog = console.log;
    }

    var logger = document.getElementById('log');
    console.log = function () {
        window.oldConsoleLog(...arguments)

        for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] == 'object') {
                logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(arguments[i], undefined, 2) : arguments[i]) + '<br />';
            } else {
                logger.innerHTML += arguments[i] + '<br />';
            }
        }
    }
})();
