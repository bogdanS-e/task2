describe("checkPrice", function () {
    it("Находит цену обработанного текста на украинском и русском языке. Текст из textarea", function () {
        assert.equal(checkPrice({ totalLength: 21, translateToLang: 'ua' }), '50.00');
        assert.equal(checkPrice({ totalLength: 593, translateToLang: 'rus' }), '50.00');
        assert.equal(checkPrice({ totalLength: 1702, translateToLang: 'ua' }), '85.10');
        assert.equal(checkPrice({ totalLength: 3347, translateToLang: 'rus' }), '167.35');
        assert.equal(checkPrice({ totalLength: 938818, translateToLang: 'ua' }), '46940.90');
    });
    it("Находит цену обработанного текста на украинском и русском языке. Текст из файла", function () {
        assert.equal(checkPrice({ totalLength: 21, fileType: '.txt', translateToLang: 'rus' }), '50.00');
        assert.equal(checkPrice({ totalLength: 593, fileType: '.doc', translateToLang: 'ua' }), '50.00');
        assert.equal(checkPrice({ totalLength: 1702, fileType: '.txt', translateToLang: 'ua' }), '102.12');
        assert.equal(checkPrice({ totalLength: 1702, fileType: '.docx', translateToLang: 'ua' }), '85.10');
        assert.equal(checkPrice({ totalLength: 3347, fileType: '.pdf', translateToLang: 'ua' }), '200.82');
        assert.equal(checkPrice({ totalLength: 938818, fileType: '.docx', translateToLang: 'rus' }), '46940.90');
    });
    it("Находит цену обработанного текста на английском языке. Текст из textarea", function () {
        assert.equal(checkPrice({ totalLength: 21, translateToLang: 'en' }), '120.00');
        assert.equal(checkPrice({ totalLength: 593, translateToLang: 'en' }), '120.00');
        assert.equal(checkPrice({ totalLength: 1702, translateToLang: 'en' }), '204.24');
        assert.equal(checkPrice({ totalLength: 3347, translateToLang: 'en' }), '401.64');
        assert.equal(checkPrice({ totalLength: 843486, translateToLang: 'en' }), '101218.32');
    });
    it("Находит цену обработанного текста на английском языке. Текст из файла", function () {
        assert.equal(checkPrice({ totalLength: 21, fileType: '.txt', translateToLang: 'en' }), '120.00');
        assert.equal(checkPrice({ totalLength: 593, fileType: '.doc', translateToLang: 'en' }), '120.00');
        assert.equal(checkPrice({ totalLength: 1702, fileType: '.txt', translateToLang: 'en' }), '245.09');
        assert.equal(checkPrice({ totalLength: 1702, fileType: '.docx', translateToLang: 'en' }), '204.24');
        assert.equal(checkPrice({ totalLength: 3347, fileType: '.pdf', translateToLang: 'en' }), '481.97');
        assert.equal(checkPrice({ totalLength: 843486, fileType: '.txt', translateToLang: 'en' }), '121461.98');
    });
});
describe("checkTerm", function () {
    it("Находит время (рабочие часы) на обработку текста на украинском и русском языке. Текст из textarea", function () {
        const dateNow = new Date();
        dateNow.setHours(dateNow.getHours() + 1);
        assert.equal(checkTerm({ totalLength: 21, translateToLang: 'ua' }), 1);
        assert.equal(checkTerm({ totalLength: 593, translateToLang: 'rus' }), 1);
        assert.equal(checkTerm({ totalLength: 1702, translateToLang: 'ua' }), 2);
        assert.equal(checkTerm({ totalLength: 3347, translateToLang: 'rus' }), 4);
        assert.equal(checkTerm({ totalLength: 938818, translateToLang: 'ua' }), 705);
    });
    it("Находит время (рабочие часы) на обработку текста на украинском и русском языке. Текст из файла", function () {
        const dateNow = new Date();
        dateNow.setHours(dateNow.getHours() + 1);
        assert.equal(checkTerm({ totalLength: 21,fileType: '.txt', translateToLang: 'ua' }), 1);
        assert.equal(checkTerm({ totalLength: 593,fileType: '.doc', translateToLang: 'rus' }), 1);
        assert.equal(checkTerm({ totalLength: 1702, fileType: '.pdf',translateToLang: 'ua' }), 3);
        assert.equal(checkTerm({ totalLength: 3347, fileType: '.docx',translateToLang: 'rus' }), 4);
        assert.equal(checkTerm({ totalLength: 938818, fileType: '.xml',translateToLang: 'ua' }), 846);
    });
    it("Находит время (рабочие часы) на обработку текста на английском языке. Текст из textarea", function () {
        const dateNow = new Date();
        dateNow.setHours(dateNow.getHours() + 1);
        assert.equal(checkTerm({ totalLength: 21, translateToLang: 'en' }), 1);
        assert.equal(checkTerm({ totalLength: 593, translateToLang: 'en' }), 3);
        assert.equal(checkTerm({ totalLength: 1702, translateToLang: 'en' }), 6);
        assert.equal(checkTerm({ totalLength: 3347, translateToLang: 'en' }),11);
        assert.equal(checkTerm({ totalLength: 938818, translateToLang: 'en' }), 2820);
    });
    it("Находит время (рабочие часы) на обработку текста на английском языке. Текст из файла", function () {
        const dateNow = new Date();
        dateNow.setHours(dateNow.getHours() + 1);
        assert.equal(checkTerm({ totalLength: 21,fileType: '.txt', translateToLang: 'en' }), 1);
        assert.equal(checkTerm({ totalLength: 593,fileType: '.doc', translateToLang: 'en' }), 3);
        assert.equal(checkTerm({ totalLength: 1702, fileType: '.pdf',translateToLang: 'en' }), 7);
        assert.equal(checkTerm({ totalLength: 3347, fileType: '.docx',translateToLang: 'en' }), 11);
        assert.equal(checkTerm({ totalLength: 938818, fileType: '.xml',translateToLang: 'en' }), 3384);
    });
});
describe("getDate", function () {
    it("Переводит рабочие часы в дату, когда будет готова работа", function () {
        assert.equal(getDate(1), getDateTest(1));
        assert.equal(getDate(14), getDateTest(14));
        assert.equal(getDate(45), getDateTest(45));
        assert.equal(getDate(4555), getDateTest(4555));
    });
});


function getDateTest(totalTerm) {
    const date = new Date();
    let termCounter = totalTerm;
    let readyDate;
    do {
        if (date.getDay() >= 1 && date.getDay() <= 5) {
            if (date.getHours() >= 10 && date.getHours() < 19) {
                if (termCounter === 0) {
                    readyDate = date;
                    break;
                }
                termCounter -= 1;
                date.setHours(date.getHours() + 1);
            } else {
                date.setHours(date.getHours() + 1);
            }
        } else {
            date.setHours(date.getHours() + 1);
        }
    } while (true);
    const dateNow = new Date();
    let message = '';
    message = readyDate.getDate() + '.' + `${roundMonth(readyDate.getMonth() + 1)}.${readyDate.getFullYear() % 1000} ${roundMinutes(readyDate.getHours() + ':' + readyDate.getMinutes())}`;
    return message;
}