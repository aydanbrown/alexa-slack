# Slack Alexa Skill

This repository contains a [Slack Skill](https://slack.com/) for [Amazon Alexa](https://www.amazon.com/Amazon-Echo-Bluetooth-Speaker-with-WiFi-Alexa/dp/B00X4WHP5E).<br>
It allows you to use Alexa to interact with your Slack team, for example saying "join general" will join the channel "general", then "say hello" will post "hello" in general.

## Setup

It is designed to be run in [AWS Lambda](http://docs.aws.amazon.com/lambda/latest/dg/welcome.html), you can find a good tutorial on setting up an Alexa skill in Lambda [here](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/developing-an-alexa-skill-as-a-lambda-function).<br>
 For the Slack integration it currently uses a test token (check out the [Slack module](node_modules/slack)).

## How it works (the interesting parts)

A good start is the [intent-schema.json](intent-schema.json) which contains all of the intents and their slots that the user can trigger, then there is the [utterances.txt](utterances.txt) which is a list of sentences with an intent and slots, this is what Alexa uses to interpret what the user is trying to say. To find out about intents and utterances look [here](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/defining-the-voice-interface).

The Lambda function will pass the Alexa event to `event.handler(event, context)` in the [index.js](index.js) file, the event will be one of the following (look at `handleRequest()`)

<b>LaunchRequest</b> - When the user initiates the skill without defining an intent.<br>
<b>IntentRequest</b> - When the user makes a request with an intent.<br>
<b>SessionEndedRequest</b> - When the user ends the session.

On an intent request, the event is passed to the Alexa module's [intent.js](node_modules/alexa/node_modules/intent.js). You can compare the [intent-schema.json](intent-schema.json) and [utterances.txt](utterances.txt) with the intent functions to better understand how the Alexa service integrates with the Lambda function.

For the slack integration, there is a very simple [Slack module](node_modules/slack) which contains documentation and examples.
