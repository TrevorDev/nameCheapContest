var bliss = require('tweet-bliss').createClient({
        consumer_key: '1Yrx1qNvzIpGOxZTzGw',
        consumer_secret: 'CyMpC5fOytgKWnh0ELnBSVDHc7HD7COyOezrkAsXbiA',
        access_token_key: '942738733-b9B09iz6Bvt5b1IiuaT4Kgp67sRhU16v2OGaF0ik',
        access_token_secret: 'W7Bh64wiMfFTeyzpa5s7QlcfYWJkq2mmtOkSxBxYUkzwM'
    });

function main(){
    var ready = false;
    var answerMap = {};
    var includeName = false;

    bliss.streamUser('15351161', function(user, text){
        if(user === 'Namecheap'){
            //receive tweets from Namecheap
            console.log('received- '+user+': '+text);
            
	    if(text.match(/^\[#/)!=null){
		includeName=false;
            	if(text.match(/YOUR TWITTER NAME/i)!=null){
		    includeName = true;
		}
	        console.log("HITTTT");
                ready=true;
                answerMap = {};
            }
        }else{
            //receive tweets to Namecheap
            console.log('received @- '+user+': '+text);
            if(!(text in answerMap)){
                answerMap[text]=0;
            }
            answerMap[text]++;
            console.log("Count - "+answerMap[text]);
            if(answerMap[text]>=5 && ready){
                console.log("WINNER - "+answerMap[text]);
                setTimeout(function(){bliss.composeTweet(text, function(err){if(err){console.log(err);}console.log('Sent- '+text+  (includeName?"@TrevorDeveloper":"")    );});},6700);
                ready = false;
            }
        }
        
    });

    
}

main();
