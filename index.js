window.onload = () => {
  const Two = require('two.js')
  let two = new Two({
    fullscreen: true,
  }).appendTo(document.body)

  // Background
  const bg = two.makeRectangle(two.width / 2, two.height / 2, two.width, two.height)
  bg.fill = 'rgb(131, 25, 180)'
  bg.stroke = '#00000000'

  const initialLargeRadius = Math.min(two.height, two.width) * (2/5)
  const targetRadius = initialLargeRadius * 0.5

  const distanceAway = Math.random() * (initialLargeRadius - targetRadius)
  const randomAngle = Math.random() * (2 * Math.PI)
  const initialPosition = [two.width / 2, two.height / 2]
  const targetPosition = [
    initialPosition[0] + (distanceAway * Math.cos(randomAngle)),
    initialPosition[1] + (distanceAway * Math.sin(randomAngle)),
  ]

  // let startCircle = two.makeCircle(initialPosition[0], initialPosition[1], initialLargeRadius)
  // startCircle.fill = '#00000000'
  // startCircle.stroke = 'rgb(11, 0, 235)'
  // startCircle.linewidth = 3

  let shrinkingStorm = two.makeCircle(initialPosition[0], initialPosition[1], initialLargeRadius)
  shrinkingStorm.fill = 'rgba(256, 256, 256, 0.2)'
  shrinkingStorm.stroke = 'rgb(11, 0, 235)'
  shrinkingStorm.linewidth = 5

  let targetCircle = two.makeCircle(targetPosition[0], targetPosition[1], targetRadius)
  targetCircle.fill = '#ffffff'

  const completionFrames = 200

  two.bind('update', (frameCount) => {
    if (frameCount > completionFrames) {
      return
    }
    const percentDone = frameCount / completionFrames

    shrinkingStorm.radius = targetRadius + ((initialLargeRadius - targetRadius) * (1 - percentDone))
    shrinkingStorm.translation.x = targetPosition[0] + ((initialPosition[0] - targetPosition[0]) * (1 - percentDone))
    shrinkingStorm.translation.y = targetPosition[1] + ((initialPosition[1] - targetPosition[1]) * (1 - percentDone))
  }).play()
}
