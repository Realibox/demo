# quick start 
1. install Docker
2. run `docker build . -t rbdemo` at project root dir
3. run `docker run --name temp -it --rm -v "$PWD":/usr/src/myapp rbdemo yarn install` to install js lib
4. run `docker run --name temp -it --rm -v "$PWD":/usr/src/myapp -p 5000:5000 rbdemo nodemon app.js` at project root dir
5. open browser http://localhost:5000


# demo
