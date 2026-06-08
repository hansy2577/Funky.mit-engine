
linear
linear(0, 0.25, 1)
linear(0, 0.25 75%, 1)

ease                  /* cubic-bezier(0.25, 0.1, 0.25, 1) */
ease-in               /* cubic-bezier(0.42, 0, 1, 1) */
ease-out              /* cubic-bezier(0, 0, 0.58, 1) */
ease-in-out           /* cubic-bezier(0.42, 0, 0.58, 1) */

cubic-bezier(0.25, 0.1, 0.25, 1)

step-start            /* steps(1, jump-start) */
step-end              /* steps(1, jump-end) */

steps(4, end)
steps(10, jump-both)

------------------------------

/*var myAnimation = HJS_makeCSSanim("GAME",1,"ease","1",[
  { transform: 'scaleY(1.1)' },{ transform: 'rotate(95deg)' }
])

myAnimation.onfinish = function(){}
*/

