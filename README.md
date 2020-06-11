# Fullstack Evaluation Notes

Because I'm programming on Windows and not Linux, I used the full command
"php -S localhost:8765 -t webroot/" instead of "./server" to start the server.
Probably won't effect anything, but something to note if the command to run
the server isn't working for whatever reason on Linux.

I made the assumption that the user would only want one search bar as opposed
to three (one for each of the search options). When a user submits their input,
the code checks if it is a valid full country name. If not, it checks if it is a valid
code. If not, it checks if it is a valid partial country name. As a result of this format,
when entering the code "US" there will be only the United States and no countries
that may have "US" somewhere in their name.

When searching "united", Mexico can appear. This is because one of Mexico's
alternate names is "United Mexican States". I decided to allow this because
it's a valid name for the country, although not the most common one and not
the one displayed on the html page. There may be similar results where a country
may not seem like it should be part of the results but is due to alternate names.


## How to use
I used the Fullstack evaluation template provided. The original README
information is below:

The files included in this repository are here to get you started by giving
you an idea on how you might start the project.

To start the server open a terminal window on unix/linux based systems and change
directory to the project root. Then execute this command:

```
  ./server
```

The command assumes you have a PHP binary in your system path. If you don't you
will get an error and the server will not start.

After starting the server go to:

```
http://localhost:8765/index.html  
```

If you setup the http server differently, please provide direction on how to start it
in your submitted project's readme file.
