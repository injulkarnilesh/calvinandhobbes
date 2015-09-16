# calvinandhobbes v0.0.1

Loads and shows in the browser the Calvin and Hobbes comic strips from [GoComic](http://www.gocomics.com/).

Install as a npm module with 
```bash
$ npm install -g calvinandhobbes
```

## Options supported
Once installed,  you can simply run $camvinandhobbes or $ch to show today's Calvin and Hobbes comic strip.  
You can use one of the below options to specify which strip to load.
* -r  
Shows a strip from a random date.   
   ```
    $calvinandhobbes -r
   ```
* -d  
 With this option you can specify the specific date to load a strip of. Supported format of the date is YYYY/MM/DD.
    ```
    $calvinandhobbes -d 2013/10/23
   ```

As GoComic itself does not provide strips for all the dates, if the date you provided or randomly generated is not supported by GoComic, today's strip will be loaded.
