class NoSpecialCharsInTraining {
    constructor (skill) {
        this.skill = skill;
    }
    run(){
        // note: a bit of performance knock to keep the intent and be able to better hint where the issue is?
        const intentList = this.skill.intents.map(intent => intent.intent);
        const trainingInSkill = this.skill.intents.map(intent => {return {"intent": intent.intent, "examples": intent.examples.map(example => example.text)}});
        // TODO: more thorough check for it to be non-utf8 rather than specific characters?
        const disallowedRegexString = /[^a-zA-Z0-9 ?!'\"£$.,]/g
        const specialCharsFound = []; // TODO:
        for (const intent of intentList) {
            const currentTraining = trainingInSkill.filter(intentObj => intentObj.intent === intent)[0]["examples"];
            const examplesWithSpecialChars = currentTraining.filter(training => training.match(disallowedRegexString));
            if (examplesWithSpecialChars.length > 0) {
                const exampleObj = {}
                exampleObj[intent] = examplesWithSpecialChars
                specialCharsFound.push(exampleObj);
            }
        }
        return specialCharsFound;
    }
}

let testExample = {
    "name": "Customer Care Sample Skill",
    "intents": [
      {
        "intent": "Customer_Care_Store_Hours",
        "examples": [
          {
            "text": "Are you open on Sunday�"
          },
          {
            "text": "Hours of operation"
          },
          {
            "text": "What time do you close today"
          },
          {
            "text": "what time do you close on Sunday"
          },
          {
            "text": "What time do you open on Saturdays"
          },
          {
            "text": "What time do you close"
          },
          {
            "text": "when do you close"
          },
          {
            "text": "will you be open Memorial day"
          },
          {
            "text": "will you open for christmas"
          },
          {
            "text": "what are your hours"
          },
          {
            "text": "What time is your store open on saturday?"
          },
          {
            "text": "What time do stores close?"
          },
          {
            "text": "What time does the central manchester store shut on a saturday?"
          },
          {
            "text": "What time are you closing today?"
          },
          {
            "text": "What is the opening time for the washington store?"
          },
          {
            "text": "What are your hous?"
          },
          {
            "text": "What are ur opening hours?"
          },
          {
            "text": "What are the saturday opening times for the local store?"
          },
          {
            "text": "What are the hours of operation?"
          },
          {
            "text": "What are the business hours of the store nearest to me?"
          },
          {
            "text": "Are you open on sundays, and if so what are the hours?"
          },
          {
            "text": "Are you open on bank holidays?"
          },
          {
            "text": "Are you open during thanksgiving?"
          },
          {
            "text": "Are the stores open early?"
          },
          {
            "text": "will you open on christmas"
          },
          {
            "text": "how late y'all stay up till"
          },
          {
            "text": "how late are you there"
          },
          {
            "text": "Are you closing early today"
          },
          {
            "text": "Are you closed new Year's eve"
          },
          {
            "text": "how early do you open on Saturdays"
          },
          {
            "text": "Is the branch open now?"
          },
          {
            "text": "How long are you open?"
          },
          {
            "text": "How early do you open?"
          },
          {
            "text": "Does the store in the city center opens till 8pm on weekends?"
          },
          {
            "text": "Can you tell me how late the stores are open till?"
          },
          {
            "text": "At what hour can I swing by?"
          },
          {
            "text": "how late are you open tonight"
          },
          {
            "text": "how late are you open"
          }
        ],
        "description": "Find business hours."
      },
      {
        "intent": "Thanks",
        "examples": [
          {
            "text": "i appreciate it"
          },
          {
            "text": "that's nice of you"
          },
          {
            "text": "thank you very much"
          },
          {
            "text": "thx"
          },
          {
            "text": "thank you"
          },
          {
            "text": "thanks"
          },
          {
            "text": "much appreciated"
          },
          {
            "text": "many thanks"
          }
        ],
        "description": "Thanks"
      },
      {
        "intent": "Customer_Care_Appointments",
        "examples": [
          {
            "text": "Can I book an in person session"
          },
          {
            "text": "i'd like to make an appointment"
          },
          {
            "text": "can you make an appointment for me"
          },
          {
            "text": "can i make an appointment"
          },
          {
            "text": "do you have availability next week"
          },
          {
            "text": "can i book for tonight"
          },
          {
            "text": "are you available on tuesday"
          },
          {
            "text": "When can I meet with one of your employees at your store?"
          },
          {
            "text": "What time can I meet the staff?"
          },
          {
            "text": "Want to change my visit"
          },
          {
            "text": "Store appointment"
          },
          {
            "text": "Set up an appt"
          },
          {
            "text": "Make an appointment"
          },
          {
            "text": "i'd like to come in for an appointment"
          },
          {
            "text": "I prefer a face to face visit"
          },
          {
            "text": "I want to talk in person with someone about my case"
          },
          {
            "text": "I would like to discuss my situation face to face"
          },
          {
            "text": "I would like to make an appointment to visit the nearest store to my location."
          },
          {
            "text": "Could I speak to someone in the store next tuesday?"
          }
        ],
        "description": "Schedule or manage an in-store appointment."
      },
      {
        "intent": "Customer_Care_Store_Location",
        "examples": [
          {
            "text": "What is the store near my zip code?"
          },
          {
            "text": "What is the closest store to my address?"
          },
          {
            "text": "Looking for a location"
          },
          {
            "text": "I want to know about a store"
          },
          {
            "text": "I need help with find a store"
          },
          {
            "text": "I'd like to go to a store"
          },
          {
            "text": "Go to your company"
          },
          {
            "text": "how do i find you"
          },
          {
            "text": "what is the address"
          },
          {
            "text": "where are you"
          },
          {
            "text": "what's your location"
          },
          {
            "text": "give me directions"
          },
          {
            "text": "which cross streets are you on"
          },
          {
            "text": "What is the nearest branch?"
          },
          {
            "text": "how do i get to your business"
          },
          {
            "text": "Where are you located?"
          },
          {
            "text": "Where is?"
          },
          {
            "text": "Where is your office?"
          },
          {
            "text": "Find store"
          },
          {
            "text": "how do i get to your place"
          },
          {
            "text": "where are you located"
          },
          {
            "text": "can you give me directions"
          },
          {
            "text": "location please"
          }
        ],
        "description": "Locate a physical store location or an address."
      },
      {
        "intent": "Cancel",
        "examples": [
          {
            "text": "i don't want a table anymore anymore"
          },
          {
            "text": "cancel the request"
          },
          {
            "text": "i changed my mind"
          },
          {
            "text": "cancel that"
          },
          {
            "text": "never mind"
          },
          {
            "text": "forget it"
          },
          {
            "text": "nevermind"
          }
        ],
        "description": "Cancel the current request"
      },
      {
        "intent": "General_Connect_to_Agent",
        "examples": [
          {
            "text": "Can I speak with somebody?"
          },
          {
            "text": "representative"
          },
          {
            "text": "talk to a human"
          },
          {
            "text": "Put me through to someone"
          },
          {
            "text": "Pls connect"
          },
          {
            "text": "Please let me talk to a human being."
          },
          {
            "text": "Please connect me to a live agent"
          },
          {
            "text": "Operator please"
          },
          {
            "text": "Please assist me to get to an agent"
          },
          {
            "text": "Need help from human"
          },
          {
            "text": "I would like to speak to someone"
          },
          {
            "text": "I would like to speak to a human"
          },
          {
            "text": "I want to talk to a person"
          },
          {
            "text": "I want an agent to help me"
          },
          {
            "text": "I want a manager"
          },
          {
            "text": "I want agent"
          },
          {
            "text": "I need to speak to a representative. How would I go about doing so?"
          },
          {
            "text": "Is there anyone there I can actually talk to for real?"
          },
          {
            "text": "I don't want to talk to you"
          },
          {
            "text": "I don't want to talk to a bot."
          },
          {
            "text": "How can I skip the recorded menu and go straight to a live person?"
          },
          {
            "text": "Hi can you transfer me"
          },
          {
            "text": "Do not want a robot?"
          },
          {
            "text": "Customer service representative please."
          },
          {
            "text": "Could you please transfer me to your master?"
          },
          {
            "text": "Contact person"
          },
          {
            "text": "Connect me to a live operator please."
          },
          {
            "text": "Can you connect me with a real person?"
          },
          {
            "text": "Can you assist me to connect to an agent?"
          },
          {
            "text": "Can I talk to someone?"
          },
          {
            "text": "Can I speak to an advisor?"
          },
          {
            "text": "Can I speak to a live person?"
          },
          {
            "text": "Can I speak to a human please?"
          },
          {
            "text": "Can I connect to an agent?"
          },
          {
            "text": "Call agent"
          },
          {
            "text": "A real agent, please."
          },
          {
            "text": "I want to talk to the manager"
          },
          {
            "text": "I want to speak to a human"
          },
          {
            "text": "call the manager"
          },
          {
            "text": "get me a person"
          },
          {
            "text": "I dont want to talk to a computer"
          },
          {
            "text": "I don't want to speak with a robot"
          },
          {
            "text": "Send me to an agent"
          },
          {
            "text": "Where is the closest agent?"
          },
          {
            "text": "Yes, take me to a real person"
          },
          {
            "text": "Agent help"
          },
          {
            "text": "I want to speak to a person"
          }
        ],
        "description": "Request a human agent."
      },
      {
        "intent": "Goodbye",
        "examples": [
          {
            "text": "bye"
          },
          {
            "text": "so long"
          },
          {
            "text": "ciao"
          },
          {
            "text": "arrivederci"
          },
          {
            "text": "see ya"
          },
          {
            "text": "good bye"
          }
        ],
        "description": "Good byes"
      },
      {
        "intent": "General_Greetings",
        "examples": [
          {
            "text": "Hey you"
          },
          {
            "text": "Hey twin"
          },
          {
            "text": "How is it going?"
          },
          {
            "text": "How have you been?"
          },
          {
            "text": "How are you today?"
          },
          {
            "text": "How are things going?"
          },
          {
            "text": "Hi there"
          },
          {
            "text": "Hi advisor"
          },
          {
            "text": "Hey there"
          },
          {
            "text": "Hey there all"
          },
          {
            "text": "Hey how are you doing"
          },
          {
            "text": "Hello I am looking for some help here"
          },
          {
            "text": "Hello"
          },
          {
            "text": "Hello Agent"
          },
          {
            "text": "Have you been well?"
          },
          {
            "text": "Greetings"
          },
          {
            "text": "Good to see you"
          },
          {
            "text": "Good morning"
          },
          {
            "text": "Good evening"
          },
          {
            "text": "Good day"
          },
          {
            "text": "hiya"
          },
          {
            "text": "yo"
          },
          {
            "text": "hi"
          },
          {
            "text": "You there"
          },
          {
            "text": "Who is this?"
          },
          {
            "text": "What's up?"
          },
          {
            "text": "What's new?"
          },
          {
            "text": "Ok take me back"
          },
          {
            "text": "Looking good eve"
          },
          {
            "text": "How r u?"
          }
        ],
        "description": "Greetings"
      },
      {
        "intent": "Help",
        "examples": [
          {
            "text": "help me"
          },
          {
            "text": "i need assistance"
          },
          {
            "text": "can you help"
          },
          {
            "text": "can you assist me"
          },
          {
            "text": "help"
          },
          {
            "text": "help me decide"
          }
        ],
        "description": "Ask for help"
      }
    ],
    "entities": [
      {
        "entity": "sys-location",
        "values": []
      },
      {
        "entity": "holiday",
        "values": [
          {
            "type": "synonyms",
            "value": "independence day",
            "synonyms": [
              "7/4",
              "fourth of july",
              "july 4",
              "july 4th",
              "july fourth"
            ]
          },
          {
            "type": "synonyms",
            "value": "labor day",
            "synonyms": []
          },
          {
            "type": "synonyms",
            "value": "christmas eve",
            "synonyms": [
              "x mas eve",
              "x-mas eve",
              "xmas eve"
            ]
          },
          {
            "type": "synonyms",
            "value": "valentine's day",
            "synonyms": [
              "valentine day",
              "valentines day"
            ]
          },
          {
            "type": "synonyms",
            "value": "memorial day",
            "synonyms": []
          },
          {
            "type": "synonyms",
            "value": "christmas",
            "synonyms": [
              "christmas day",
              "x man day",
              "xmas",
              "x mas",
              "x-mas",
              "x-mas day",
              "xmas day"
            ]
          },
          {
            "type": "synonyms",
            "value": "halloween",
            "synonyms": []
          },
          {
            "type": "synonyms",
            "value": "thanksgiving",
            "synonyms": [
              "turkey day"
            ]
          },
          {
            "type": "synonyms",
            "value": "new years",
            "synonyms": [
              "1/1",
              "jan 1",
              "jan 1st",
              "jan first",
              "january 1",
              "january 1st",
              "january first",
              "new year",
              "new year day",
              "new years day"
            ]
          },
          {
            "type": "synonyms",
            "value": "new years eve",
            "synonyms": [
              "12-31",
              "12/31",
              "dec 31",
              "dec 31st",
              "new year's eve"
            ]
          }
        ]
      },
      {
        "entity": "phone",
        "values": [
          {
            "type": "patterns",
            "value": "US Phone pattern",
            "patterns": [
              "(\\d{3})-(\\d{3})-(\\d{4})"
            ]
          }
        ]
      },
      {
        "entity": "specialist",
        "values": [
          {
            "type": "synonyms",
            "value": "Derrik",
            "synonyms": [
              "derek",
              "derik",
              "derrik",
              "derrick"
            ]
          },
          {
            "type": "synonyms",
            "value": "Brenda",
            "synonyms": []
          },
          {
            "type": "synonyms",
            "value": "Barbara",
            "synonyms": [
              "barbra"
            ]
          },
          {
            "type": "synonyms",
            "value": "Nicholas",
            "synonyms": [
              "nick"
            ]
          },
          {
            "type": "synonyms",
            "value": "Robert",
            "synonyms": [
              "bob"
            ]
          },
          {
            "type": "synonyms",
            "value": "Maria",
            "synonyms": []
          }
        ]
      },
      {
        "entity": "reply",
        "values": [
          {
            "type": "synonyms",
            "value": "yes",
            "synonyms": [
              "definitely",
              "go for it",
              "let's do it",
              "ok",
              "please",
              "sure",
              "why not",
              "yeah",
              "yes",
              "you bet",
              "you betcha",
              "yep"
            ]
          },
          {
            "type": "synonyms",
            "value": "no",
            "synonyms": [
              "definitely not",
              "don't think so",
              "dont think so",
              "i think not",
              "nope",
              "not at this time",
              "not now"
            ]
          }
        ]
      },
      {
        "entity": "sys-person",
        "values": []
      },
      {
        "entity": "sys-time",
        "values": []
      },
      {
        "entity": "sys-number",
        "values": []
      },
      {
        "entity": "landmark",
        "values": [
          {
            "type": "synonyms",
            "value": "empire state building",
            "synonyms": [
              "empire state",
              "emprire state"
            ]
          },
          {
            "type": "synonyms",
            "value": "grand central",
            "synonyms": []
          },
          {
            "type": "synonyms",
            "value": "times square",
            "synonyms": [
              "time sqaure",
              "time square",
              "times sqaure"
            ]
          }
        ],
        "fuzzy_match": true
      },
      {
        "entity": "sys-date",
        "values": []
      },
      {
        "entity": "zip_code",
        "values": [
          {
            "type": "patterns",
            "value": "US Zip",
            "patterns": [
              "(\\b|\\s)\\d{5}(\\b|\\s)"
            ]
          }
        ]
      }
    ],
    "language": "en",
    "metadata": {
      "api_version": {
        "major_version": "v1",
        "minor_version": "2018-09-20"
      }
    },
    "description": "A sample simple Customer Service skill",
    "dialog_nodes": [
      {
        "type": "event_handler",
        "output": {
          "text": {
            "values": [
              "OK. Canceling your request..."
            ]
          }
        },
        "parent": "Reservation using slots",
        "context": {
          "date": null,
          "time": null,
          "phone": null,
          "confirm": null,
          "specialist": null,
          "user_cancelled": true,
          "intent_descriptions_reverse": {
            "checking store hours": "Customer_Care_Store_Hours",
            "saying thanks": "Thanks",
            "making an appointment": "Customer_Care_Appointments",
            "checking locations": "Customer_Care_Store_Location",
            "cancelling something": "Cancel",
            "connecting to an agent": "General_Connect_to_Agent",
            "saying bye": "Goodbye",
            "saying hello": "General_Greetings",
            "getting help": "Help"
          }
        },
        "metadata": {},
        "next_step": {
          "behavior": "skip_all_slots"
        },
        "conditions": "#Cancel",
        "event_name": "generic",
        "dialog_node": "handler_16_1509133697261",
        "previous_sibling": "handler_3_1501275087289"
      },
      {
        "type": "event_handler",
        "output": {
          "text": {
            "values": []
          }
        },
        "parent": "Reservation using slots",
        "disabled": true,
        "metadata": {},
        "event_name": "focus",
        "dialog_node": "handler_7_1509696539866",
        "previous_sibling": "handler_16_1509133697261"
      },
      {
        "type": "response_condition",
        "output": {
          "text": {
            "values": [
              "Let me check availability...  [Use IBM Cloud Functions to connect to backend systems]"
            ]
          }
        },
        "parent": "Reservation using slots",
        "context": {},
        "metadata": {},
        "conditions": "true",
        "dialog_node": "node_3_1519173961259",
        "previous_sibling": "node_10_1509697567474"
      },
      {
        "type": "slot",
        "output": {},
        "parent": "Reservation using slots",
        "metadata": {},
        "variable": "$confirm",
        "dialog_node": "slot_8_1509132875735",
        "previous_sibling": "slot_12_1522596437268"
      },
      {
        "type": "slot",
        "title": "slot_102_1498132501942",
        "output": {},
        "parent": "Reservation using slots",
        "metadata": {
          "_customization": {
            "mcr": true
          }
        },
        "variable": "$date",
        "dialog_node": "slot_102_1498132501942",
        "previous_sibling": "node_3_1519173961259"
      },
      {
        "type": "response_condition",
        "output": {
          "text": {
            "values": [
              "[Use IBM Cloud Functions to connect to to backend systems]"
            ]
          }
        },
        "parent": "Reservation using slots",
        "metadata": {},
        "conditions": "$user_needs_help",
        "dialog_node": "node_25_1522598839584",
        "previous_sibling": "handler_7_1509696539866"
      },
      {
        "type": "slot",
        "output": {},
        "parent": "Reservation using slots",
        "metadata": {},
        "variable": "$specialist",
        "dialog_node": "slot_12_1522596437268",
        "previous_sibling": "slot_105_1498132552870"
      },
      {
        "type": "slot",
        "output": {},
        "parent": "Reservation using slots",
        "metadata": {
          "_customization": {}
        },
        "variable": "$phone",
        "dialog_node": "slot_22_1522444583114",
        "previous_sibling": "slot_8_1509132875735"
      },
      {
        "type": "response_condition",
        "output": {
          "text": {
            "values": [
              "Let me know how else I can help"
            ],
            "selection_policy": "sequential"
          }
        },
        "parent": "Reservation using slots",
        "context": {},
        "metadata": {},
        "conditions": "$user_cancelled",
        "dialog_node": "node_10_1509697567474",
        "previous_sibling": "node_25_1522598839584"
      },
      {
        "type": "slot",
        "title": "slot_105_1498132552870",
        "output": {},
        "parent": "Reservation using slots",
        "metadata": {
          "_customization": {
            "mcr": true
          }
        },
        "variable": "$time",
        "dialog_node": "slot_105_1498132552870",
        "previous_sibling": "slot_102_1498132501942"
      },
      {
        "type": "event_handler",
        "title": "handler_3_1501275087289",
        "output": {
          "text": {
            "values": [
              "I see you need help making an appointment. Let me transfer you to an agent..."
            ],
            "selection_policy": "sequential"
          }
        },
        "parent": "Reservation using slots",
        "context": {
          "date": null,
          "time": null,
          "phone": null,
          "confirm": null,
          "specialist": null,
          "user_needs_help": true
        },
        "metadata": {},
        "next_step": {
          "behavior": "skip_all_slots"
        },
        "conditions": "#Help",
        "event_name": "generic",
        "dialog_node": "handler_3_1501275087289"
      },
      {
        "type": "response_condition",
        "output": {
          "text": {
            "values": [
              "Hello",
              "Hi there",
              "Hi. How can I help"
            ],
            "selection_policy": "sequential"
          }
        },
        "parent": "node_13_1502484041694",
        "metadata": {},
        "dialog_node": "node_28_1522448362216",
        "previous_sibling": "node_15_1488295465298"
      },
      {
        "type": "response_condition",
        "output": {
          "text": {
            "values": [
              "Hello. Good evening",
              "Hi. Good evening",
              "Hello. How can I help this evening?"
            ],
            "selection_policy": "sequential"
          }
        },
        "parent": "node_13_1502484041694",
        "metadata": {},
        "conditions": "now().after('17:00:00')",
        "dialog_node": "node_15_1488295465298",
        "previous_sibling": "node_1_1495022305143"
      },
      {
        "type": "response_condition",
        "output": {
          "text": {
            "values": [
              "Hello. Good afternoon",
              "Hi there. It's a beautiful afternoon",
              "Good afternoon. How can I help?"
            ],
            "selection_policy": "sequential"
          }
        },
        "parent": "node_13_1502484041694",
        "metadata": {},
        "conditions": "now().after('12:00:00') && now().before('16:59:59')",
        "dialog_node": "node_1_1495022305143",
        "previous_sibling": "node_16_1488295517679"
      },
      {
        "type": "response_condition",
        "output": {
          "text": {
            "values": [
              "Hello. Good morning",
              "It's a beautiful morning. Hello",
              "Hi there. How can I help you this morning?"
            ],
            "selection_policy": "sequential"
          }
        },
        "parent": "node_13_1502484041694",
        "metadata": {},
        "conditions": "now().after('04:00:00') && now().before('11:59:59')",
        "dialog_node": "node_16_1488295517679"
      },
      {
        "type": "response_condition",
        "output": {
          "text": {
            "values": [
              "To get to our business from the Empire State Building, walk to Herald Square and take the N train to Union Square"
            ],
            "selection_policy": "sequential"
          }
        },
        "parent": "Directions",
        "metadata": {},
        "conditions": "@landmark:(empire state building)",
        "dialog_node": "node_7_1482459200886",
        "previous_sibling": "node_3_1522439390442"
      },
      {
        "type": "response_condition",
        "output": {
          "text": {
            "values": [
              "To get to our business from Times Square, take the 4,5 or 6 train downtown to Union Square."
            ]
          }
        },
        "parent": "Directions",
        "metadata": {},
        "conditions": "@landmark:(grand central)",
        "dialog_node": "node_4_1522439442155",
        "previous_sibling": "node_8_1482459217052"
      },
      {
        "type": "response_condition",
        "output": {
          "text": {
            "values": [
              "To get to our business from Times Square, take the N train downtown to Union Square"
            ],
            "selection_policy": "sequential"
          }
        },
        "parent": "Directions",
        "metadata": {},
        "conditions": "@landmark:(times square)",
        "dialog_node": "node_8_1482459217052",
        "previous_sibling": "node_7_1482459200886"
      },
      {
        "type": "standard",
        "title": "Provide location",
        "output": {
          "text": {
            "values": [
              "We're located by Union Square on the corner of 13th and Broadway"
            ],
            "selection_policy": "sequential"
          }
        },
        "parent": "Directions",
        "metadata": {},
        "conditions": "true",
        "dialog_node": "node_3_1522439390442"
      },
      {
        "type": "standard",
        "output": {
          "text": {
            "values": [
              "So long",
              "See ya",
              "Good bye"
            ],
            "selection_policy": "sequential"
          }
        },
        "parent": "node_1_1516824993307",
        "metadata": {},
        "conditions": "#Goodbye",
        "dialog_node": "node_12_1468329566917",
        "previous_sibling": "node_13_1502484041694"
      },
      {
        "type": "standard",
        "output": {
          "text": {
            "values": [
              "You're welcome. Just let me know if you need anything else",
              "No problem. Just let me know if you need anything else",
              "My pleasure. Just let me know if you need anything else"
            ],
            "selection_policy": "sequential"
          }
        },
        "parent": "node_1_1516824993307",
        "metadata": {},
        "conditions": "#Thanks",
        "dialog_node": "node_2_1468243505617",
        "previous_sibling": "node_12_1468329566917"
      },
      {
        "type": "standard",
        "output": {},
        "parent": "node_1_1516824993307",
        "metadata": {},
        "conditions": "#General_Greetings",
        "dialog_node": "node_13_1502484041694"
      },
      {
        "type": "event_handler",
        "output": {
          "text": {
            "values": [
              "Thanks"
            ],
            "selection_policy": "sequential"
          }
        },
        "parent": "slot_22_1522444583114",
        "context": {},
        "metadata": {},
        "conditions": "true",
        "event_name": "filled",
        "dialog_node": "handler_22_1522598191131",
        "previous_sibling": "handler_23_1522444583114"
      },
      {
        "type": "event_handler",
        "output": {},
        "parent": "slot_22_1522444583114",
        "context": {
          "phone": "@phone"
        },
        "metadata": {},
        "conditions": "@phone",
        "event_name": "input",
        "dialog_node": "handler_23_1522444583114",
        "previous_sibling": "handler_24_1522444583114"
      },
      {
        "type": "event_handler",
        "output": {
          "text": "I'll just need a phone to hold your reservation"
        },
        "parent": "slot_22_1522444583114",
        "metadata": {},
        "event_name": "focus",
        "dialog_node": "handler_24_1522444583114"
      },
      {
        "type": "response_condition",
        "output": {
          "text": {
            "values": [
              "We are open on @holiday regular hours"
            ],
            "selection_policy": "sequential"
          }
        },
        "parent": "Hours of Operation",
        "context": {},
        "metadata": {},
        "conditions": "@holiday",
        "dialog_node": "node_5_1482426503106",
        "previous_sibling": "node_1_1522387330204"
      },
      {
        "type": "response_condition",
        "output": {
          "text": {
            "values": [
              "We are open on <? @sys-date.reformatDateTime(\"EEEEE\") ?> from 10am until 8pm"
            ],
            "selection_policy": "sequential"
          }
        },
        "parent": "Hours of Operation",
        "context": {},
        "metadata": {},
        "conditions": "@sys-date.reformatDateTime(\"EEEEE\") == \"Monday\" || @sys-date.reformatDateTime(\"EEEEE\") == \"Tuesday\" || @sys-date.reformatDateTime(\"EEEEE\") == \"Wednesday\" || @sys-date.reformatDateTime(\"EEEEE\") == \"Thursday\" || @sys-date.reformatDateTime(\"EEEEE\") == \"Friday\"",
        "dialog_node": "node_1_1522387330204",
        "previous_sibling": "node_4_1482425833988"
      },
      {
        "type": "response_condition",
        "output": {
          "text": {
            "values": [
              "Our hours are Monday to Friday 10am to 8pm and Friday and Saturday 11am to 6pm."
            ],
            "selection_policy": "sequential"
          }
        },
        "parent": "Hours of Operation",
        "context": {},
        "metadata": {},
        "conditions": " true",
        "dialog_node": "node_6_1482426521282",
        "previous_sibling": "node_2_1482424204936"
      },
      {
        "type": "response_condition",
        "output": {
          "text": {
            "values": [
              "Our hours on <? @sys-date.reformatDateTime(\"EEEEE\") ?> are 11am to 6pm."
            ],
            "selection_policy": "sequential"
          }
        },
        "parent": "Hours of Operation",
        "context": {},
        "metadata": {},
        "conditions": "@sys-date.reformatDateTime(\"EEEEE\") == \"Saturday\" || @sys-date.reformatDateTime(\"EEEEE\") == \"Sunday\"",
        "dialog_node": "node_2_1482424204936",
        "previous_sibling": "node_5_1482426503106"
      },
      {
        "type": "response_condition",
        "output": {
          "text": {
            "values": [
              "We are closed on @holiday"
            ],
            "selection_policy": "sequential"
          }
        },
        "parent": "Hours of Operation",
        "context": {},
        "metadata": {},
        "conditions": "@holiday:christmas || @holiday:thanksgiving || @holiday:(new years)",
        "dialog_node": "node_4_1482425833988"
      },
      {
        "type": "event_handler",
        "output": {
          "text": {
            "values": [
              "We'll do our best to book you with @specialist"
            ],
            "selection_policy": "sequential"
          }
        },
        "parent": "slot_12_1522596437268",
        "event_name": "filled",
        "dialog_node": "handler_15_1522596463593",
        "previous_sibling": "handler_13_1522596437268"
      },
      {
        "type": "event_handler",
        "output": {},
        "parent": "slot_12_1522596437268",
        "context": {
          "specialist": "@specialist"
        },
        "metadata": {},
        "conditions": "@specialist",
        "event_name": "input",
        "dialog_node": "handler_13_1522596437268",
        "previous_sibling": "handler_14_1522596437268"
      },
      {
        "type": "event_handler",
        "output": {},
        "parent": "slot_12_1522596437268",
        "event_name": "focus",
        "dialog_node": "handler_14_1522596437268"
      },
      {
        "type": "standard",
        "output": {
          "text": "OK. Let me know how I can help"
        },
        "parent": "node_22_1467833484410",
        "metadata": {},
        "conditions": "@reply:no",
        "dialog_node": "node_21_1468350173406",
        "previous_sibling": "node_19_1468350024009"
      },
      {
        "type": "standard",
        "output": {
          "text": {
            "values": [
              "OK. Transferring... [Use IBM Cloud Functions to connect to backend systems]"
            ]
          }
        },
        "parent": "node_22_1467833484410",
        "metadata": {},
        "conditions": "@reply:yes",
        "dialog_node": "node_19_1468350024009"
      },
      {
        "type": "event_handler",
        "title": "handler_106_1498132552870",
        "output": {},
        "parent": "slot_105_1498132552870",
        "context": {
          "time": "@sys-time"
        },
        "metadata": {},
        "conditions": "@sys-time",
        "event_name": "input",
        "dialog_node": "handler_106_1498132552870",
        "previous_sibling": "handler_107_1498132552870"
      },
      {
        "type": "event_handler",
        "output": {
          "text": {
            "values": [
              "We only accept appointments between 11am and 5pm"
            ]
          }
        },
        "parent": "slot_105_1498132552870",
        "metadata": {},
        "next_step": {
          "behavior": "reprompt"
        },
        "conditions": "$time.after('17:30:30') || $time.before('10:59:59')",
        "event_name": "filled",
        "dialog_node": "handler_1_1509694458589",
        "previous_sibling": "handler_106_1498132552870"
      },
      {
        "type": "event_handler",
        "title": "handler_107_1498132552870",
        "output": {
          "text": "What time on <? $date.reformatDateTime(\"EEEEE\") ?> do you want to come in?"
        },
        "parent": "slot_105_1498132552870",
        "metadata": {},
        "event_name": "focus",
        "dialog_node": "handler_107_1498132552870"
      },
      {
        "type": "event_handler",
        "output": {},
        "parent": "slot_8_1509132875735",
        "context": {
          "confirm": "@reply && slot_in_focus"
        },
        "metadata": {},
        "conditions": "@reply && slot_in_focus",
        "event_name": "input",
        "dialog_node": "handler_9_1509132875735",
        "previous_sibling": "handler_10_1509132875735"
      },
      {
        "type": "event_handler",
        "output": {
          "text": {
            "values": [
              "Sorry... let's try again"
            ]
          }
        },
        "parent": "slot_8_1509132875735",
        "context": {
          "date": null,
          "time": null,
          "confirm": null
        },
        "metadata": {},
        "conditions": "@reply:no",
        "event_name": "filled",
        "dialog_node": "handler_17_1509135162089",
        "previous_sibling": "handler_14_1509133469904"
      },
      {
        "type": "event_handler",
        "output": {
          "text": {
            "values": [
              "Perfect!"
            ]
          }
        },
        "parent": "slot_8_1509132875735",
        "metadata": {},
        "conditions": "@reply:yes",
        "event_name": "filled",
        "dialog_node": "handler_14_1509133469904",
        "previous_sibling": "handler_9_1509132875735"
      },
      {
        "type": "event_handler",
        "output": {
          "text": "Let me confirm: You want an appointment for <? $date.reformatDateTime(\"EEEEE\") ?> at <? $time.reformatDateTime(\"h a\") ?>. Is this correct?"
        },
        "parent": "slot_8_1509132875735",
        "metadata": {},
        "event_name": "focus",
        "dialog_node": "handler_10_1509132875735"
      },
      {
        "type": "event_handler",
        "title": "handler_103_1498132501942",
        "output": {},
        "parent": "slot_102_1498132501942",
        "context": {
          "date": "@sys-date"
        },
        "metadata": {},
        "conditions": "@sys-date",
        "event_name": "input",
        "dialog_node": "handler_103_1498132501942",
        "previous_sibling": "handler_104_1498132501942"
      },
      {
        "type": "event_handler",
        "output": {
          "text": {
            "values": [
              "Looks like you're trying to make a reservation in the past. Try again."
            ]
          }
        },
        "parent": "slot_102_1498132501942",
        "metadata": {},
        "next_step": {
          "behavior": "reprompt"
        },
        "conditions": "$date.before(now())",
        "event_name": "filled",
        "dialog_node": "handler_6_1509695999145",
        "previous_sibling": "handler_103_1498132501942"
      },
      {
        "type": "event_handler",
        "title": "handler_104_1498132501942",
        "output": {
          "text": "What day would you like to come in?"
        },
        "parent": "slot_102_1498132501942",
        "metadata": {},
        "event_name": "focus",
        "dialog_node": "handler_104_1498132501942"
      },
      {
        "type": "standard",
        "title": "Hours of Operation",
        "output": {},
        "metadata": {},
        "conditions": "#Customer_Care_Store_Hours",
        "digress_in": "returns",
        "dialog_node": "Hours of Operation",
        "digress_out": "allow_all",
        "previous_sibling": "Opening"
      },
      {
        "type": "standard",
        "title": "Transfer to agent",
        "output": {
          "text": {
            "values": [
              "Would you like me to transfer you to a representative?"
            ],
            "selection_policy": "sequential"
          }
        },
        "metadata": {},
        "conditions": "#General_Connect_to_Agent",
        "digress_in": "does_not_return",
        "dialog_node": "node_22_1467833484410",
        "digress_out": "allow_all_never_return",
        "previous_sibling": "Reservation using slots"
      },
      {
        "type": "frame",
        "title": "Make an appointment",
        "output": {},
        "metadata": {
          "fallback": "leave",
          "_customization": {
            "mcr": true
          }
        },
        "conditions": "#Customer_Care_Appointments",
        "digress_in": "does_not_return",
        "dialog_node": "Reservation using slots",
        "digress_out": "allow_all",
        "previous_sibling": "Directions",
        "digress_out_slots": "allow_all"
      },
      {
        "type": "standard",
        "output": {
          "text": {
            "values": [
              "I didn't understand can you try again"
            ],
            "selection_policy": "sequential"
          }
        },
        "metadata": {},
        "conditions": "anything_else",
        "digress_in": "returns",
        "dialog_node": "node_2_1467831978407",
        "digress_out": "allow_all",
        "previous_sibling": "node_1_1516824993307"
      },
      {
        "type": "standard",
        "title": "Directions and location",
        "output": {},
        "metadata": {},
        "next_step": {
          "behavior": "skip_user_input"
        },
        "conditions": "#Customer_Care_Store_Location",
        "digress_in": "returns",
        "dialog_node": "Directions",
        "digress_out": "allow_all",
        "previous_sibling": "Hours of Operation"
      },
      {
        "type": "folder",
        "title": "Small Talk",
        "metadata": {},
        "digress_in": "not_available",
        "dialog_node": "node_1_1516824993307",
        "previous_sibling": "node_22_1467833484410"
      },
      {
        "type": "standard",
        "title": "Opening",
        "output": {
          "text": {
            "values": [
              "Hello, I’m a demo customer care virtual assistant to show you the basics.  I can help with directions to my store, hours of operation and booking an in-store appointment"
            ],
            "selection_policy": "sequential"
          }
        },
        "context": {
          "intent_descriptions": {
            "Customer_Care_Store_Hours": "checking store hours",
            "Thanks": "saying thanks",
            "Customer_Care_Appointments": "making an appointment",
            "Customer_Care_Store_Location": "checking locations",
            "Cancel": "cancelling something",
            "General_Connect_to_Agent": "connecting to an agent",
            "Goodbye": "saying bye",
            "General_Greetings": "saying hello",
            "Help": "getting help"
          }
        },
        "metadata": {},
        "conditions": "welcome",
        "dialog_node": "Opening"
      }
    ],
    "workspace_id": "d9bf7322-df44-4384-bc02-8a3c4d201426",
    "counterexamples": [],
    "learning_opt_out": false,
    "status": "Available"
  };

let checker = new NoSpecialCharsInTraining(testExample);
checker.run();

module.exports = {
    NoSpecialCharsInTraining
}