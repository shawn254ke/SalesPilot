# SalePilot App

SalePilot is a sales management app designed to help users track leads and potential clients in a visually organized and manageable way. This app allows users to add, update, delete, and filter leads based on various parameters, ensuring that sales teams can keep track of their sales funnel effectively.

## Features

- **Add a New Lead**: Users can add new leads to the lead list.
- **Update Lead Details**: Users can edit lead information to correct or improve the data stored.
- **Delete Leads**: Users can delete leads from the list to maintain only useful and relevant data.
- **View All Leads**: The app displays all leads in a visually organized UI, making it easy to understand the sales funnel status at a glance.
- **Filter and Sort Leads**: Users can filter or sort leads by their stage (e.g., New, Contacted, Interested, Converted) to focus on high-priority actions.

## DB Schema

The app uses a simple JSON server for data storage. The `lead` entity follows this schema:

```json
{
  "id": "number",
  "name": "string",
  "email": "string",
  "phone": "string",
  "company": "string",
  "status": "string",  
  "source": "string",  
  "created_on": "date",
  "notes": ["string[]"]
}
```

## Technologies Used

- **Frontend**: React.js
- **Backend**: JSON Server (mock database)
- **State Management**: React hooks (`useState`, `useEffect`)
- **UI Components**: Custom reusable components
- **Styling**: Tailwind CSS for styling

## Project Setup

### Prerequisites

Make sure you have the following installed:

- **Node.js** (with npm): [Install Node.js](https://nodejs.org/)
- **JSON Server**: Install via npm if you don't have it:
  ```bash
  npm install -g json-server

## Deployment
The app has been deployed on Netlify. You can access the live app at: [salesPilot-netlify](https://resonant-douhua-f19218.netlify.app/)
 ```bash
https://resonant-douhua-f19218.netlify.app/
