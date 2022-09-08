# Description
This project is an experiment to determine the outcomes of a self censoring 
social media platform. The platform does not require users to make an account in order to post or react to other posts. Instead, there is a cool down for all users between posts and reactions, implemented through the temporary storage of user ip (used to filter spam posts, completely removed from database following cool down). Posts can be self-moderated off the website through vote ratios, and all posts are anonymous.

# Client Folder
Continuously re-deployed on Heroku following updates.

# Server Folder
Continuously re-deployed on Heroku following updates.

# Cloud Database
Uses MongoDB. For more information on Cluster structure, see models in the server folder.

# Environment Variables
During server deployment with Heroku, ensure you specify a SERVER_URI variable targeting your MongoDB database. No env variable is required for PORT, as Heroku sets it automatically.