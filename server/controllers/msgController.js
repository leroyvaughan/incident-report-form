

const returnObj = function (mailgunObj) {
    const self = this;

    const _mailgunTest = (req, res) => {
        // console.log("mailgunTest()...");

        const data = require('../lib/data/index')();

        mailgunObj.sendMail(data.sampleReport1)
        .then((resp) => {
            console.log(resp);
            res.status(200).json(resp);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(err);
        });
    };
    self.mailgunTest = _mailgunTest;



    const _sendFeedback = (req, res) => {
        console.log("sendFeedback()...");

        const body = req.body;

        if (!body) {
            return res.status(500).send('Post Data is null!');
        }
        else {
            const feedbackObj = require("../lib/feedbackObj")(mailgunObj);

            feedbackObj.saveFeedback(body)
                .then(() => {
                    return res.status(200).send();
                })
                .catch((err) => {
                    return res.status(500).send(err);
                });
        }
    };
    self.sendFeedback = _sendFeedback;


    return self;
}




module.exports = (param) => {
    return new returnObj(param);
}