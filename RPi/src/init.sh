pushd /Jarvis/src/bluetooth > /dev/null
npm link @abandonware/bleno
npm link mqtt
popd > /dev/null

pushd /Jarvis/src/text > /dev/null
npm link mqtt
popd > /dev/null

pushd /Jarvis/src/speech_process > /dev/null
npm link mqtt
popd > /dev/null
