angular-google-map-geo
========================

Server: NodeJS, Express, Mysql <br>
SPA: Angular, Sass, Grunt

To run the server locally, open a terminal, and navigate to the directory you cloned the project to. 

#### If you have docker installed please run next command.
```
docker-compose up -d
```
Wait serveral seconds and then open http://localhost:3000/

#### If you have not docker installed but, you have Node/NPM and Bower installed. Then run the following commands: <br>
##### Before start use dump.sql to create database. <br>
```
npm install
npm start
```
Open in your browser http://localhost:8080/

## Tests 
To run automated server tests:
```
npm test
```

## Tests using docker
If you want to start tests using docker container, you can connect to docker. For this run next command
 
```
docker exec -i -t 665b4a1e17b6 /bin/bash
```
Where 665b4a1e17b6 is ID of your container. And then run 
 ```
 npm test
 ```

## Use
Use second logins and passwords to authorisate

admin@gmail.com - Admin user <br>
user@gmail.com - Simple user

## License
```
The MIT License (MIT)

Copyright (c) 2017 Torbeev Eugeny

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
