# survey-maker

_Host your own simple surveys!_

Configure this basic rest server to listen on the port of your liking
either through the package.json file:

    "options" : {
        "port": "value of your choice"
     }

 Or on the command line:

    $ node index.js 2015

 Once the server is listening, post to the "survey" URL to create a new
 survey:


    $ curl --data "{
      \"Name\" : \"Test\",
      \"Email\" : \"test@email.test\"',
      \"Volunteering\" : \"[true,false]\",
      \"Interests\" : \"Helping others.\",
      \"Program\" : \"[true,false]\",
      \"Years\" : \"10\",
      \"Languages\" : \"[\"blockly\",\"java\",\"javascript\",\"c\",\"cpp\"]\"\
    }" http://localhost:3000/survey/SimpleTest

You can then refer to this survey in subsequent posts, with the server
handling verification of the submitted fields for you:

    $ curl --data "{
          \"Survey\" : \"Test\",
          \"Name\" : \"Jill Tester\",
          \"Email\" : \"jill@example.test\",
          \"Volunteering\" : \"true\"
          \"Interests\" : \"Learning\",
          \"Program\" : \"false\",
          \"Years\" : \"0\",
          \"Languages\" : \"[]\"  
      }" http://locahost:3000/survey/SimpleTest/example

Values are checked for type equivalency and arrays checked to see if they also
contain equivalent types.

Results are available as well:


    $ curl http://localhost:3000/results/SimpleTest

Hope you have fun creating surveys!

Note: This program uses a very light-weight serialization layer; for heavy use
you will probably want to swap out the data-store for something more robust.
