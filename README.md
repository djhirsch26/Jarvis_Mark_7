## Jarvis

This is the Root Project for the 7th Iteration of Jarvis. Further documentation to be added soon.

The key structural components of Jarvis are:
- An Ios App 
- A server which runs in the cloud to connect the app to all backend services
- A docker container running on a local machine. This syncs Jarvis to a cloud based filesystem

The main goals of Jarvis are to:
- Sync files and music across all devices
- Provide a uniform interface for various platforms
- Provide shortcuts and capabilities for common tasks including:
  - Retrieving a file
  - Emailing a file
  - Playing a specific playlist on Spotify
  - Granting ssh access to a remote machine
- Provide a `Jarvis` interface to write all custom skills
  - See the `spotify.js` file in the [skills](https://github.com/djh329/Jarvis_Mark_7/tree/master/React%20Native/skills) folder for an example of how the interface could be used to:
    - Play a specific song
    - Play a playlist with a preference for recently added songs

Functionality implements in past iterations of Jarvis to be included in the future:
- Weather Data
- Soundcloud Playlists
- Inteligent NLP (for Command Recognition)
