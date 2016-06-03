module.exports = function() {
    return {
        "isDev": true,
        "server": {
            "port": 3000,
            "/* secure */": "/* whether this connects via https */",
            "secure": false,
            "key": null,
            "cert": null,
            "password": null
        },
        "rooms": {
            "/* maxClients */": "/* maximum number of clients per room. 0 = no limit */",
            "maxClients": 0
        },
        "stunservers": [
            {
                "url": "stun:stun.l.google.com:19302"
            }
        ],
        "turnservers": [
            {
                "urls": ["turn:your.turn.servers.here"],
                "secret": "turnserversharedsecret",
                "expiry": 86400
            }
        ]
    }
}();