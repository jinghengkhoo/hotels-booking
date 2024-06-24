# hotels-booking

## how to run:

#### 1. setup env var
copy backend/.env_exmaple to backend/.env and edit
copy frontend/.env_exmaple to frontend/.env and edit

#### 2. download client data
download and add destinations.json file to backend/res


## TODO:

### Feature 1
The user can also search for a hotel upfront on your main landing page should they wish to.

### Feature 2

### Feature 3
fix map and long description

### Feature 4

### functional reqs:
https  
testing  
speed  
payment info  
account deletion  
UI

### additional reqs:
edit user profile  
auto login after register  
feature 1: Bonus: could process simple typos (e.g. Sinagpore → Singapore), you could choose to use an external library for this

### questions for client:
feature 1 - hotel list? destination list given

feature 2 - change currency and lang?  
multiple currencies  
diff lang  
diff number of guests per room? or 2|2|2 etc always

which price to use from api:
```
"lowest_price": 196.33,
"price": 271.21,
"converted_price": 271.21,
"lowest_converted_price": 271.21,
"market_rates": [
{
    "supplier": "expedia",
    "rate": 231.03851445
}
]
```

feature 4 - store cc info? or use stripe api for everything