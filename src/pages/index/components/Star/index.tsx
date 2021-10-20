import { Text } from "@tarojs/components"
import { createSelectorQuery } from "@tarojs/taro"
import React, { createRef, useEffect } from "react"

const Star: React.FC = () => {
  const canvas = createRef<HTMLCanvasElement>()

  useEffect(() => {
    console.log(canvas.current?.style.width)
    setTimeout(() => {
      const query = createSelectorQuery()
      query.select('#myCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        console.log(document.getElementById('myCanvas')?.style);
        console.log(res[0].node._canvasRef)
        // console.log(document.createElementNS())
        // init(res[0].node._canvasRef)
        // const canvas = res[0].node
        // const ctx = canvas.getContext('2d')

        // const dpr = wx.getSystemInfoSync().pixelRatio
        // canvas.width = res[0].width * dpr
        // canvas.height = res[0].height * dpr
        // ctx.scale(dpr, dpr)

        // ctx.fillRect(0, 0, 100, 100)
      })
    }, 0)
    // console.log(canvas.current?.getContext)
    // init(createCanvasContext("canvas_star"), canvas.current?.style)
    // console.log(createCanvasContext("canvas_star"))
  }, [])

  return <>
    <Text>aaaa</Text>
    {/* @ts-ignore */}
    <canvas type='2d' id='myCanvas'></canvas>
  
  </>
}
export default Star