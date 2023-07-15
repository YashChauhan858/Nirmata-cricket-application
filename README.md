# Nirmata Cricket App

The Nirmata Cricket App is a web application that lists cricket players along with their stats.

## Features

- List of cricket players with the following stats:

  - Name
  - Type
  - Points
  - Rank
  - Age

- List filteration on the bases of following field:

  - Search By Name
  - Search By Type

- List sorting based on following filed:

  - Name
  - Rank
  - Age

- Pagination
- A player's detail page at ( /player-details ) which furthur shows details of the selected player, along with similar players based on type.

## Tech Stack

The Nirmata Cricket App is built using the following technologies:

- React.js
- Vite.js
- React Query
- Tailwind CSS

No third party component library has been used in this project.

## Installation

To run this application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone <repository_url>
   ```

2. Install the packages:

   ```bash
   npm install
   ```

3. For development server run (runs at port :5173):

   ```bash
   npm run dev
   ```

4. For production server run (runs at port :4173):

   ```bash
   npm run build
   npm run preview
   ```
