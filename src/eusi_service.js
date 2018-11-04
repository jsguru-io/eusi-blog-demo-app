import eusiBrowser from 'eusi-sdk-browser'

// add your bucket key and secret here
const eusi = eusiBrowser({
    bucketKey: '756706e8-67f0-493e-98a0-c2f642a16a85',
    bucketSecret:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJidWNrZXRfaWQiOiI3NTY3MDZlOC02N2YwLTQ5M2UtOThhMC1jMmY2NDJhMTZhODUiLCJpZCI6Ijg3NTNlNzZkLWYxMmMtNGFkNS1iNWUwLTM2NjhiODk4MDljOSIsInRpbWVzdGFtcCI6MTUzOTAyODI4MDQ2Mn0.1rAlECKc2ugzoJtP84QgOIFmGUSGpv7WS1eMZzZ-3E0'
})

// we get access(duh..)
const access = () => {
    return eusi.getAccess()
}

export {access, eusi}
