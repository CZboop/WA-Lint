const {NoSpecialCharsInTraining} = require('../src/noSpecialCharsInTraining.cjs');

// === TESTING CAN FIND SPECIAL CHARACTERS IN TRAINING AS A RESULT OF ENCODING/DECODING ERRORS === //

// testing no special characters in training returns true
test('run method of no special chars in training class, when training has no special characters, returns true', () => {
    const testSkill = {
        "name": "Customer Care Sample Skill",
        "intents": [
          {
            "intent": "Customer_Care_Store_Hours",
            "examples": [
              {
                "text": "Are you open on Sunday"
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
          }]
      }
    const undertestClass = new NoSpecialCharsInTraining(testSkill);
    expect(undertestClass.run()).toBe(true);
})

// testing one special char in training returns false
test('run method of no special chars in training class when training has one special character returns false', () => {
    const testSkill = {
        "name": "Customer Care Sample Skill",
        "intents": [
          {
            "intent": "Customer_Care_Store_Hours",
            "examples": [
              {
                "text": "Are you open on Sunday"
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
                "text": "how late y�all stay up till"
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
          }]
      }
    const undertestClass = new NoSpecialCharsInTraining(testSkill);
    expect(undertestClass.run()).toBe(false);
})

// testing multiple special chars in training returns false
test('run method of no special chars in training class when training has multiple special characters returns false', () => {
    const testSkill = {
        "name": "Customer Care Sample Skill",
        "intents": [
          {
            "intent": "Customer_Care_Store_Hours",
            "examples": [
              {
                "text": "Are you open on Sunday"
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
                "text": "Are the stores open early?�"
              },
              {
                "text": "will you open on christmas"
              },
              {
                "text": "how late y�all stay up till"
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
                "text": "�how late are you open tonight"
              },
              {
                "text": "how late are you�'re open"
              }
            ],
            "description": "Find business hours."
          }]
      }
    const undertestClass = new NoSpecialCharsInTraining(testSkill);
    expect(undertestClass.run()).toBe(false);
})

// testing special chars included but all within allowed (e.g. £,') returns true
test('run method of no special chars in training class, when training has only allowed special chars, returns true', () => {
    const testSkill = {
        "name": "Customer Care Sample Skill",
        "intents": [
          {
            "intent": "Customer_Care_Store_Hours",
            "examples": [
              {
                "text": "Are you open on Sunday"
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
                "text": "how late are you there if i want to pay in $ instead of £"
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
          }]
      }
    const undertestClass = new NoSpecialCharsInTraining(testSkill);
    expect(undertestClass.run()).toBe(true);
})