# DevTinder

# Lacture - 1

- create a React + vite application
- Remove unnecessary code and create a Hello World app
- Install Tailwind CSS
- Install Daisy UI
- Add NavBar component to App.jsx
- Create a NavBar.jsx seprate component file
- Install react-router-dom
- Create BrowserRouter > Routes > Route=/ Body > RouteChildren
- Create an Outlet in your body component
- Create a Footer

# Lacture - 2

- Create a Login page - Done
- Install axios - Done
- CORS - install cors in backend => add middleware to with configuration: origin, credentials: true - Done
- Whenever you are making API call using axios pass { withCredentails: true } - Done
- install react-redux + @reduxjs/toolkit - Done
- ConfigureStore => Provider => createSlice => add reducer to the store - Done
- Add reduxdevtools to the chrome - Done
- Login and see if your data is coming properly in the store - Done
- NavBar should update as soon as user logs in - Done
- Refactor our code to add constant files + create a component folder - Done

# Lacture - 3

- You should not be able to access other routes without login - Done
- If token is not present, redirect user to login page - Done
- Logout feature - Done
- Get the feed and add the feed in the store - Done
- Build the user card on feed - Done
- Build update profile feature - Done
- Show toast message on save of profile

# Lacture - 4

- New-Page - See all my connections - Done
- New-Page - See all my connection requests - Done
- Feature - Accept/Reject Connection Request - Done

# Lacture - 5

- Send/Ignore the user card from the feed
- Signup New User
- E2E Testing

# Deployment:-

- Signup on AWS
- Launch EC2 instance
- chmod 400 <secret>.pem
- ssh -i "DevTinder-Secret.pem" ubuntu@ec2-3-237-14-163.compute-1.amazonaws.com
- Install node version as per your local computer version
- Git clone
- Frontend Deployment
- npm install - dependencies install
- npm run build
- sudo apt update
- sudo apt install nginx
- sudo systemctl start nginx
- sudo systemctl enable nginx
- Copy code from dist(build files) to /var/www/html/
- sudo scp -r dist/\* /var/www/html/
- Enable port :80 of your instance

- Backend:-
- allowed ec2 instance public IP on mongo server
- npm install pm2 -g
- pm2 start npm --name "devtinder-backend" -- start
- pm2 logs
- pm2 list, pm2 flush <name>, pm2 stop <name>, pm2 delete <name>
- config nginx - /etc/nginx/sites-available/default
- do configuration and restart nginx (command: sudo systemctl restart nginx)
- Modify the BASEURL in frontend project to "/api"

# Adding a custom domain name:-

- purchase domain name from godaddy
- signup on cloudflare & add a new domain name
- change the nameservers on godaddy and point it to cloudflare
- wait for sometime till your nameserver are updated ~ 15 minutes
- DNS record: A record devtinder.io 3.237.14.163
- Enable SSL for websites
