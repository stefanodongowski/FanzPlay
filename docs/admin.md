# Admin 

## Running the app as an Admin

To run the app as an admin, you need to login using an admin email and password. Thoes roles are defined in the Firestore db inside the users colelction. 

The admin role has three main pages available: 
- The admin page
- The games page
- The prolife page

All relevent modals for these pages can be found inside the services folder

### admin page
This is where you can create a game, and create/edit teams. The code for this page is implemented in the (admin) folder inside the app folder. The file with the code for this page is admin.tsx 

### games page

This is where the gamecards are displayed for admin. On each card, you have the ability to start, edit, manage, reset, and delete games. "start" puts the game in the lobby state and hitting "manage" then moving through the questions starts the question state, and when the questions run out, the game is set to the finalLeaderboard state. All other states are changed from the user side. The code for this page is implemented in the (admin) folder inside the app folder. The file with the code for this page is games.tsx 

### prolife page

This is where the admin can logout, edit, and delete their profile. The code for this page is implemented in the (admin) folder inside the app folder. The file with the code for this page is profile.tsx 

## Limitations
- To create a game, both team IDs are needed. We would prefer a drop down menu for the feature to be more user friendly
- There are no styles for any of the admin page modals and they are uncomplete in general. Modals here dont automatically close after conformation for example.
-  Logos are harcoded to appear as either UNC or Duke teams. There is no way currently to acomodate other teams
- There are not checks or preventions on the actions admin can do making the app not fully ready for deployment or demo unless it is managed by people with good exisitng knoledge of the app.