let initialState = []

export const getCatfish = (state = initialState, action) => {
  switch (action.type) {

    case "GET_CATFISH_PENDING":
      return state;
    case "GET_CATFISH_FULFILLED":
    // console.log('GET_CATFISH_FULFILLED', action.payload.data);

      return [
      ...state, action.payload.data
      ]

    default:
      return state;
  }
}

// I put all of the filtering/sorting logic in the reducer
// so that the data received is generated as close to the
// store as possible. This is a new technique for me - perhaps
// it needs a little tweaking
export const getChannelCats = (state) => {
  if(state.getCatfish.length > 0){
    let channelCats = state.getCatfish[0].filter(cat => {
      if(cat.species === "channel"){
        return cat;
      }
    })
    // sort array of fish by weight
    .sort(function(a,b){
      return getWeight(b.length, b.girth) - getWeight(a.length, a.girth);
    })
    // restructuring the data to be used in the table
    .map((channelCat, i)=> {
      return {
        "ranking": i,
        "angler": channelCat.angler,
        "weight": getWeight(channelCat.length, channelCat.girth)
      }
    })
    return channelCats
  }

  return state
}


// here's the function called within the getChannelCats.sort
// to sort the fish array by weight
function getWeight(len, gir){
  return Math.round(len * gir * (gir/800))
}