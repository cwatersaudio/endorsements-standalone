This is an adaptation of a solo project from Scrimba ("We Are the Champions").

I'd already started earning React when I came to this project so I decided to try to implement it in React rather than Javascript.  

Data for each endorsement card is stored in a firebase realtime database; the database sets local state and state is passed to the components which render the various elements.  I'm trying to keep track of whether a user has liked an endorsement card separately from state and the database, using localStorage, so that the like status would be stored locally.  This feature currently is not working properly (see issues).
