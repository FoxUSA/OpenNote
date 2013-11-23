# Dependencies
OpenNote uses a central script to manage dependencies.
Although this is less efficient, it make the structure of the app simpler to understand.

## Common.php
`
/OpenNote/controller/common.php
`

This is the script that is imported across all scripts.
We put scripts that may be crossed called. Example of this is creating a NoteBook class instance from the NoteEditior class.

### Security

We also implement security features by using the system.

For example:

`
/OpenNote/Controller/modules/login/Authenticator.php
`

Outside of the class declaration, we call a method that requires the user to be logged in or be redirected to the login module.
Because this code is always run by being imported by `common.php`, all pages require the user to be logged in or redirected.


We also clean our _post or _get from `common.php`
