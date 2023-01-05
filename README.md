# Documentation

Status: Progress

# ReportsCarolina

The name is inspired by the search system,  [reports.unc.edu](https://reports.unc.edu), which is fundamental to the functionality of ReportsCarolina.

Class status monitoring system to alert the host user about class status changes for registration. Meant to be used during open-enrollment when waitlists are removed.

# Setup and Run

1. Installing project dependencies

```bash
npm install
```

1. Running development server

```bash
npm run dev
```

1. Navigate to [http://localhost:300](http://localhost:300)

# Setup for Notification

<aside>
💡 Notification has to be turned on for auto class status checking

</aside>

1. Have a Gmail account available.
2. Follow to this [guide](https://medium.com/@nickroach_50526/sending-emails-with-node-js-using-smtp-gmail-and-oauth2-316fe9c790a1) for Gmail access key setup.
3. Navigate to gmail.js in project: /utils/gmail.js
4. Input variable values

```jsx
const clientID = 'Your ClientID Here';
const clientSecret = 'Your Client Secret Here';
const refreshToken = 'Your Refresh Token Here';
const userEmail = 'Your Gmail Here';
const targetEmail = 'Target Email to Send Notification';
// const targetEmail = 'phone-number@provider-gateway';
```

1. (Optional) Receive notification via SMS
    1. For `targetEmail`, enter `phone-number@provider-gateway`

| AT&T | number@txt.att.net (SMS)
number@mms.att.net (MMS) |
| --- | --- |
| Boost Mobile | number@smsmyboostmobile.com (SMS)
number@myboostmobile.com (MMS) |
| Cricket | number@sms.cricketwireless.net (SMS)
number@mms.cricketwireless.net (MMS) |
| Sprint | number@messaging.sprintpcs.com (SMS)
number@pm.sprint.com (MMS) |
| T-Mobile | number@tmomail.net (SMS and MMS) |
| U.S. Cellular | number@email.uscc.net (SMS)
number@mms.uscc.net( MMS) |
| Verizon | number@vtext.com (SMS)
number@vzwpix.com (MMS) |
| Virgin Mobile | number@vmobl.com (SMS)
number@vmpix.com (MMS) |

Now you will receive SMS notification from your phone!

# Developer’s Note

## Technologies used

[NextJS](https://nextjs.org/): quick development cycle with minimal backend code

[JSDOM](https://github.com/jsdom/jsdom): covert HTML String to HTML DOM

[Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/): efficient frontend development with integrated support for website responsiveness

[nodemailer](https://nodemailer.com/about/): easy drafting of email alert message

[googleapis](https://developers.google.com/gmail/api/guides): utilize Google APIs to achieve Email/SMS notification

## Potential Updates

- Fix issue with unique key in generated list
    - Search Result and Watch List are generated list using list.map(), their key value is assigned with their respective class number. Therefore, when search result and watch list shows the same class item, NextJS will throw an error.
    - Potential fixes: remove watch list class item from search result; find an alternative way to dynamically list classes
- Integrate with Firebase for authentication and database
    - Independent course watch lists
- Allow end-user to input email (can be satisfied along with user auth)
    - User defined target Email to send notification to
- Fix bug with partial catalog number as search parameter
    - Search COMP 45, result shows COMP 45 but in reality the underlying course is COMP 455
    
    ![BugScreenShot.png](/BugScreenShot.png)
    
    - searchClass() assigns catalog number based on input param instead of response; this cause catalog number to be mismatched with actual course catalog
- Auto refresh of watchlist when class status changes
    - Not a priority because the case is rare; user don’t leave the website open the entire time.
    - Set up interval GET request
- Error Handling
    - Lack error handling code due to development time constraint
    - Invalid googleapi credential handling
    - Null / request body checking across APIs
- Separate monitoring and notification
    - Course status will not be updated unless notification is turned on