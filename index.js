var alexa = require('alexa');

exports.handler = function (event, context) {
  console.log('Initiate Handler');
  try {
    console.log('Requesting skill with Application ID: ' + event.session.application.applicationId);

    if(event.session.new) {
      // Start session by adding channels and users to the session attributes
      alexa.intent.StartSession(function(err, attributes) {
        if(err) return context.succeed(buildResponse({}, alexa.utilities.buildErrorResponse(true)));
        event.session.attributes = attributes;
        handleRequest(event, context);
      });
    } else {
      handleRequest(event, context);
    }

  } catch (e) {
    console.error(e);
    context.fail("Exception: " + e);
  }
};

// Handle the Request
function handleRequest(event, context) {
  // Begining session
  if(event.request.type === "LaunchRequest") {
    alexa.intent.Launch(event.request, event.session, function(sessionAttributes, speechletResponse) {
      context.succeed(buildResponse(sessionAttributes, speechletResponse));
    });
  // During session
  } else if(event.request.type === "IntentRequest") {
    onIntent(event.request, event.session, function(sessionAttributes, speechletResponse) {
      context.succeed(buildResponse(sessionAttributes, speechletResponse));
    });
  // Ending session
  } else if(event.request.type === "SessionEndedRequest") {
    onSessionEnded(event.request, event.session);
    alexa.intent.End(event.request.intent, event.session, function(sessionAttributes, speechletResponse) {
      context.succeed(buildResponse(sessionAttributes, speechletResponse));
    });
  }
}

// Called when the user launches the skill
function onSessionStarted(sessionStartedRequest, session) {
  console.log(`onSessionStarted requestId=${sessionStartedRequest.requestId}, sessionId=${session.sessionId}`);
  // TODO: Set default session values
}

// Called when the user specifies an intent for this skill
function onIntent(intentRequest, session, callback) {
  console.log(`onIntent requestId=${intentRequest.requestId}, sessionId=${session.sessionId}`);

  var intent = intentRequest.intent;

  console.log(`Intent - ${JSON.stringify(intent)}`);
  console.log(`Session - ${JSON.stringify(session)}`);

  // Dispatch the intent handler
  switch(intent.name) {
    // Amazon intent mapping
    case 'AMAZON.HelpIntent': alexa.intent.Help(intent, session, callback); break;
    case 'AMAZON.StopIntent': alexa.intent.End(intent, session, callback); break;
    case 'AMAZON.CancelIntent': alexa.intent.End(intent, session, callback); break;
    default:
      // Call intent
      if(alexa.intent[intent.name]) {
        alexa.intent[intent.name](intent, session, callback);
      // Handle no intent
      } else {
        var cardTitle = 'Couldn\'t understand';
        var speechOutput = 'Sorry, I couldn\'t understand what you want, please try again';
        var repromptOutput = 'If you are having trouble, you can ask for help';

        callback(session.attributes, alexa.utilities.buildSpeechlet(cardTitle, speechOutput, repromptOutput, false));
      }
  }
}


// Called when the user ends the session
function onSessionEnded(sessionEndedRequest, session) {
  console.log(`onSessionEnded requestId=${sessionEndedRequest.requestId}, sessionId=${session.sessionId}`);
  // TODO: Cleanup
}

function buildResponse(sessionAttributes, speechletResponse) {
  return {
    version: "1.0",
    sessionAttributes: sessionAttributes,
    response: speechletResponse
  };
}
