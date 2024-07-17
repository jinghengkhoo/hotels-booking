# hotels-booking

## how to run:

#### 1. setup env var

copy backend/.env_exmaple to backend/.env and edit
copy frontend/.env_exmaple to frontend/.env and edit

#### 2. generate self-signed certificate or obtain signed certificate from a certificate authority
you may generate a self-signed certificate file (e.g. using `openssl req -nodes -new -x509 -keyout server.key -out server.cert`) or submit a certificate signing request to a certificate authority, to obtain a certificate file (e.g. `server.cert`, `server.pem`, etc.) and a key file (e.g. `server.key`). then, in `server.js`, replace `server.cert` with the location of your certificate file, and `server.key` with the location of your key file.

## TODO:

### Misc

do routes properly for frontend

### Feature 1

form validation

### Feature 2
half-stars for hotel rating

### Feature 3

fix map and long description (use mapbox)
rooms should be load all/load some while scrolling, not load more button

### Feature 4

form validation

### functional reqs:

https
frontend testing
speed
UI

### additional reqs:

auto login after register

### questions for client:
