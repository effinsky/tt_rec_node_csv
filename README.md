# RUN THE APP LOCALLY

to run the app on your machine and serve a csv file through localhost:

1. run yarn install to get all the deps installed;
2. run yarn dev, a script you'll find in the projects package.json file.

the app should start on port 3000 -- hit that port with <http://localhost:3000>
in your browser, and you should see a basic page with a button. when pressed,
the button initiates a backend flow that results in a csv file being prepared
and made available for download through the browser.
