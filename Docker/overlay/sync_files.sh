#!/bin/bash
pushd /home/jarvis/GCloud > /dev/null
/home/jarvis/google-cloud-sdk/bin/gsutil -m rsync -r ./Documents gs://jarvis-503c9.appspot.com
popd > /dev/null
