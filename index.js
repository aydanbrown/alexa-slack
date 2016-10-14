const alexa = require('alexa');

exports.handler = function (event, context) {
  try {
    console.log('Requesting skill with Application ID: ' + event.session.application.applicationId);

    if(event.session.new) {
      onSessionStarted({ requestId: event.request.requestId }, event.session);
    }

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
      context.succeed();
    }
  } catch (e) {
    context.fail("Exception: " + e);
  }
};

// Called when the user launches the skill
function onSessionStarted(sessionStartedRequest, session) {
  console.log(`onSessionStarted requestId=${sessionStartedRequest.requestId}, sessionId=${session.sessionId}`);
  // TODO: Set default session values
}

// Called when the user specifies an intent for this skill
function onIntent(intentRequest, session, callback) {
  console.log(`onIntent requestId=${intentRequest.requestId}, sessionId=${session.sessionId}`);

  var intent = intentRequest.intent;

  console.log('Invoking Intent - ' + intent.name);

  // Dispatch the intent handler
  switch(intent.name) {
    // Amazon intent mapping
    case 'AMAZON.HelpIntent': alexa.intent.Help(intent, session, callback); break;
    case 'AMAZON.StopIntent': alexa.intent.End(intent, session, callback); break;
    case 'AMAZON.CancelIntent': alexa.intent.End(intent, session, callback); break;
    // Cutom intent handling
    default:
      if(alexa.intent[intent.name]) {
        alexa.intent[intent.name]()
      } else {
        // Called if there is no match
        alexa.intent.None(intent, session, callback);
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
