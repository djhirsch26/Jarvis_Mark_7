### Server

### Objects
###### File: An object representing a file
* name: The name of the file
* type: The type of the file. One of `['d', '-']`, representing a directory or a regular file, respectively.

### Interfaces
###### ls:
* Input Parameters
  * Path: An absolute path from the root of the file system on the server. Paths must include the root (i.e. `/Documents/test.txt` instead of `Documents/test.txt`)
* Returns: an array of File objects
