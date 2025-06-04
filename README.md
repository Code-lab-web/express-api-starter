# Express API Starter Project

This project includes the packages and babel setup for an express server, and is just meant to make things a little simpler to get up and running with.

## Getting started

Install dependencies with `npm install`, then start the server by running `npm run dev`

## View it live

Every project should be deployed somewhere. Be sure to include the link to the deployed project so that the viewer can click around and see what it's all about.

MongoDB Stress Test
MPK version
Running

>
c
d
M
o
n
g
o
D
B
−
S
t
r
e
s
s
−
T
e
s
t
&gt; python write_pbs.py --nclients 192 --host 'myhost.domain.com' --port 27018 $> qsub run.pbs

Dang version
Files:
w.py: Main program
w_run.pbs: PBS script
Example of running w.py

    # Pick a time 100 seconds in the future
    future=`python -c "import time; print(int(time.time()) + 100)"`
    # Run 1 client at that time
    ./w.py --host=128.55.57.13 --ndocs=100 --when=$future
Util files
sharded-mongo : Run simple localhost setup with 2 shards

Password based authentication
Client-Server program which will facilitate a client to register itself to the server. A server should keep a table of user-hash(password) entry for each user.

This program registers user with username, password and stores password hash in dictonary. Also, when a user tries to login , password validation occurs.

Python,Socket programming

IMPLEMENTATION (python3)
SERVER : socket with multithreading CLIENT : socket HASH : SHA256 ( using pythons hashlib)

INPUT (client side)
1. Username
2. Password
OUPUT
1. Registeration Successful : new user
2. Connection Successful : password correct
3. Login Failed : password incorrect 

Hash table : Contains User and Password. It is implemented using python Dictionary data structure
