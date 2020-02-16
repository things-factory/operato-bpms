function activityEnter(elementApi, engineApi) {
  console.log('activityEnter', elementApi.id)
  console.log('activityEnter', elementApi, engineApi)
}
function activityStart(elementApi, engineApi) {
  console.log('activityStart', elementApi.id)
}
function activityWait(elementApi, engineApi) {
  console.log('activityWait', elementApi.id)
}
function activityEnd(elementApi, engineApi) {
  console.log('activityEnd', elementApi.id)
  if (elementApi.id === 'end2') throw new Error(`<${elementApi.id}> should not have been taken`)
}
function activityLeave(elementApi, engineApi) {
  console.log('activityLeave', elementApi.id)
}
function activityStop(elementApi, engineApi) {
  console.log('activityStop', elementApi.id)
}
function activityThrow(elementApi, engineApi) {
  console.log('activityThrow', elementApi.id)
}
function activityError(elementApi, engineApi) {
  console.log('activityError', elementApi.id)
}

export default {
  'activity.enter': activityEnter,
  'activity.start': activityStart,
  'activity.wait': activityWait,
  'activity.end': activityEnd,
  'activity.leave': activityLeave,
  'activity.stop': activityStop,
  'activity.throw': activityThrow,
  'activity.error': activityError
}
