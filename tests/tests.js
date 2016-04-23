var test = require('tape');
var whoami = require('../app/controllers/whoami.js');

test('whoami test', function (t) {
    t.plan(6);
    
    var req = {
        headers: {
            "user-agent":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36",
            "accept-language":"en-US,en;q=0.8,fi;q=0.6,ru;q=0.4",
            "x-forwarded-for":"91.152.111.85"
        }
    }
    
    var ipaddr = whoami.getIP(req.headers)
    var lango = whoami.getLanguage(req.headers)
    var softy = whoami.getSoftware(req.headers)
    var completeResponse = whoami.whoAmI(req)
    
    t.equal(ipaddr, "91.152.111.85");
    t.equal(lango, "en-US");
    t.equal(softy, "Windows NT 6.1; WOW64");
    t.equal(completeResponse.ipaddress, "91.152.111.85");
    t.equal(completeResponse.language, "en-US");
    t.equal(completeResponse.software, "Windows NT 6.1; WOW64");
});
