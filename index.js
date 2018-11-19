/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';
const Alexa = require('alexa-sdk');
const APP_ID = 'amzn1.ask.skill.bace2106-1b3a-4124-bf65-0d3190af69e2';

const SKILL_NAME = 'Dog Parks';
const WELCOME_MESSAGE = "Hey there. Welcome to dog parks. Get your puppy ready, it is time to socialize!";
const CONFIGURE_ZIPCODE = "To get started please tell me your zip code.";
const HELP_MESSAGE = 'You can say give me a dog park, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const data = [
    'A year on Mercury is just 88 days long.'
];

const handlers = {
    'LaunchRequest': function () {
        this.emit('WelcomeIntent');
    },
    'WelcomeIntent': function () {
        const speechOutput = WELCOME_MESSAGE;

        this.response.cardRenderer(SKILL_NAME, WELCOME_MESSAGE);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
        
        this.emit('ConfigIntent');
    },
    'ConfigIntent': function () {
        const speechOutput = CONFIGURE_ZIPCODE;

        this.response.cardRenderer(SKILL_NAME, CONFIGURE_ZIPCODE);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'GetParksIntent': function () {
        const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = randomFact;

        this.response.cardRenderer(SKILL_NAME, randomFact);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
