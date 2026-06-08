# linear :

* linear  
* linear(0, 0.25, 1)
* linear(0, 0.25 75%, 1)

# ease :
* ease                  
* ease-in               
* ease-out              
* ease-in-out           

* cubic-bezier(0.25, 0.1, 0.25, 1)

# step :
* step-start            
* step-end             

* steps(4, end)
* steps(10, jump-both)

_____

# other :

```js
// you can use this for that    ex: "ease"

var myEase = "ease-in";
var myAnimation = FMS_makeCSSanim("GAME",1,myEase,"1",[
  { transform: 'rotate(95deg)' }
])
myAnimation.play();
myAnimation.onfinish = function(){}
```

