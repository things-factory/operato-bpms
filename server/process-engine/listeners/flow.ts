function flowTake(elementApi, engineApi) {
  console.log('flowTake', elementApi.id)
}
function flowDiscard(elementApi, engineApi) {
  console.log('flowDiscard', elementApi.id)
}
function flowLooped(elementApi, engineApi) {
  console.log('flowLooped', elementApi.id)
}

export default {
  'flow.take': flowTake,
  'flow.discard': flowDiscard,
  'flow.looped': flowLooped
}
